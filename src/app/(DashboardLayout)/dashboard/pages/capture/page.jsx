'use client';

import { useRouter } from 'next/navigation';

const CaptureImage = () => {
  const router = useRouter();

  const handleCapture = () => {
    const imageUrl = `https://8204-84-108-116-163.ngrok-free.app/photo?timestamp=${Date.now()}`;
    window.open(imageUrl, "_blank");
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-3">🌿 Tree Monitoring - Capture Latest Image</h2>
      <p className="lead mb-4">
        Click the button below to open the most recent snapshot captured by the field camera.
      </p>
      <button className="btn btn-primary btn-lg px-5" onClick={handleCapture}>
        📸 Capture Image
      </button>
    </div>
  );
};

export default CaptureImage;
