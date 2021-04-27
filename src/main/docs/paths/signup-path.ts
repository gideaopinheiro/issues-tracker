export const signupPath = {
  post: {
    tags: ['Signup'],
    summary: 'API para criar usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParams'
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
              $ref: '#/schemas/accountCreated'
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
