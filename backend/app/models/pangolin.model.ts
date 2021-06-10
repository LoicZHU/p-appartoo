import {
  Document,
  HookNextFunction,
  Model,
  Schema,
  SchemaTypes,
} from 'mongoose';
import mongoose from 'mongoose';
import argon2, { verify } from 'argon2';

// --- interfaces
export interface IPangolin extends Document {
  id: string;
  email: string;
  password: string;
  age: string;
  family: string;
  breed: string;
  feed: string;
}

export interface IPangolinBaseDocument extends IPangolin {
  checkPassword(givenPassword: string): Promise<boolean>;
}

// --- schema
const pangolinSchema: Schema<IPangolinBaseDocument> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    // pangolinName: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    age: {
      type: Number,
    },
    family: {
      type: String,
      default: 'Manidae',
      enum: ['Eomanidae', 'Patriomanidae', 'Manidae'],
    },
    breed: {
      type: String,
      default: 'Pangolin à petites écailles',
      enum: [
        'Pangolin malais',
        'Pangolin de Chine',
        'Pangolin indien',
        'Pangolin des Philippines',
        'Pangolin géant',
        'Pangolin du Cap',
        'Pangolin à longue queue',
        'Pangolin à petites écailles',
      ],
    },
    feed: {
      type: String,
      default: 'Insecte',
      enum: ['Insecte', 'Kebap', 'Pizza', 'Salade'],
    },
    friends: [{ type: SchemaTypes.ObjectId, ref: 'pangolin' }],
  },
  {
    timestamps: true,
  },
);

pangolinSchema.pre<IPangolin>(
  'save',
  async function hashPassword(next: HookNextFunction): Promise<void> {
    try {
      // docs: https://github.com/ranisalt/node-argon2#readme | https://www.npmjs.com/package/argon2
      const hash: string = await argon2.hash(this.password, {
        type: argon2.argon2id,
      });
      this.password = hash;

      next();
      return;
    } catch (err) {
      next(err);
      return;
    }
  },
);

// --- custom method
pangolinSchema.methods.checkPassword = async function (
  givenPassword,
): Promise<boolean> {
  const hash: string = this.password;
  return await verify(hash, givenPassword);
};

export const Pangolin: Model<IPangolinBaseDocument> = mongoose.model(
  'pangolin',
  pangolinSchema,
);
