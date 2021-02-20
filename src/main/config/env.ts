export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/issues-tracker-api',
  port: process.env.PORT || 5050,
  secretKey: process.env.SECRET || 'secret'
}
