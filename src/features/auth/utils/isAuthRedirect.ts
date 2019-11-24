const isAuthRedirect = (hash: string) => hash.startsWith('#access_token=');

export default isAuthRedirect;
