import { useState, useEffect } from "react";
import { fetchVideos } from "../../api/video";
import { Video } from "../../../types/video";
import { Skeleton } from "../../components/ui/skeleton";

const UserGuide = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      try {
        const fetchedVideos = await fetchVideos();
        setVideos(fetchedVideos);
      } finally {
        setIsLoading(false);
      }
    };
    loadVideos();
  }, []);

  return (
    <div
      className={`bg-white ${
        window.innerWidth > 768 ? `ml-16` : `ml-12`
      } bg-[#1100770A] min-h-[100vh]`}
    >
      <div className='mx-auto p-4 pb-20'>
        <h1 className='text-3xl font-bold mb-6'>Learn More about Lucred</h1>
        {selectedVideo ? (
          <YouTubeVideoPlayer
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        ) : isLoading ? (
          <LoadingVideoGrid />
        ) : (
          <YouTubeVideoGrid videos={videos} onVideoSelect={setSelectedVideo} />
        )}
      </div>
    </div>
  );
};

const LoadingVideoGrid = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='space-y-3'>
            <Skeleton className='w-full bg-gray-100 animate-pulse h-48 rounded-lg' />
            <div className='space-y-2'>
              <Skeleton className='bg-gray-100 animate-pulse h-4 w-3/4' />
              <Skeleton className='bg-gray-100 animate-pulse h-4 w-1/2' />
            </div>
          </div>
        ))}
    </div>
  );
};

interface YouTubeVideoGridProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

const YouTubeVideoGrid = ({ videos, onVideoSelect }: YouTubeVideoGridProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {videos.map((video) => (
        <div
          key={video.id}
          className='cursor-pointer hover:opacity-75 transition-opacity'
          onClick={() => onVideoSelect(video)}
        >
          <img
            src={`https://img.youtube.com/vi/${video.videoUrl}/mqdefault.jpg`}
            alt={video.title}
            className='w-full rounded-lg shadow-md h-48 object-cover'
          />
          <h2 className='mt-2 text-lg font-semibold'>{video.title}</h2>
        </div>
      ))}
    </div>
  );
};

interface YouTubeVideoPlayerProps {
  video: Video;
  onClose: () => void;
}

const YouTubeVideoPlayer = ({ video, onClose }: YouTubeVideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className='relative'>
      <button
        className='absolute top-2 right-2 z-10 text-white bg-black bg-opacity-50 rounded-full p-2'
        onClick={onClose}
      >
        ✕
      </button>
      <div className='w-full aspect-video relative'>
        {isLoading && (
          <Skeleton className='bg-gray-100 animate-pulse absolute inset-0 rounded-lg' />
        )}
        <iframe
          src={`https://www.youtube.com/embed/${video.videoUrl}?autoplay=1`}
          title={video.title}
          className='w-full h-full rounded-lg'
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          style={{ visibility: isLoading ? "hidden" : "visible" }}
        />
      </div>
      <h2 className='mt-4 text-xl font-bold'>{video.title}</h2>
    </div>
  );
};

export default UserGuide;
