const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const commentRouter = require('./comment');
const pinRouter = require('./pin');
const viewRouter = require('./view');

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: '핀터레스트',
    version: '1.0.0',
    description: '핀터레스트 API 설계',
  },
  host: 'localhost:3000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./swagger/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
router.get('/swagger.json', (req, res) => {
  res.setHeader('content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/comment', commentRouter);
router.use('/', pinRouter);
router.use('/view', viewRouter);
router.use('/user', userRouter);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
