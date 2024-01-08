let swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const basePath = `/api`;

module.exports = function (app) {
  // swagger definition
  let swaggerDefinition = {
    swagger: "2.0",
    info: {
      title: "Authentication and Authorization",
      description: "RESTful API for Authentication and Authorization",
      version: "1.0"
    },
    produces: ["application/json"],
    host: process.env.HOST_NAME,
    basePath: basePath,
    securityDefinitions: {
      APIKeyHeader: {
        type: "apiKey",
        in: "header",
        name: "authorization"
      }
    }
  };

  // options for the swagger docs
  let options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    explorer: true,
    // path to the API docs
    apis: ["./controllers/*.js"]
  };
  let extraOptions = {
    explorer: true,
    swaggerOptions: {
      validatorUrl: null
    },
    customSiteTitle: "Authentication and Authorization"
  };
  // initialize swagger-jsdoc
  let swaggerSpec = swaggerJSDoc(options);
  require("swagger-model-validator")(swaggerSpec);

  app.use(`${basePath}/swagger/v1`, swaggerUi.serve, swaggerUi.setup(swaggerSpec, extraOptions));

  //serve swagger
  app.get("/swagger.json", function (req, res) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.send(swaggerSpec);
  });
};
