import { Logger } from './logger';
import { tokenStringResolver } from './token-string-resolver';

const _logger = new Logger();

export const retriveToken = async (tokenCtx: any) => {
  const token = await tokenCtx.getToken();

  if (!token) {
    _logger.log('no token, func: retriveToken');
    return;
  }

  const tk = await tokenStringResolver(token);
  return tk;
};
