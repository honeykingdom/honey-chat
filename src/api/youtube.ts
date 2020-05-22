import fetchRequest from 'utils/fetchRequest';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

interface YoutubeThumbnail {
  url: string;
  width: number;
  height: number;
}

interface YoutubeVideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YoutubeThumbnail;
      medium: YoutubeThumbnail;
      high: YoutubeThumbnail;
      standard: YoutubeThumbnail;
      maxres: YoutubeThumbnail;
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
}

export interface YoutubeVideoResponse {
  kind: string;
  etag: string;
  items: YoutubeVideoItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

// eslint-disable-next-line import/prefer-default-export
export const fetchYoutubeVideo = (id: string): Promise<YoutubeVideoResponse> =>
  fetchRequest(
    `${YOUTUBE_API_BASE}/videos?part=snippet&id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  );
