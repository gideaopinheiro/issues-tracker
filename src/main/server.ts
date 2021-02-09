import { MonogHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MonogHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(5050, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
