import { createServer } from '@graphql-yoga/node'

const livros = [
  {
    id: '1',
    titulo: "Effective Java",
    genero: "Técnico",
    edicao: 3,
    preco: 39.99
  },
  {
    id: '2',
    titulo: "Concrete Mathematics",
    genero: "Técnico",
    edicao: 1,
    preco: 89.99
  }
]


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
    bemVindo(nome: String): String!
    effectiveJava: Livro!
    notas: [Int!]!
    adicionar(numeros: [Float!]!): Float!
    livros(precoMaximo: Float): [Livro!]!
  }
`
//2 Implementar as operações prometidas na interface. Ou seja, escrever um resolver para cada operação prometida. Um resolver é uma função.

const resolvers = {
  Query: {
    bemVindo(parent, args, ctx, info){
      // console.log('parent', JSON.stringify(parent))
      // console.log('args', JSON.stringify(args))
      // return "Bem vindo!"
      //se o cliente enviar o seu nome (João)
      //devolver Hello, João
      //caso contrário, devolver Hello, Visitante
      return `Hello, ${args.nome ? args.nome : "Visitante"}`
    },
    effectiveJava(){
      return {
        id: '123456',
        titulo: null,
        genero: "Técnico",
        edicao: 3,
        preco: 43.9
      }  
    },
    notas(){
      return[10, 2, 7, 7, 8]
    },
    adicionar(parent, args, ctx, info){
      return args.numeros.length <= 0 ? 0 :
      args.numeros.reduce((ac, atual) =>{
        return ac + atual
      })
    },
    livros(parent, args, ctx, info){
      console.log(args)
      return args.precoMaximo ? livros.filter(livro => livro.preco <= args.precoMaximo) : livros
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