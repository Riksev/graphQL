const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const users = [{ id: 1, username: 'Yevhenii', age: 25 }]

const app = express()
app.use(cors())

const createUser = input => {
  const id = Date.now()
  return {
    id,
    ...input,
  }
}

const root = {
  getAllUsers: () => {
    return users
  },
  getUser: ({ id }) => {
    return users.find(user => user.id === id)
  },
  createUser: ({ input }) => {
    const user = createUser(input)
    users.push(user)
    return user
  },
}

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
)

const PORT = 5000

app.listen(PORT, () => console.log(`Server is on http://localhost:${PORT}`))
