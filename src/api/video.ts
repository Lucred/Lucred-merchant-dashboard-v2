import { Video } from "./../../types/video";

const mockVideos: Video[] = [
  {
    id: "1",
    title: "How to Login",
    thumbnail: "/baseImage.png",
    videoUrl: "ReOKIjhBWXE",
  },
  {
    id: "2",
    title: "How to add and edit products",
    thumbnail: "/baseImage.png",
    videoUrl: "Qb_vQQEdxmE",
  },
];

export const fetchVideos = async (): Promise<Video[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockVideos;
};
