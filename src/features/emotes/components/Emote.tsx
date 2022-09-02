import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAppSelector } from 'app/hooks';
import { emotesSelector } from 'features/emotes';
import { type MessagePartEmote, MessagePartType } from 'features/messages';
import createHtmlEmote from '../utils/createHtmlEmote';

const Wrapper = styled.span`
  display: inline;
`;
const imageCss = css`
  position: relative;
  margin: -0.5rem 0;
  max-width: 100%;
  vertical-align: middle;
`;
const Image = styled.img`
  ${imageCss}
`;
const ImageEmoji = styled.img`
  ${imageCss};

  --ffz-chat-font-size: 13px;

  width: 19.5px;
  height: 19.5px;
  width: calc(var(--ffz-chat-font-size) * 1.5);
  height: calc(var(--ffz-chat-font-size) * 1.5);
`;

type Props = MessagePartEmote;

const Emote = ({ type, content }: Props) => {
  const emotes = useAppSelector(emotesSelector);
  const htmlEmote = createHtmlEmote(emotes, type, content);

  if (!htmlEmote) return null;

  const { id, title, alt, src, srcSet } = htmlEmote;

  return type === MessagePartType.EMOJI ? (
    <Wrapper>
      <ImageEmoji
        title={title}
        alt={alt}
        src={src}
        srcSet={srcSet}
        data-id={id}
      />
    </Wrapper>
  ) : (
    <Wrapper>
      <Image title={title} alt={alt} src={src} srcSet={srcSet} data-id={id} />
    </Wrapper>
  );
};

export default Emote;
