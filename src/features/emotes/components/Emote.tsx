import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAppSelector } from 'app/hooks';
import {
  bttvEmoteSelector,
  ffzEmojiSelector,
  ffzEmoteSelector,
  stvEmoteSelector,
  twitchEmoteSelector,
  twitchEmotesTemplateSelector,
} from 'features/api';
import { MessagePartEmote, MessagePartType } from 'features/messages';

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

  --ffz-chat-font-size: 1.3rem;

  width: 1.8rem;
  height: 1.8rem;
  width: calc(var(--ffz-chat-font-size) * 1.5);
  height: calc(var(--ffz-chat-font-size) * 1.5);
`;

// https://github.com/FrankerFaceZ/FrankerFaceZ/blob/master/styles/chat.scss#L402
// https://github.com/FrankerFaceZ/FrankerFaceZ/blob/master/src/modules/chat/emotes.js#L959
// https://github.com/FrankerFaceZ/FrankerFaceZ/blob/master/src/modules/chat/tokenizers.jsx#L1195

type TwitchEmoteProps = {
  id: string;
};

// template: https://static-cdn.jtvnw.net/emoticons/v2/{{id}}/{{format}}/{{theme_mode}}/{{scale}}
// example: https://static-cdn.jtvnw.net/emoticons/v2/354/default/dark/2.0
// format: default | static | animated
// scale: 1.0 | 2.0 | 3.0
// theme_mode: dark | light
const TwitchEmote = ({ id }: TwitchEmoteProps) => {
  const emote = useAppSelector(twitchEmoteSelector(id));
  const template = useAppSelector(twitchEmotesTemplateSelector);

  if (!emote || !template) return null;

  const tmp = template
    .replace('{{id}}', id)
    .replace('{{format}}', 'default')
    .replace('{{theme_mode}}', 'dark');
  const x1 = tmp.replace('{{scale}}', '1.0');
  const x2 = tmp.replace('{{scale}}', '2.0');
  const x4 = tmp.replace('{{scale}}', '4.0');

  return (
    <Wrapper>
      <Image
        src={x1}
        srcSet={`${x1} 1x, ${x2} 2x, ${x4} 4x`}
        alt={emote.name}
        data-id={id}
      />
    </Wrapper>
  );
};

type BttvEmoteProps = {
  id: string;
};

const BttvEmote = ({ id }: BttvEmoteProps) => {
  const emote = useAppSelector(bttvEmoteSelector(id));

  if (!emote) return null;

  const x1 = `//cdn.betterttv.net/emote/${id}/1x`;
  const x2 = `//cdn.betterttv.net/emote/${id}/2x`;
  const x3 = `//cdn.betterttv.net/emote/${id}/3x`;

  return (
    <Wrapper>
      <Image
        src={x1}
        srcSet={`${x1} 1x, ${x2} 2x, ${x3} 4x`}
        alt={emote.code}
        data-id={id}
      />
    </Wrapper>
  );
};

type FfzEmoteProps = {
  id: string;
};

const FfzEmote = ({ id }: FfzEmoteProps) => {
  const emote = useAppSelector(ffzEmoteSelector(id));

  if (!emote) return null;

  const x1 = `//cdn.frankerfacez.com/emote/${id}/1`;
  const x2 = `//cdn.frankerfacez.com/emote/${id}/2`;
  const x4 = `//cdn.frankerfacez.com/emote/${id}/4`;

  return (
    <Wrapper>
      <Image
        src={x1}
        srcSet={`${x1} 1x, ${x2} 2x, ${x4} 4x`}
        alt={emote.name}
        data-id={id}
      />
    </Wrapper>
  );
};

type StvEmoteProps = {
  id: string;
};

const StvEmote = ({ id }: StvEmoteProps) => {
  const emote = useAppSelector(stvEmoteSelector(id));

  if (!emote) return null;

  const x1 = `//cdn.7tv.app/emote/${id}/1x`;
  const x2 = `//cdn.7tv.app/emote/${id}/2x`;
  const x4 = `//cdn.7tv.app/emote/${id}/4x`;

  return (
    <Wrapper>
      <Image
        src={x1}
        srcSet={`${x1} 1x, ${x2} 2x, ${x4} 4x`}
        alt={emote.name}
        data-id={id}
      />
    </Wrapper>
  );
};

type EmojiProps = {
  id: string;
};

const Emoji = ({ id }: EmojiProps) => {
  const emote = useAppSelector(ffzEmojiSelector(id));

  if (!emote) return null;

  const w72 = `//cdn.frankerfacez.com/static/emoji/images/twemoji/${id}.png`;

  return (
    <Wrapper>
      <ImageEmoji
        src={w72}
        srcSet={`${w72} 72w`}
        alt={emote.char}
        data-id={id}
      />
    </Wrapper>
  );
};

type Props = MessagePartEmote;

const Emote = ({ content, type }: Props) => {
  if (type === MessagePartType.TWITCH_EMOTE) {
    return <TwitchEmote id={content} />;
  }

  if (type === MessagePartType.BTTV_EMOTE) {
    return <BttvEmote id={content} />;
  }

  if (type === MessagePartType.FFZ_EMOTE) {
    return <FfzEmote id={content} />;
  }

  if (type === MessagePartType.STV_EMOTE) {
    return <StvEmote id={content} />;
  }

  if (type === MessagePartType.EMOJI) {
    return <Emoji id={content} />;
  }

  return null;
};

export default Emote;
