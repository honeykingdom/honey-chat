import { YoutubeVideoResponse } from './youtubeApiTypes';

const API_BASE = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const youtube = {
  video: (videoId: string): Promise<YoutubeVideoResponse> =>
    fetch(`${API_BASE}/videos?part=snippet&id=${videoId}&key=${API_KEY}`).then(
      (r) => r.json(),
    ),
};

export default youtube;
