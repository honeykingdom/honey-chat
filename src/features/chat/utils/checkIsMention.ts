const checkIsMenction = (
  userLogin: string | null,
  messageUser: string,
  messageText: string,
) =>
  !!userLogin &&
  userLogin !== messageUser &&
  RegExp(userLogin, 'gi').test(messageText);

export default checkIsMenction;
