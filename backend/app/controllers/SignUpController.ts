import { Request, Response } from 'express';
import IsEmail from 'isemail';

import { Pangolin } from '../models/pangolin.model';
import { IToken, newToken } from '../utils/newToken';

class SignUpController {
  async signUp(req: Request, res: Response): Promise<Response> {
    const { password, pangolinName } = req.body;
    let { email } = req.body;

    const isEmailCorrect = typeof email == 'string' && IsEmail.validate(email);

    if (!isEmailCorrect) {
      // nothing
    } else {
      email = email.trim().toLowerCase();
    }

    const lettersAndNumbersRegex = /^[a-zA-Z0-9]+$/;
    const isPangolinNameCorrect = typeof pangolinName == 'string' && lettersAndNumbersRegex.test(pangolinName);

    const validRequestBody = Boolean(isEmailCorrect && password && password.length >= 8 && isPangolinNameCorrect);

    if (!validRequestBody) {
      return res.status(400).json({
        message: "Le login, le mot de passe et le nom d'utilisateur doivent être conformes pour s'inscrire.",
      });
    } else {
      try {
        const pangolin = await Pangolin.create({
          email,
          password,
          pangolinName,
        });
        const token: IToken = newToken(pangolin);

        return res.status(201).json(token);
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    }
  }

  async getPropertyAvailability(req: Request, res: Response) {
    const { property, value } = req.params;

    try {
      const pangolin = await Pangolin.find({ [property]: value });

      if (pangolin.length <= 0) {
        return res.status(200).json({ available: true });
      } else {
        return res.status(200).json({ available: false });
      }
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}

export default new SignUpController();
