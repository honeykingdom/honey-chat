const isAuthRedirect = (hash) => hash.startsWith('#access_token=');

export default isAuthRedirect;
