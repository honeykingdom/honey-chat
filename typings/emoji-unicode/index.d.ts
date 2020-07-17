declare module 'emoji-unicode' {
  /**
   * emojiUnicode
   * Get the unicode code of an emoji in base 16.
   *
   * @name emojiUnicode
   * @function
   * @param {String} input The emoji character.
   * @returns {String} The base 16 unicode code.
   */
  function emojiUnicode(input: string): string;

  /**
   * emojiUnicode.raw
   * Get the unicode code points of an emoji in base 16.
   *
   * @name emojiUnicode.raw
   * @function
   * @param {String} input The emoji character.
   * @returns {String} The unicode code points.
   */
  function raw(input: string): string;

  emojiUnicode.raw = raw;

  export default emojiUnicode;
}
