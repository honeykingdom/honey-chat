type StoredUser = {
  id: string;
  login: string;
};

export const writeUserToLocatStorage = (user: StoredUser) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const readUserFromLocatStorage = (): StoredUser | null => {
  let user;

  try {
    user = JSON.parse(localStorage.user);
  } catch (e) {
    user = null;
  }

  if (!user || !user.id || !user.login) return null;

  return user as StoredUser;
};
