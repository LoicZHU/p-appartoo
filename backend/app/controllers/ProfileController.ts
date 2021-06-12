import { Request, Response } from 'express';
import { Pangolin } from '../models/pangolin.model';

class ProfileController {
  async getById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    try {
      const pangolin = await Pangolin.findById(id).populate('friends').exec();

      return res.status(200).json({ data: pangolin });
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { age, family, breed, feed } = req.body;

    try {
      const updatedPangolin = await Pangolin.findByIdAndUpdate(
        id,
        { age, family, breed, feed },
        { new: true, runValidators: true },
      ).exec();

      return res.status(200).json({ data: updatedPangolin });
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  }

  async updateFriends(req: Request, res: Response) {
    const { id } = req.params;
    const { friendPangolinId } = req.body;

    try {
      const updatedPangolin = await Pangolin.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { friends: { _id: friendPangolinId } } },
        { new: true },
      ).exec();

      return res.status(200).json({ data: updatedPangolin });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  async removeFriends(req: Request, res: Response) {
    const { id } = req.params;
    const { friendPangolinId } = req.body;

    try {
      const updatedPangolin = await Pangolin.findByIdAndUpdate(
        { _id: id },
        { $pull: { friends: friendPangolinId } },
        { new: true },
      ).exec();

      return res.status(200).json({ data: updatedPangolin });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}

export default new ProfileController();
