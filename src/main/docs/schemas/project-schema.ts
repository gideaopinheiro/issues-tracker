export const projectSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
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
  required: ['id', 'account', 'title', 'description']
}
