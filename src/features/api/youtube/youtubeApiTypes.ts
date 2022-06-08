type YoutubeThumbnail = {
  url: string;
  width: number;
  height: number;
};

type YoutubeVideoItem = {
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
};

export type YoutubeVideoResponse = {
  kind: string;
  etag: string;
  items: YoutubeVideoItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};
