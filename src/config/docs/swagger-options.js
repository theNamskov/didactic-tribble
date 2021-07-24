import 'dotenv/config'

export const specOptions = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      title: 'dnar Assessment Fullstack API',
      description: 'A dnar assessment test API',
      contact: {
        name: 'dnar',
        url: 'https://dnar.io/',
      },
      servers: [process.env.APP_BASE_URL, '<ANOTHER_SERVER_URL_HERE>'],
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
