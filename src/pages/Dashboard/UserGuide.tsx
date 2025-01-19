import { useState, useEffect } from "react";
import VideoGrid from "../../components/VideoGrid";
import VideoPlayer from "../../components/VideoPlayer";
import { Video } from "types/video";
import { fetchVideos } from "../../api/video";

const UserGuide = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      const fetchedVideos = await fetchVideos();
      setVideos(fetchedVideos);
    };
    loadVideos();
  }, []);

  return (
    <div
      className={` bg-white ${
        window.innerWidth > 768 ? `ml-16` : `ml-12`
      } bg-[#1100770A] min-h-[100vh]`}
    >
      <div className=' mx-auto p-4 pb-20'>
        <h1 className='text-3xl font-bold mb-6'>Learn More about Lucred</h1>
        {selectedVideo ? (
          <VideoPlayer
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        ) : (
          <VideoGrid videos={[]} onVideoSelect={setSelectedVideo} />
        )}
      </div>
    </div>
  );
};

export default UserGuide;
