export type Emotes<T> = {
  /** [id]: T */
  entries: Record<string, T>;

  /** [name]: id */
  names: Record<string, string>;
};

export type Badges<T> = {
  /** [badgeId]: T */
  entries: Record<string, T>;

  /** [userId]: badgeIds */
  users: Record<string, string[]>;
};
