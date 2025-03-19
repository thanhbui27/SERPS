const responseSchema = {
  200: {
    description: "Successful",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: {
              type: "string",
              example: "get data success",
            },
          },
        },
      },
    },
  },
  400: {
    description: "Invalid request",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: {
              type: "string",
              example: "Invalid request data",
            },
          },
        },
      },
    },
  },
  401: {
    description: "Unauthorized",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        example: {
          message: "Unauthorized",
        },
      },
    },
  },
};

module.exports = responseSchema;
