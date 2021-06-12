import { Request, Response } from 'express';
import { Pangolin } from '../models/pangolin.model';
import { IToken, newToken } from '../utils/newToken';

class SignUpController {
  async signUp(req: Request, res: Response): Promise<Response> {
    const { email, password /*,pangolinName*/ } = req.body;
    const validRequestBody = Boolean(
      email && password && password.length >= 8 /*&& pangolinName*/,
    );

    if (!validRequestBody) {
      return res.status(400).json({
        message:
          "Un login et un mot de passe conformes sont requis pour s'enregistrer.",
      });
    } else {
      try {
        const pangolin = await Pangolin.create({
          email,
          password,
          // pangolinName,
        });
        const token: IToken = newToken(pangolin);

        return res.status(201).json(token);
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    }
  }
}

export default new SignUpController();
