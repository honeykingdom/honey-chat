import type { AllEmotes } from 'features/emotes';

/** Replaces :smile: with 😊 */
const replaceEmojis = (emojis: AllEmotes['emoji'], text: string) => {
  if (!emojis) return text;

  const emojiEntries = Object.values(emojis.entries);

  return text
    .split(' ')
    .map((word) => {
      if (!word.startsWith(':') && !word.endsWith(':')) return word;
      const name = word.slice(1, -1);
      const emoji = emojiEntries.find((e) =>
        typeof e.name === 'string'
          ? e.name === name
          : e.name.some((n) => n === name),
      );

      return emoji?.char || word;
    })
    .join(' ');
};

export default replaceEmojis;
