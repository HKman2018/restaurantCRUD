const Handlebars = require('handlebars')

Handlebars.registerHelper('ifEquals', (value1, value2) => {
  return (value1 === value2) ? 'checked' : ''
})