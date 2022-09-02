import { LS } from 'utils/constants';

const clearAuthData = () => {
  localStorage.removeItem(LS.User);
  localStorage.removeItem(LS.Tokens);
};

export default clearAuthData;
