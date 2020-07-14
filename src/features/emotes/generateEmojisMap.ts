/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import emojiUnicode from 'emoji-unicode';
import { lib as emojilib } from 'emojilib';

const TWITTER_EXCLUDE_FE0F = [
  'relaxed',
  'sunny',
  'cloud',
  'snowflake',
  'airplane',
  'phone',
  'email',
  'scissors',
  'black_nib',
  'pencil2',
  'heart',
  'u6708',
  'eight_pointed_black_star',
  'secret',
  'congratulations',
  'a',
  'b',
  'o2',
  'hotsprings',
  'bangbang',
  'interrobang',
  'part_alternation_mark',
  'warning',
  'recycle',
  'sparkle',
  'eight_spoked_asterisk',
  'm',
  'sa',
  'parking',
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'eject_button',
  'arrow_forward',
  'arrow_backward',
  'arrow_right',
  'arrow_left',
  'arrow_up',
  'arrow_down',
  'arrow_upper_right',
  'arrow_lower_right',
  'arrow_lower_left',
  'arrow_upper_left',
  'arrow_up_down',
  'left_right_arrow',
  'arrow_right_hook',
  'leftwards_arrow_with_hook',
  'arrow_heading_up',
  'arrow_heading_down',
  'hash',
  'information_source',
  'wavy_dash',
  'heavy_check_mark',
  'heavy_multiplication_x',
  'copyright',
  'registered',
  'tm',
  'ballot_box_with_check',
  'black_small_square',
  'white_small_square',
  'black_medium_square',
  'white_medium_square',
  'spades',
  'clubs',
  'hearts',
  'diamonds',
];

(async () => {
  const emojis = Object.entries(emojilib).reduce(
    (acc, [name, { keywords, char }]) => {
      const allCodes = emojiUnicode(char).split(' ');
      const codes = TWITTER_EXCLUDE_FE0F.includes(name)
        ? allCodes.filter((s) => s !== 'fe0f')
        : allCodes;
      const unified = codes.join('-');

      return {
        ...acc,
        [name]: { short: name, keywords, char, unified },
      };
    },
    {},
  );

  await fs.promises.writeFile(
    './src/features/emotes/emojisMap.json',
    JSON.stringify(emojis, null, 2),
  );
})();
