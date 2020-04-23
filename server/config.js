module.exports = {
  DB_URI_ATLAS: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-kvxoo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  SECRET_KEY: process.env.JWT_KEY,
  API_KEY: process.env.GOOGLE_API_KEY
}