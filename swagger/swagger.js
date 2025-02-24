const swaggerJSDoc = require("swagger-jsdoc");
const { signinSchema, signinResponse } = require("./schema/userLoginSchemaUI");
const { userResponse, UserSchema } = require("./Schema/UserSchemaUI");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "A simple Express API documented with Swagger",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000/api/v1",
      },
    ],
    components: {
        schemas: {
            SigninRequest: signinSchema,
            UserSchema : UserSchema
          },
          responses: {
            SigninSuccess: signinResponse[200],
            BadRequest: signinResponse[400],
            Unauthorized: signinResponse[401],
            UserSchemaResponse : userResponse[200],
          },
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
