import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { TWITCH_EMOTES_CDN } from 'utils/constants';
import type { MessageCardInfo } from 'features/messages/messagesSlice';
import { messageCardSelector } from 'features/messageCards/messageCardsSelectors';

const MessageCardRoot = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer noopener',
})<{ $clickable?: boolean }>`
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

const id = '58765';
const errorImageSrc = `${TWITCH_EMOTES_CDN}/${id}/1.0`;
const errorImageSrcSet = `${TWITCH_EMOTES_CDN}/${id}/1.0 1x, ${TWITCH_EMOTES_CDN}/${id}/2.0 2x, ${TWITCH_EMOTES_CDN}/${id}/3.0 4x`;

const errorTitle = 'Something went wrong';
const errorDescription = {
  'twitch-clip': "We couldn't find that Clip",
  'twitch-video': "We couldn't find that Video",
  'youtube-video': "We couldn't find that Video",
};

const renderLoading = () => (
  <MessageCardRoot>
    <PreviewLoading />
    <Content>
      <TitleLoading />
      <DescriptionLoading />
    </Content>
  </MessageCardRoot>
);

const renderError = (type: MessageCardInfo['type']) => (
  <MessageCardRoot>
    <Preview>
      <Image src={errorImageSrc} srcSet={errorImageSrcSet} alt="" />
    </Preview>
    <Content>
      <Title>{errorTitle}</Title>
      <Description>{errorDescription[type]}</Description>
    </Content>
  </MessageCardRoot>
);

type Props = Omit<MessageCardInfo, 'url'>;

const MessageCard = (cardInfo: Props) => {
  const card = useSelector(messageCardSelector(cardInfo));

  if (!card || card.status === 'loading') {
    return renderLoading();
  }

  if (card.status === 'error') {
    return renderError(cardInfo.type);
  }

  const { url, src, srcSet, title, description } = card;

  return (
    <MessageCardRoot href={url} $clickable>
      <Preview>
        <Image src={src} srcSet={srcSet} alt={title} />
      </Preview>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </MessageCardRoot>
  );
};

export default MessageCard;
