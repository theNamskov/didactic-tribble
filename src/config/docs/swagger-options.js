import 'dotenv/config'

export const specOptions = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      title: 'Dnar Assessment Fullstack API',
      description: 'A Dnar assessment test API',
      contact: {
        name: 'Dnar',
        url: 'https://dnar.io/',
      },
      servers: [process.env.APP_BASE_URL],
      version: '1.0.0',
    },
  },
  tags: ['Auth', 'Employee', 'Project'],
  apis: ['src/config/docs/*.yaml'],
  consumes: ['application/json'],
  produces: ['application/json'],
}

export const customOptions = {
  customCssUrl: '/swagger-style.css',
}
