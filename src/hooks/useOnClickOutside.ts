// https://usehooks.com/useOnClickOutside/
// https://usehooks-ts.com/react-hook/use-on-click-outside
import { useEffect, type RefObject } from 'react';

type Event = WindowEventMap['mousedown'] | WindowEventMap['touchstart'];
type Handler = (event: Event) => void;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
