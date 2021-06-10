import { Pangolin } from '../models/pangolin.model';
import { Request, Response } from 'express';

class PangolinsController {
  async getByPangolinName(req: Request, res: Response) {
    // const pangolinName = req.params.pangolinName
    // console.log('pang name', pangolinName)
    //
    // try {
    //   // const pangolinName = await Pangolin.find({pangolinName:})
    // } catch (e) {
    //   return res.status(400).json({ error: e.message})
    // }
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    return res.json({ message: 'allo' });
  }

  async getAll(req: Request, res: Response) {
    try {
      const pangolins = (await Pangolin.find({}).lean().exec()) || [];

      return res.status(200).json({ data: pangolins });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new PangolinsController();
