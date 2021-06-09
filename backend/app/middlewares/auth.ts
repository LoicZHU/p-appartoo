import { verify } from 'jsonwebtoken';
import { LeanDocument } from 'mongoose';

import { Pangolin } from '../models/pangolin.model';
import { NextFunction, Request, Response } from 'express';

export async function auth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Promise<Response> | void> {
  const secretKey: string | undefined = process.env.TOKEN_SECRET_KEY;
  const bearer: string | undefined = req.headers.authorization;
  const errorMessage: string = "Vous n'êtes pas authentifié";

  if (!bearer) {
    return res.status(401).json({ message: errorMessage });
  } else if (!bearer.startsWith('Bearer ')) {
    return res.status(401).json({ message: errorMessage });
  } else if (!secretKey) {
    throw new Error('Pas de clé secrète.');
  } else {
    let payload;
    const token: string = bearer.split('Bearer ')[1].trim();

    try {
      verify(token, secretKey, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: errorMessage });
        } else {
          payload = Object.assign({}, decodedToken);
        }
      });
    } catch (e) {
      return res.status(401).json({ error: e.message || errorMessage });
    }

    if (!payload) {
      return res.status(401).json({ error: errorMessage });
    } else {
      const pangolin: LeanDocument<any> | null = await Pangolin.findById(
        payload['pangolinId'],
      )
        .select('-password')
        .lean()
        .exec();

      if (!pangolin) {
        return res.status(401).json({ error: errorMessage });
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req['pangolin'] = pangolin;
        return next();
      }
    }
  }
}
