import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isEnding, setIsEnding] = useState(false);

  const fetchVideos = async () => {
    const { data } = await axios.get('/api/videos/byDayOfWeek');
    setVideos(data.map((video: any) => `videos/${video.url}`));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      videoRef.current.play();
    }
  }, [videos, currentVideoIndex]);

  const handleVideoEnd = async () => {
    if (currentVideoIndex === videos.length - 1) {
      await fetchVideos();
      setCurrentVideoIndex(0);
    } else {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }
    setIsEnding(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const remainingTime =
        videoRef.current.duration - videoRef.current.currentTime;
      if (remainingTime < 1 && !isEnding) {
        setIsEnding(true);
      }
    }
  };

  const handleVideoPlay = () => {};

  return (
    <div
      ref={containerRef}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      {videos.length > 0 ? (
        <video
          ref={videoRef}
          src={videos[currentVideoIndex]}
          onEnded={handleVideoEnd}
          onTimeUpdate={handleTimeUpdate}
          onPlay={handleVideoPlay}
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
