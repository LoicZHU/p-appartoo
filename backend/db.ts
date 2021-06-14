import mongoose from 'mongoose';

export function connect(url = `${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`) {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Connexion à MongoDB : OK.'))
    .catch(() => console.log('Connexion à MongoDB : KO...'));
}
