import { loginPath } from '@/main/docs/paths/login-path'
import { signupPath } from '@/main/docs/paths/signup-path'
import { addProjectPath } from '@/main/docs/paths/add-project-path'
import { accountSchema } from '@/main/docs/schemas/account-schema'
import { accountCreatedSchema } from '@/main/docs/schemas/account-created-schema'
import { loginParamsSchema } from '@/main/docs/schemas/login-params-schema'
import { signupParamsSchema } from '@/main/docs/schemas/signup-params-schema'
import { projectSchema } from './schemas/project-schema'
import { projectParamsSchema } from './schemas/project-params-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'issues-tracker-api',
    description: '',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Signup'
  }, {
    name: 'CreateProject'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/projects/add': addProjectPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    accountCreated: accountCreatedSchema,
    signupParams: signupParamsSchema,
    project: projectSchema,
    addProjectParams: projectParamsSchema
  }
}
