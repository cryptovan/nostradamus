import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import { schema, resolvers } from './schemas/schema'

const cors = require('cors')
const express = require('express')
const graphqlHTTP = require('express-graphql')

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
