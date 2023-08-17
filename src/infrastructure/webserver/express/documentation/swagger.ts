import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'This API provides CRUD operations for managing tasks per user.'
  }
};

const swaggerDefinitions = {
  swaggerDefinition,
  apis: [
    'src/infrastructure/webserver/express/documentation/common/auth.yaml',
    'src/infrastructure/webserver/express/documentation/routes/user-routes.yaml',
    'src/infrastructure/webserver/express/documentation/models/user.yaml',
    'src/infrastructure/webserver/express/documentation/models/error.yaml'
  ]
};

const options = {
  swaggerOptions: {
    defaultModelsExpandDepth: -1
  }
};

const specs = swaggerJSDoc(swaggerDefinitions);

export default {
  specs,
  options
};
