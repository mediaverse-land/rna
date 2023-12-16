export const tokenStringResolver = (token: string | null | any) => {
  if (!token) {
    return;
  }
  return token?.charAt(0) === '"' ? token.slice(1, token.length - 1) : token;
};
