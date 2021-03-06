import { Request, Response } from 'express';
import IsEmail from 'isemail';

import { Pangolin } from '../models/pangolin.model';
import { IToken, newToken } from '../utils/newToken';

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    let email = req.body.email;
    email = email.trim().toLowerCase();
    const isEmailCorrect = typeof email == 'string' && IsEmail.validate(email);

    if (!isEmailCorrect) {
      // nothing
    } else {
      email = email.trim().toLowerCase();
    }

    try {
      // checks the user in the database
      const pangolin = await Pangolin.findOne({
        email,
      }).exec();

      if (!pangolin) {
        return res.status(401).json({ message: 'Les identifiants sont incorrects.' });
      } else {
        // checks the password (docs: https://github.com/ranisalt/node-argon2#readme | https://www.npmjs.com/package/argon2)
        try {
          const isValidPassword: boolean = await pangolin.checkPassword(req.body.password);

          if (!isValidPassword) {
            return res.status(401).json({ message: 'Les identifiants sont incorrects.' });
          } else {
            const token: IToken = newToken(pangolin);
            return res.status(200).json(token);
          }
        } catch (e) {
          return res.status(500).json({ error: e.message });
        }
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new AuthController();
