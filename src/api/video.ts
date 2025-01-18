import { Video } from "./../../types/video";

const mockVideos: Video[] = [
  {
    id: "1",
    title: "Introduction to React",
    thumbnail: "/baseImage.png",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "2",
    title: "Building with Vite",
    thumbnail: "/baseImage.png",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "3",
    title: "Custom Hooks in React",
    thumbnail: "/baseImage.png",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "4",
    title: "State Management Techniques",
    thumbnail: "/baseImage.png",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
];

export const fetchVideos = async (): Promise<Video[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockVideos;
};
