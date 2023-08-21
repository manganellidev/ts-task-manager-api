import ExpressWebServer from '../infrastructure/webserver/express/express.js';
import UserControllersFactory from './factories/user/user-controllers-factory.js';
import MongoDBConnection from '../infrastructure/database/mongodb/mongo-db-connection.js';

export const start = async () => {
  const [userControllers, userRepository] = UserControllersFactory.make();

  const controllers = [...userControllers];

  const app = ExpressWebServer.create(controllers, userRepository);

  await MongoDBConnection.connect();
  return app;
};
