import { start } from './main/main.js';

const run = async () => {
  const port = process.env.PORT;

  (await start()).listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
};

run();
