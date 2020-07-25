import * as htmlEntity from 'features/messages/utils/htmlEntity';

type ASuggestions = {
  isActive: boolean;
  activeIndex: number;
  start: number;
  end: number;
};
type UserSuggestions = ASuggestions & {
  type: 'users';
  items: string[];
};
type EmoteSuggestions = ASuggestions & {
  type: 'emotes';
  items: htmlEntity.Emote[];
};
export type SuggestionsState = UserSuggestions | EmoteSuggestions;

export const suggestionsInitialState: SuggestionsState = {
  type: 'users',
  isActive: false,
  items: [],
  activeIndex: 0,
  start: 0,
  end: 0,
};

export const setSuggestionsIndexUp = (
  state: SuggestionsState,
): SuggestionsState => ({
  ...state,
  activeIndex:
    state.activeIndex === 0 ? state.items.length - 1 : state.activeIndex - 1,
});

export const setSuggestionsIndexDown = (
  state: SuggestionsState,
): SuggestionsState => ({
  ...state,
  activeIndex:
    state.activeIndex === state.items.length - 1 ? 0 : state.activeIndex + 1,
});

export const replaceSuggestionText = (
  text: string,
  { type, items, activeIndex, start, end }: SuggestionsState,
) => {
  if (items.length === 0) return text;

  const currentItem = items[activeIndex];
  const insertedText =
    type === 'users'
      ? `@${currentItem}`
      : (currentItem as htmlEntity.Emote).alt;

  const textBefore = text.substring(0, start);
  const testAfter = text.substring(end) || ' ';

  return `${textBefore}${insertedText}${testAfter}`;
};
