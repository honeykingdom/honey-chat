import fs from 'fs/promises';
import ffzEmoji from '../src/mocks/ffzEmoji.json';
import { parseFfzEmoji } from '../src/features/api/ffz/ffzApiParseResponses';

const main = async () => {
  const emoji = parseFfzEmoji(ffzEmoji as any);

  let html = '<div style="display:flex;flex-wrap:wrap;">';

  for (const { char, codePoints } of Object.values(emoji.entries)) {
    html += `<img src="https://twemoji.maxcdn.com/v/latest/72x72/${codePoints}.png" alt="${char}" />`;
  }

  html += '</div>';

  await fs.writeFile('./scripts/emoji.html', html);
  await fs.writeFile('./scripts/emoji.json', JSON.stringify(emoji, null, 2));
};

main();
