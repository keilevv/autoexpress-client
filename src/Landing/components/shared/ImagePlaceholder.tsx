"use client";

import { ImageOff } from "lucide-react";

interface ImagePlaceholderProps {
  label?: string;
  aspectRatio?: "hero" | "card";
  className?: string;
}

export default function ImagePlaceholder({
  label = "Imagen pendiente",
  aspectRatio = "card",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-surface via-base to-surface border border-border ${
        aspectRatio === "hero" ? "aspect-video" : "aspect-[4/3]"
      } ${className}`}
    >
      <ImageOff size={32} className="text-muted mb-2" />
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
