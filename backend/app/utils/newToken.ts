import { sign } from 'jsonwebtoken';
import { IPangolin } from '../models/pangolin.model';

export interface IToken {
  pangolinId: string;
  access_token: string;
}

/**
 * Create a token.
 * @param user
 */
export function newToken(pangolin: IPangolin): IToken {
  const secretKey = process.env.TOKEN_SECRET_KEY;

  if (!secretKey) {
    throw new Error('PAS_DE_CLE_SECRETE');
  } else {
    return {
      pangolinId: pangolin.id,
      access_token: sign(
        { pangolinId: pangolin.id },
        secretKey,
        { expiresIn: '17h' },
      ),
    };
  }
}
