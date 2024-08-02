// components/VideoPlayer.js
import { useEffect, useState, useRef } from 'react';

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('http://localhost:3000/api/videos/byDayOfWeek');
      const data = await res.json();

      console.log(data);
      setVideos(data.map((video: any) => `videos/${video.url}`));
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 0 && videoRef.current) {
      videoRef.current.play();
    }
  }, [videos, currentVideoIndex]);

  const handleVideoEnd = () => {
    if (videos.length === 1) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {videos.length > 0 ? (
        <video
          ref={videoRef}
          src={videos[currentVideoIndex]}
          onEnded={handleVideoEnd}
          style={{ width: '100%', height: '100%' }}
          autoPlay
          muted
          controls
          loop={false}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <h1 className="text-3xl">Playlist vazia</h1>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
