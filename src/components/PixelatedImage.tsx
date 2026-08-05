import { useEffect, useRef } from "react";

type PixelatedImageProps = {
  image: string;
  level: number;
};

function PixelatedImage({ image, level }: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const img = new Image();

    img.src = image;

    img.onload = () => {
      const sizeMap = [16, 32, 64, 128, 256];
      const pixelSize = sizeMap[level - 1];

      canvas.width = 300;
      canvas.height = 300;

      // Turn off smoothing
      ctx.imageSmoothingEnabled = false;

      // Create a tiny temporary canvas
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
  }, [image, level]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: 12,
      }}
    />
  );
}

export default PixelatedImage;
