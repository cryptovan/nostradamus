import * as querystring from 'querystring'
import fetch from 'node-fetch'

import { app } from 'electron'
// import bittrexChange from './modules/bittrex-change'
// import coinmarketcapTicker from './modules/coinmarketcap-ticker'
// import coinmarketcapChange from './modules/coinmarketcap-change'
import coinmarketcapHills from './modules/coinmarketcap-hills'

/* global fetch */

export async function ticker(opts?: { limit?: number, convert?: string }): Promise<any> {
    const query = querystring.stringify(opts)
    const res = await fetch(`https://api.coinmarketcap.com/v1/ticker/?${query}`)
    return res.json()
}

export async function tickerByAsset(asset: string, opts?: { convert?: string }): Promise<any> {
    const query = querystring.stringify(opts)
    const res = await fetch(`https://api.coinmarketcap.com/v1/ticker/${asset}/?${query}`, {
        method: 'GET',
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
        }
    }).catch((err) => { console.log(err); })

    return res.json()
}

export async function globalMarket(opts?: { convert?: string }): Promise<Object> {
    const query = querystring.stringify(opts)
    const res = await fetch(`https://api.coinmarketcap.com/v1/global/?${query}`)
    return res.json()
}

// import { tickerByAsset } from './scraper'

// const run = async () => {
//     const res = await tickerByAsset('bitcoin')
//     console.log(res)
// }

// run()



const modules = [
    // bittrexChange,
    // coinmarketcapTicker,
    // coinmarketcapChange,
    coinmarketcapHills
]

// require('electron').remote.getGlobal('console')
app.on('ready', () => {
    for (let mod of modules) {
        mod()
    }
})

//setInterval(() => console.log('Tick'), 5000)