export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "API trip Service",
      version: "0.1.2",
      description: `
          aaaaaa
        `,
      contact: {
        name: "Claudio",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    servers: [
      {
        url: "https://TODO",
        description: "App server",
      },
      {
        url: "http://localhost:8080/",
        description: "Local server",
      },
    ],
  },
  basePath: "/",
  apis: [
    "./src/controller/*.ts",
  ]
}
