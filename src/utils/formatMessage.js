// import urlRegex from 'url-regex';

// const formatLinks = (text) => {
//   let arr;
//   const regexp = urlRegex({ strict: false });

//   while ((arr = regexp.exec(text)) !== null) {
//     return text.replace(
//       arr[0],
//       `<a href="${arr[0]}" target="_blank" rel="noopener noreferrer">${
//         arr[0]
//       }</a>`,
//     );
//   }

//   return text;
// };

const formatEmotes = (text = '', emotes) => {
  let splitText = text.split('');

  Object.entries(emotes || {}).forEach(([i, e]) => {
    e.forEach((mote) => {
      if (typeof mote !== 'string') return;

      const [moteStart, moteEnd] = mote.split('-').map(Number);

      const length = moteEnd - moteStart;
      const empty = [...Array(length + 1)].map(() => '');

      splitText = splitText
        .slice(0, moteStart)
        .concat(empty)
        .concat(splitText.slice(moteEnd + 1, splitText.length));

      splitText.splice(
        moteStart,
        1,
        `<img class="chat-image" src="https://static-cdn.jtvnw.net/emoticons/v1/${i}/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/${i}/1.0 1x,https://static-cdn.jtvnw.net/emoticons/v1/${i}/2.0 2x,https://static-cdn.jtvnw.net/emoticons/v1/${i}/3.0 4x">`,
      );
    });
  });

  return splitText.join('');
};

export default formatEmotes;
