export const projectParamsSchema = {
  type: 'object',
  properties: {
    account: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    members: {
      type: 'array',
      items: {
        id: {
          type: 'string'
        },
        role: {
          type: 'string'
        }
      }
    },
    tickets: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['account', 'title', 'description']
}
