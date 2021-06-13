import { Pangolin } from '../models/pangolin.model';
import { Request, Response } from 'express';

class PangolinsController {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const pangolins = (await Pangolin.find({}).lean().exec()) || [];

      return res.status(200).json({ data: pangolins });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new PangolinsController();
