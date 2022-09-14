import { Howl } from 'howler';

const SOUNDS: Record<string, string | Howl> = {
  tink: '/sounds/ts-tink.ogg',
};

const playSound = (name: keyof typeof SOUNDS) => {
  let sound = SOUNDS[name];

  if (typeof sound === 'string') {
    sound = new Howl({ src: [sound] });
    SOUNDS[name] = sound;
  }

  return sound.play();
};

export default playSound;
