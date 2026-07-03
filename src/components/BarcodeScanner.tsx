import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

interface Props {
  onScan: (result: string) => void;
  onClose?: () => void;
}

export default function BarcodeScanner({ onScan, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState("");
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  const onScanRef = useRef(onScan);
  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  const lastScanRef = useRef<{ code: string; time: number }>({ code: "", time: 0 });
  const SCAN_COOLDOWN_MS = 2500;

  const initCamera = () => {
    setError("");
    const reader = readerRef.current ?? new BrowserMultiFormatReader();
    readerRef.current = reader;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        stream.getTracks().forEach((t) => t.stop());
        return reader.listVideoInputDevices();
      })
      .then((devices) => {
        if (!devices.length) {
          setError("No camera found on this device.");
          return;
        }
        setCameras(devices);
        const rear = devices.find((d) =>
          d.label.toLowerCase().includes("back") ||
          d.label.toLowerCase().includes("rear") ||
          d.label.toLowerCase().includes("environment")
        );
        setSelectedCamera(rear?.deviceId ?? devices[0].deviceId);
      })
      .catch(() => setError("Camera access denied. Please allow camera permission and reload."));
  };

  // Step 1: get camera permission first, then enumerate devices
  useEffect(() => {
    initCamera();
    return () => {
      readerRef.current?.reset();
    };
  }, []);

  // Step 2: run continuous decode loop on the selected camera
  useEffect(() => {
    if (!selectedCamera || !videoRef.current) return;
    const reader = readerRef.current;
    if (!reader) return;

    let cancelled = false;

    reader
      .decodeFromVideoDevice(selectedCamera, videoRef.current, (result) => {
        if (cancelled || !result) return;

        const code = result.getText();
        const now = Date.now();
        const last = lastScanRef.current;

        if (code === last.code && now - last.time < SCAN_COOLDOWN_MS) return;

        lastScanRef.current = { code, time: now };
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        onScanRef.current(code);
      })
      .catch(() => setError("Could not start camera. Try switching camera."));

    return () => {
      cancelled = true;
    };
  }, [selectedCamera]);

  const switchCamera = () => {
    if (cameras.length < 2) return;
    const currentIndex = cameras.findIndex((c) => c.deviceId === selectedCamera);
    const nextIndex = (currentIndex + 1) % cameras.length;
    readerRef.current?.reset();
    setSelectedCamera(cameras[nextIndex].deviceId);
  };

  const retryCamera = () => {
    readerRef.current?.reset();
    setCameras([]);
    setSelectedCamera("");
    initCamera();
  };

  return (
    <div>
      <style>{`
        @keyframes scanLineMove {
          0%   { top: 4px; }
          50%  { top: calc(100% - 4px); }
          100% { top: 4px; }
        }
      `}</style>

      {error ? (
        <div
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 10,
            padding: 16,
            color: "#fca5a5",
            fontSize: 14,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          {error}
        </div>
      ) : (
        <div style={{ position: "relative", borderRadius: 14, overflow: "hidden" }}>
          <video
            ref={videoRef}
            style={{ width: "100%", display: "block", height: 320, objectFit: "cover" }}
            muted
            playsInline
          />

          {/* Navy blue scan frame */}
          <div
            style={{
              position: "absolute",
              top: "38%",
              left: "6%",
              right: "6%",
              height: 90,
              border: "3px solid #1e3a5f",
              borderRadius: 16,
              boxShadow: "0 0 0 2000px rgba(0,0,0,0.4)",
              overflow: "hidden",
            }}
          >
            {/* Animated scan line */}
            <div
              style={{
                position: "absolute",
                left: 4,
                right: 4,
                height: 2,
                background: "#1e3a5f",
                boxShadow: "0 0 8px 1px rgba(30,58,95,0.8)",
                animation: "scanLineMove 2s ease-in-out infinite",
              }}
            />
          </div>

          {/* Label under the box */}
          <div
            style={{
              position: "absolute",
              top: "38%",
              left: 0,
              right: 0,
              marginTop: 90 + 14,
              textAlign: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.4,
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
              pointerEvents: "none",
            }}
          >
            KEEP ONE BARCODE INSIDE THIS BOX
          </div>
        </div>
      )}

      {/* Camera dropdown - rounded rectangle with chevron icon */}
      {cameras.length > 0 && (
        <div style={{ position: "relative", marginTop: 14 }}>
          <select
            value={selectedCamera}
            onChange={(e) => {
              readerRef.current?.reset();
              setSelectedCamera(e.target.value);
            }}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "14px 40px 14px 18px",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
            }}
          >
            {cameras.map((c) => (
              <option key={c.deviceId} value={c.deviceId} style={{ background: "#1a1a1a", color: "#fff" }}>
                {c.label || `Camera ${c.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Switch / Retry buttons - rounded rectangle */}
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "14px 0",
            fontSize: 15,
            fontWeight: 600,
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
            opacity: cameras.length < 2 ? 0.4 : 1,
          }}
          onClick={switchCamera}
          disabled={cameras.length < 2}
        >
          Switch
        </button>
        <button
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "14px 0",
            fontSize: 15,
            fontWeight: 600,
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
          }}
          onClick={retryCamera}
        >
          Retry
        </button>
      </div>

      

      <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10, textAlign: "center" }}>
        For phones, open via HTTPS and allow camera permission. Rear camera preferred. Device will vibrate on successful scan .
      </p>
    </div>
  );
}