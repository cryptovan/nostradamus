import express from 'express'
import graphqlHTTP from 'express-graphql'
import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import cors from 'cors'

import { schema, resolvers } from './schemas/schema'

const app = express()

const jsSchema: GraphQLSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers,
})

app.use(cors())

app.use(
    '/graphql',
    graphqlHTTP({
        schema: jsSchema,
        graphiql: true,
    })
)

app.listen(4000)

console.log('Running a GraphQL API server at localhost:4000/graphql')
