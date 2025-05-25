'use client';

import { useState } from 'react';
import { get, ref, child } from 'firebase/database';
import { database } from '@/lib/firebaseConfig'; // Adjust this path if needed

const CaptureImage = () => {
  const [loading, setLoading] = useState(false);

  // const handleCapture = async () => {
  //   setLoading(true);
  //   try {
  //     const dbRef = ref(database);
  //     const snapshot = await get(child(dbRef, 'live_camera/url'));
  //     if (snapshot.exists()) {
  //       const imageUrl = snapshot.val();
  //       const urlWithTimestamp = `${imageUrl}/photo?timestamp=${Date.now()}`;
  //       window.open(urlWithTimestamp, '_blank');
  //     } else {
  //       alert('No image URL found in the database.');
  //     }
  //   } catch (error) {
  //     console.error("Error fetching image URL:", error);
  //     alert("Failed to fetch image URL.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

      const handleCapture = () => {
      // Open a blank tab immediately to avoid popup blockers
      const newTab = window.open('', '_blank');
      if (!newTab) {
        alert("Please allow pop-ups for this site.");
        return;
      }

      // Then fetch the URL asynchronously
      const dbRef = ref(database);
      get(child(dbRef, 'live_camera/url'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const imageUrl = snapshot.val();
            const urlWithTimestamp = `${imageUrl}/photo?timestamp=${Date.now()}`;
            newTab.location.href = urlWithTimestamp;
          } else {
            newTab.close();
            alert("No image URL found in the database.");
          }
        })
        .catch((error) => {
          console.error("Error fetching image URL:", error);
          newTab.close();
          alert("Failed to fetch image URL.");
        });
    };


  return (
    <div className="container py-5 text-center">
      <h2 className="mb-3">🌿 Tree Monitoring - Capture Latest Image</h2>
      <p className="lead mb-4">
        Click the button below to open the most recent snapshot captured by the field camera.
      </p>
      <button className="btn btn-primary btn-lg px-5" onClick={handleCapture} disabled={loading}>
        {loading ? 'Loading...' : '📸 Capture Image'}
      </button>
    </div>
  );
};

export default CaptureImage;