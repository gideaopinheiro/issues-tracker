export const addProjectPath = {
  post: {
    tags: ['CreateProject'],
    summary: 'API para criar um projeto',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addProjectParams'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/project'
            }
          }
        }
      },
      400: {
        description: 'Bad Request'
      }
    }
  }
}
