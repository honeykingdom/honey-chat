export enum MessageCardType {
  TWITCH_CLIP = 0,
  TWITCH_VIDEO = 1,
  YOUTUBE_VIDEO = 2,
}

// https://regex101.com/r/jGbDV1/5
export const TWITCH_CLIP_REGEX =
  /^(?:https?:\/\/)?(?:clips\.twitch\.tv\/|(?:www\.|m\.)?twitch\.tv\/(?:[\d\w]+)\/clip\/)([\d\w-]+)(?:\?.+)?$/;

// https://regex101.com/r/xsgeA4/4
export const TWITCH_VIDEO_REGEX =
  /^(?:https?:\/\/)?(?:www\.|m\.)?twitch\.tv\/videos\/(\d+)(?:\?.+)?$/;

// https://regexr.com/3dj5t
export const YOUTUBE_VIDEO_REGEX =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?(?:youtube\.com|youtu.be)(\/(?:[\w-]+\?v=|embed\/|v\/|shorts\/)?)([\w-]+)(\S+)?$/;
