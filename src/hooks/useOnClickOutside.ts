import { useEffect } from 'react';
import arePassiveEventsSupported from 'are-passive-events-supported';
import useLatest from 'use-latest';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: PossibleEvent) => void;

const events: HandledEvents = [MOUSEDOWN, TOUCHSTART];

const arePassiveEvents = arePassiveEventsSupported();

const getOptions = (event: HandledEventsType) =>
  event === MOUSEDOWN && arePassiveEvents ? { passive: true } : undefined;

const isContainsNode = (el: HTMLElement | null, node: Node) =>
  el && el.contains(node);

const useOnClickOutside = (
  ref:
    | React.RefObject<HTMLElement>
    | React.RefObject<React.RefObject<HTMLElement>[]>,
  handler: Handler | null,
) => {
  const handlerRef = useLatest(handler);

  useEffect(() => {
    if (!handler) {
      return;
    }

    const listener = (event: PossibleEvent) => {
      if (!ref.current || !handlerRef.current) return;

      if (Array.isArray(ref.current)) {
        const isContains = ref.current.some((r) =>
          isContainsNode(r.current, event.target as Node),
        );

        if (isContains) {
          return;
        }
      } else if (isContainsNode(ref.current, event.target as Node)) {
        return;
      }

      handlerRef.current(event);
    };

    events.forEach((event) => {
      document.addEventListener(event, listener, getOptions(event));
    });

    // eslint-disable-next-line consistent-return
    return () => {
      events.forEach((event) => {
        document.removeEventListener(
          event,
          listener,
          getOptions(event) as EventListenerOptions,
        );
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!handler]);
};

export default useOnClickOutside;
