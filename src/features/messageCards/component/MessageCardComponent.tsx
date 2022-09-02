import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useAppSelector } from 'app/hooks';
import { DEFAULT_TWITCH_TEMPLATE } from 'features/emotes';
import {
  useTwitchClipQuery,
  useTwitchVideoQuery,
  useYoutubeVideoQuery,
} from 'features/api';
import { accessTokenSelector } from 'features/chat';
import { MessageCard as Card } from '../messageCardsTypes';
import { MessageCardType } from '../messageCardsConstants';

const MessageCardComponentRoot = styled.a<{ $clickable?: boolean }>`
  display: flex;
  flex-wrap: nowrap;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9), 0 0 2px rgba(0, 0, 0, 0.9);
  background-color: #18181b;
  text-decoration: none;

  ${(p) =>
    p.$clickable &&
    css`
      &:hover {
        background-color: #3a3a3d;
      }

      &:active {
        background-color: #464649;
      }
    `}
`;
const Preview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 80px;
  background-color: #26262c;
  overflow: hidden;
`;
const Image = styled.img`
  max-height: 100%;
`;
const PreviewLoading = styled.div`
  height: 45px;
  width: 80px;
  background-color: #46464b;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  overflow: hidden;
`;
const textStyles = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
`;
const Title = styled.p`
  ${textStyles};
  font-weight: bold;
  color: #efeff1;
`;
const Description = styled.p`
  ${textStyles};
  color: #adadb8;
`;
const textLoadingStyle = css`
  margin-top: 3px;
  margin-bottom: 4px;

  height: 12px;
  background-color: #232326;
  border-radius: 2px;
`;
const TitleLoading = styled.div`
  ${textLoadingStyle};
  width: 180px;
`;
const DescriptionLoading = styled.div`
  ${textLoadingStyle};
  width: 120px;
`;

const template = DEFAULT_TWITCH_TEMPLATE;
const emoteId = '58765';
const tmp = template
  .replace('{{id}}', emoteId)
  .replace('{{format}}', 'default')
  .replace('{{theme_mode}}', 'dark');
const x1 = tmp.replace('{{scale}}', '1.0');
const x2 = tmp.replace('{{scale}}', '2.0');
const x4 = tmp.replace('{{scale}}', '4.0');
const errorImageSrc = x1;
const errorImageSrcSet = `${x1} 1x, ${x2} 2x, ${x4} 4x`;

const errorTitle = 'Something went wrong';
const errorDescription: Record<MessageCardType, string> = {
  [MessageCardType.TWITCH_CLIP]: "We couldn't find that Clip",
  [MessageCardType.TWITCH_VIDEO]: "We couldn't find that Video",
  [MessageCardType.YOUTUBE_VIDEO]: "We couldn't find that Video",
};
const hooks: Record<
  MessageCardType,
  | typeof useTwitchClipQuery
  | typeof useTwitchVideoQuery
  | typeof useYoutubeVideoQuery
> = {
  [MessageCardType.TWITCH_CLIP]: useTwitchClipQuery,
  [MessageCardType.TWITCH_VIDEO]: useTwitchVideoQuery,
  [MessageCardType.YOUTUBE_VIDEO]: useYoutubeVideoQuery,
};

const renderLoading = () => (
  <MessageCardComponentRoot>
    <PreviewLoading />
    <Content>
      <TitleLoading />
      <DescriptionLoading />
    </Content>
  </MessageCardComponentRoot>
);

const renderError = (type: MessageCardType) => (
  <MessageCardComponentRoot>
    <Preview>
      <Image src={errorImageSrc} srcSet={errorImageSrcSet} alt="" />
    </Preview>
    <Content>
      <Title>{errorTitle}</Title>
      <Description>{errorDescription[type]}</Description>
    </Content>
  </MessageCardComponentRoot>
);

type Props = Card;

const MessageCardComponent = ({
  id,
  type = MessageCardType.TWITCH_CLIP,
  url,
}: Props) => {
  const accessToken = useAppSelector(accessTokenSelector);
  const hook = hooks[type];
  const isTwitch = type !== MessageCardType.YOUTUBE_VIDEO;
  const card = hook(id, { skip: !id || (isTwitch && !accessToken) });

  if (card.isUninitialized) return null;
  if (card.isLoading) return renderLoading();
  if (card.isError || !card.data) return renderError(type);

  const { src, srcSet, title, description } = card.data;

  const href =
    type === MessageCardType.TWITCH_CLIP
      ? `https://clips.twitch.tv/${id}`
      : url;

  return (
    <MessageCardComponentRoot
      target="_blank"
      rel="noreferrer noopener"
      href={href}
      $clickable
    >
      <Preview>
        <Image src={src} srcSet={srcSet} alt={title} />
      </Preview>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </MessageCardComponentRoot>
  );
};

export default MessageCardComponent;
