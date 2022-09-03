import { Howl } from 'howler';

const tink = new Howl({ src: ['/sounds/ts-tink.ogg'] });

const SOUNDS = {
  tink,
};

const playSound = (name: keyof typeof SOUNDS) => SOUNDS[name].play();

export default playSound;
