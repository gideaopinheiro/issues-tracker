export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-ts-node-api',
  port: process.env.PORT || 5050
}
