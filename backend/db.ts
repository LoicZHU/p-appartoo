import mongoose from 'mongoose';

export function connect(url = 'mongodb://localhost/p-appartoo') {
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