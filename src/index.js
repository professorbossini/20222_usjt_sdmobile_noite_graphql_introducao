import { createServer } from '@graphql-yoga/node'

//1 Especificar as operações que existem. Ou seja, a nossa interface.
const typeDefs = `
  type Livro {
    id: ID!
    titulo: String!
    genero: String!
    edicao: Int
    preco: Float
  },
  type Query {
    effectiveJava: Livro!
  }
`
//2 Implementar as operações prometidas na interface. Ou seja, escrever um resolver para cada operação prometida. Um resolver é uma função.

const resolvers = {
  Query: {
    effectiveJava(){
      return {
        id: '123456',
        titulo: null,
        genero: "Técnico",
        edicao: 3,
        preco: 43.9
      }  
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