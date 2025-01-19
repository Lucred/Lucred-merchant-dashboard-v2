import { Video } from "types/video";

interface VideoGridProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

export default function VideoGrid({ videos, onVideoSelect }: VideoGridProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[300px]'>
      {videos.map((video) => (
        <div
          key={video.id}
          className='cursor-pointer hover:opacity-75 transition-opacity'
          onClick={() => onVideoSelect(video)}
        >
          <img
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            className='w-full rounded-lg shadow-md'
          />
          <h2 className='mt-2 text-lg font-semibold'>{video.title}</h2>
        </div>
      ))}
    </div>
  );
}
