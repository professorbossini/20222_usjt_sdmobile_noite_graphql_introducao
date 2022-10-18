import { createServer } from '@graphql-yoga/node'

//1 Especificar as operações que existem. Ou seja, a nossa interface.
const typeDefs = `
  type Query{
    hello: String!
    name: String!
    id: ID!
    localizacao: String!
    idade: Int!
    deMaior: Boolean!
    salario: Float
  }
`
//2 Implementar as operações prometidas na interface. Ou seja, escrever um resolver para cada operação prometida. Um resolver é uma função.

const resolvers = {
  Query: {
    hello(){
      return "Hello, GraphQL!!!"
    },
    name(){
      return "João"
    },
    id(){
      return "umid"
    },
    localizacao(){
      return "SP"
    },
    idade(){
      return 29
    },
    deMaior(){
      return true
    },
    salario(){
      return 1000
    }
  }
}
//3. Construir um servidor entregando a ele a especificação das operações e, mais ainda, a sua implementação.
const server = createServer({
  schema: {
    // typeDefs: typeDefs,
    // resolvers: resolvers
    typeDefs,
    resolvers
  }
})


server.start()