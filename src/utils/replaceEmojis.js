import emojilib from 'emojilib/emojis';

const replaceEmojis = (text) =>
  text
    .split(' ')
    .map((word) => {
      if (word[0] !== ':' || word[word.length - 1] !== ':') {
        return word;
      }

      const name = word.slice(1, -1);
      const emoji = emojilib[name];

      return emoji && emoji.char ? emoji.char : word;
    })
    .join(' ');

export default replaceEmojis;
