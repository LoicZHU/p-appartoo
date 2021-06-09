# Pangobook

## Getting started
### Install dependencies
- Go into `backend` folder and install with `npm` and `yarn`.
- Go into `frontend` folder and install with `npm` and `yarn`.

### Launch app
- Go into `backend` folder:
  - Copy the `.env-example` and rename it: `.env`.
  - In your `.env` file, fill:
    - the `SERVER_HOST` property with: http://localhost
    - the `SERVER_PORT` property with: `3333` for example
    - the TOKEN_SECRET_KEY property with: a simple random key string
   - build the server with: `npm run build` and `yarn build`
   - and launch the server with: `npm start` and `yarn start`.
  
- Go into `frontend/src/angular-app` folder, launch the Angular server: `ng serve`. Enjoy!