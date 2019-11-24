import { lib as emojilib } from 'emojilib';

const replaceEmojis = (text: string) =>
  text
    .split(' ')
    .map((word: string) => {
      if (word[0] !== ':' || word[word.length - 1] !== ':') {
        return word;
      }

      const name = word.slice(1, -1);
      const emoji = emojilib[name];

      return emoji && emoji.char ? emoji.char : word;
    })
    .join(' ');

export default replaceEmojis;
