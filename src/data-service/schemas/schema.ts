import { Module as CoinMarketCapHills } from '../../scraper/modules/coinmarketcap-hills'

const mod = new CoinMarketCapHills()
mod.monitor()

const schema = `
    type Exchange {
        name: String
        tokenCount: Int
        status: String
        newsMentions: Int
        hackMentions: Int
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
        hackCount: Int
        hackMentions: Int
        volatilityRank: Float
    }

    type Query {
        exchanges: [Exchange]
        exchange(code:String!): Exchange
        tokens: [Token]
        token(code:String!): Token
        deals: [Deal]
    }

    type Deal {
        date: String
        type: String
        token: Token
        exchanges: [Exchange]
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

type Token = {
    code: string | null,
    name: string | null,
    type: string | null,
    marketCap: number | null,
    priceUsd: number | null,
    circulatingSupply: number | null,
    volume24h: number | null,
    change24h: number | null,
    change7d: number | null,
    change1m: number | null,
    change3m: number | null,
    change6m: number | null,
    change1y: number | null,
    hackCount: number | null,
    hackMentions: number | null,
    volatilityRank: number | null
}

type Exchange = {
    name: string,
    tokens: Array<Token>
}

type Deal = {
    date: string,
    type: string,
    token: Token,
    exchanges: Array<Exchange>
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
        deals: async (_) => {
            const d = mod.deals[0]

            let result: Array<Deal> = [
                {
                    date: d.date,
                    type: d.type,
                    token: {
                        code: d.token.data!.code,
                        name: d.token.data!.name,
                        type: 'Platform',
                        marketCap: d.token.data!.marketCap,
                        priceUsd: d.token.data!.priceUsd,
                        circulatingSupply: d.token.data!.circulatingSupply,
                        volume24h: d.token.data!.day.volume,
                        change24h: d.token.data!.day.max! / d.token.data!.day.end! - 1,
                        change7d: d.token.data!.week.max! / d.token.data!.week.end! - 1,
                        change1m: d.token.data!.month.max! / d.token.data!.month.end! - 1,
                        change3m: 4.00,
                        change6m: 6.00,
                        change1y: 100.00,
                        hackCount: 1,
                        hackMentions: 1,
                        volatilityRank: 1
                    },
                    exchanges: []
                }
            ]

            return result
        },
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
        token: async (_, params) => {
            let token = mod.tokens.filter((token) => token.code === params.code)[0]
            
            const result = {
                code: token.data!.code,
                name: token.data!.name,
                type: 'Platform',
                marketCap: token.data!.marketCap,
                priceUsd: token.data!.priceUsd,
                circulatingSupply: token.data!.circulatingSupply,
                volume24h: token.data!.day.volume,
                change24h: token.data!.day.max! / token.data!.day.end! - 1,
                change7d: token.data!.week.max! / token.data!.week.end! - 1,
                change1m: token.data!.month.max! / token.data!.month.end! - 1,
                change3m: 4.00,
                change6m: 6.00,
                change1y: 100.00,
                hackCount: 1,
                hackMentions: 1,
                volatilityRank: 1
            }

            if (!result) {
                throw Error(`Cannot find token ${params.code}`)
            }

            return result
        },
        tokens: async (_, params) => {
            let result = mod.tokens.map((token) => {
                return {
                    code: token.data!.code,
                    name: token.data!.name,
                    type: 'Platform',
                    marketCap: token.data!.marketCap,
                    priceUsd: token.data!.priceUsd,
                    circulatingSupply: token.data!.circulatingSupply,
                    volume24h: token.data!.day.volume,
                    change24h: token.data!.day.max! / token.data!.day.end! - 1,
                    change7d: token.data!.week.max! / token.data!.week.end! - 1,
                    change1m: token.data!.month.max! / token.data!.month.end! - 1,
                    change3m: 4.00,
                    change6m: 6.00,
                    change1y: 100.00,
                    hackCount: 1,
                    hackMentions: 1,
                    volatilityRank: 1
                }
            })
            // let result = [
            //     {
            //         code: 'BTC',
            //         name: 'Bitcoin',
            //         type: 'Platform',
            //         marketCap: mod.tokens.filter(token => token.name === 'bitcoin')[0].data!.marketCap,
            //         priceUsd: 2700.50,
            //         circulatingSupply: 21000000,
            //         volume24h: 1000000,
            //         change24h: 2.50,
            //         change7d: 10.00,
            //         change1m: 2.00,
            //         change3m: 4.00,
            //         change6m: 6.00,
            //         change1y: 100.00
            //     },
            //     {
            //         code: 'ETH',
            //         name: 'Ethereum',
            //         type: 'App',
            //         marketCap: mod.tokens.filter(token => token.name === 'ethereum')[0].data!.marketCap,
            //         priceUsd: 300.50,
            //         circulatingSupply: 21000000,
            //         volume24h: 1000000,
            //         change24h: 2.50,
            //         change7d: 10.00,
            //         change1m: 2.00,
            //         change3m: 4.00,
            //         change6m: 6.00,
            //         change1y: 100.00
            //     }
            // ]

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
