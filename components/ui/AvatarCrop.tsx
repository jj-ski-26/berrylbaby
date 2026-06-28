"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const SIZE = 280;   // circle diameter in px
const OUTPUT = 512; // exported image size

interface Props {
  src: string;
  onConfirm: (file: File) => void;
  onCancel: () => void;
}

export default function AvatarCrop({ src, onConfirm, onCancel }: Props) {
  const [scale, setScale] = useState(1.5);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setScale(1.5);
    setOffset({ x: 0, y: 0 });
    setDims({ w: 0, h: 0 });
  }, [src]);

  function onImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    setDims({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight });
  }

  // objectFit:cover renders the image at scale r inside the SIZE×SIZE box.
  // After CSS scale(s) from center, effective rendered size is r*s*w × r*s*h.
  // Max offset keeps the image covering the full circle.
  const r = dims.w && dims.h ? Math.max(SIZE / dims.w, SIZE / dims.h) : 1;
  const rendW = dims.w * r * scale;
  const rendH = dims.h * r * scale;
  const maxDx = Math.max(0, (rendW - SIZE) / 2);
  const maxDy = Math.max(0, (rendH - SIZE) / 2);

  const clampOffset = useCallback((ox: number, oy: number, mDx: number, mDy: number) => ({
    x: Math.max(-mDx, Math.min(mDx, ox)),
    y: Math.max(-mDy, Math.min(mDy, oy)),
  }), []);

  // Touch handling
  const lastTouch = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDist = useRef<number | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    e.preventDefault();
    if (e.touches.length === 1) {
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastPinchDist.current = null;
    } else if (e.touches.length === 2) {
      lastPinchDist.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      lastTouch.current = null;
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault();
    if (e.touches.length === 1 && lastTouch.current) {
      const dx = e.touches[0].clientX - lastTouch.current.x;
      const dy = e.touches[0].clientY - lastTouch.current.y;
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setOffset((prev) => clampOffset(prev.x + dx, prev.y + dy, maxDx, maxDy));
    } else if (e.touches.length === 2 && lastPinchDist.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      const delta = dist / lastPinchDist.current;
      lastPinchDist.current = dist;
      setScale((prev) => {
        const next = Math.max(1, Math.min(5, prev * delta));
        const rW = dims.w * r * next;
        const rH = dims.h * r * next;
        setOffset((off) => clampOffset(off.x, off.y, Math.max(0, (rW - SIZE) / 2), Math.max(0, (rH - SIZE) / 2)));
        return next;
      });
    }
  }

  // Mouse drag
  const dragging = useRef(false);
  const lastMouse = useRef<{ x: number; y: number } | null>(null);
  function onMouseDown(e: React.MouseEvent) { dragging.current = true; lastMouse.current = { x: e.clientX, y: e.clientY }; }
  function onMouseMove(e: React.MouseEvent) {
    if (!dragging.current || !lastMouse.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setOffset((prev) => clampOffset(prev.x + dx, prev.y + dy, maxDx, maxDy));
  }
  function onMouseUp() { dragging.current = false; }

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    setScale((prev) => {
      const next = Math.max(1, Math.min(5, prev - e.deltaY * 0.005));
      const rW = dims.w * r * next;
      const rH = dims.h * r * next;
      setOffset((off) => clampOffset(off.x, off.y, Math.max(0, (rW - SIZE) / 2), Math.max(0, (rH - SIZE) / 2)));
      return next;
    });
  }

  function confirm() {
    const img = imgRef.current;
    if (!img || !dims.w || !dims.h) return;

    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT;
    canvas.height = OUTPUT;
    const ctx = canvas.getContext("2d")!;

    // Clip to circle
    ctx.beginPath();
    ctx.arc(OUTPUT / 2, OUTPUT / 2, OUTPUT / 2, 0, Math.PI * 2);
    ctx.clip();

    // Replicate the CSS transform:
    // objectFit:cover → image rendered at r*dims.w × r*dims.h, centered in SIZE×SIZE
    // CSS: translate(offset.x, offset.y) scale(scale) from center
    // → image center ends up at (SIZE/2 + offset.x, SIZE/2 + offset.y)
    // → rendered size: r*scale*dims.w × r*scale*dims.h
    const k = OUTPUT / SIZE; // scale from preview to output
    const drawW = r * scale * dims.w * k;
    const drawH = r * scale * dims.h * k;
    const drawX = (SIZE / 2 + offset.x) * k - drawW / 2;
    const drawY = (SIZE / 2 + offset.y) * k - drawH / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        onConfirm(new File([blob], "avatar.jpg", { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.92,
    );
  }

  // CSS approach: img fills container with objectFit:cover, then we apply
  // translate(dx,dy) scale(s) from center. CSS applies transforms right-to-left:
  // 1. scale(s) from center → zooms image symmetrically
  // 2. translate(dx,dy) → shifts the zoomed image (in un-scaled coordinates)
  // Result: image center appears at (SIZE/2 + offset.x, SIZE/2 + offset.y)
  const transform = `translate(${offset.x}px, ${offset.y}px) scale(${scale})`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center px-6 gap-6">
      <p className="text-white text-sm font-medium">Drag & pinch to frame your face</p>

      {/* Circular crop viewport */}
      <div
        style={{ width: SIZE, height: SIZE, borderRadius: "50%", overflow: "hidden", cursor: "grab", touchAction: "none" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt="crop"
          draggable={false}
          onLoad={onImgLoad}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform,
            transformOrigin: "center center",
            userSelect: "none",
            pointerEvents: "none",
            display: "block",
          }}
        />
      </div>

      {/* Zoom slider */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <span className="text-white text-xs">🔍</span>
        <input
          type="range" min={1} max={5} step={0.01}
          value={scale}
          onChange={(e) => {
            const next = Number(e.target.value);
            const rW = dims.w * r * next;
            const rH = dims.h * r * next;
            setScale(next);
            setOffset((off) => clampOffset(off.x, off.y, Math.max(0, (rW - SIZE) / 2), Math.max(0, (rH - SIZE) / 2)));
          }}
          className="flex-1"
        />
      </div>

      <div className="flex gap-4">
        <button onClick={onCancel} className="px-6 py-2.5 rounded-full border border-white/30 text-white text-sm">
          Cancel
        </button>
        <button onClick={confirm} className="px-6 py-2.5 rounded-full bg-rose-500 text-white text-sm font-semibold">
          Use photo
        </button>
      </div>
    </div>
  );
}
