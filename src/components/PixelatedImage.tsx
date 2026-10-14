
import { useEffect, useRef } from "react";

type PixelatedImageProps = {
  image: string;
  level: number;
};

const PIXEL_SIZES = [8, 16, 32, 64];

function PixelatedImage({ image, level }: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Level 5 uses the original image, not the canvas
    if (level === 5) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      const pixelSize = PIXEL_SIZES[level - 1];
      if (!pixelSize) return;

      canvas.width = 300;
      canvas.height = 300;

      ctx.imageSmoothingEnabled = false;

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = pixelSize;
      tempCanvas.height = pixelSize;

      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCtx.drawImage(img, 0, 0, pixelSize, pixelSize);

      ctx.clearRect(0, 0, 300, 300);

      ctx.drawImage(
        tempCanvas,
        0,
        0,
        pixelSize,
        pixelSize,
        0,
        0,
        300,
        300
      );
    };

    img.onerror = () => {
      console.error("Failed to load image:", image);
    };

    img.src = image;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [image, level]);

  if (level === 5) {
    return (
      <img
        src={image}
        alt="Revealed puzzle"
        style={{
          width: 300,
          height: 300,
          objectFit: "cover",
          borderRadius: 12,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      style={{
        width: 300,
        height: 300,
        borderRadius: 12,
      }}
    />
  );
}

export default PixelatedImage;
