const schema = `
    type Exchange {
        name: String,
        tokenCount: Int,
        status: String,
        newsMentions: Int,
        tokens: [Token]
    }

    type Token {
        code: String
        name: String
        type: String
        marketCap: Float
        priceUsd: Float
        circulatingSupply: Float
        volume24h: Float
        change24h: Float
        change7d: Float
        change1m: Float
        change3m: Float
        change6m: Float
        change1y: Float
    }

    type Query {
        exchanges: [Exchange]
        exchange(uuid:Int!): Exchange
        tokens: [Token]
        token(uuid:Int!): Token
    }

    input CompleteMatchInput {
        matchId: Int!
    }
    
    type Mutation {
        completeMatch(input: CompleteMatchInput): Token
    }
`

const fetchMatch = (uuid) => {
    console.log(uuid)
}

const resolvers = {
    Exchange: {
        tokens: async () => {
            return [
                {
                    code: 'BTC',
                    price: 50
                }
            ]
        },
    },

    Query: {
        exchanges: async (_, params) => {
            let result = [
                {
                    name: 'Bittrex',
                    tokenCount: 100,
                    status: 'Online',
                    newsMentions: 10,
                    tokens: [
                        {
                            code: 'BTC',
                            price: 50
                        }
                    ]
                }
            ]

            if (!result) {
                throw Error(`Cannot find exchange ${params.name}`)
            }

            return result
        },
        tokens: async (_, params) => {
            let result = [
                {
                    code: 'BTC',
                    name: 'Bitcoin',
                    type: 'Platform',
                    marketCap: 200000000,
                    priceUsd: 2700.50,
                    circulatingSupply: 21000000,
                    volume24h: 1000000,
                    change24h: 2.50,
                    change7d: 10.00,
                    change1m: 2.00,
                    change3m: 4.00,
                    change6m: 6.00,
                    change1y: 100.00
                },
                {
                    code: 'ETH',
                    name: 'Ethereum',
                    type: 'App',
                    marketCap: 100000000,
                    priceUsd: 300.50,
                    circulatingSupply: 21000000,
                    volume24h: 1000000,
                    change24h: 2.50,
                    change7d: 10.00,
                    change1m: 2.00,
                    change3m: 4.00,
                    change6m: 6.00,
                    change1y: 100.00
                }
            ]

            if (!result) {
                throw Error(`Cannot find token ${params.name}`)
            }

            return result
        }
    },

    Mutation: {
        completeMatch: async (_, { input }) => {
            let match = await fetchMatch(input.matchId)
            return match
        }
    },
}

export { schema, resolvers }
