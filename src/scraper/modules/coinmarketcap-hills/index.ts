import { BrowserWindow, ipcMain } from 'electron'
import * as querystring from 'querystring'
import fetch from 'node-fetch'

//const opn = require('opn')

const timeseries = require('timeseries-analysis')

type GraphDataPointItem = {
    start: number | null,
    end: number | null,
    min: number | null,
    max: number | null,
    mean: number | null,
    stdev: number | null,
    volume: number | null,
    chartUrl: string | null,
    points: Array<any>
}

type GraphDataPoints = {
    code: string,
    name: string,
    marketCap: number | null,
    priceUsd: number | null,
    circulatingSupply: number | null,
    day: GraphDataPointItem,
    week: GraphDataPointItem,
    month: GraphDataPointItem,
    year: GraphDataPointItem,
    all: GraphDataPointItem
}

export async function getGraphDataPoints(code: string) {
    const result: GraphDataPoints = {
        code: code,
        name: tokenLookup[code].name,
        marketCap: null,
        priceUsd: null,
        circulatingSupply: null,
        day: {
            start: null,
            end: null,
            min: null,
            max: null,
            mean: null,
            stdev: null,
            chartUrl: null,
            volume: null,
            points: []
        },
        week: {
            start: null,
            end: null,
            min: null,
            max: null,
            mean: null,
            stdev: null,
            chartUrl: null,
            volume: null,
            points: []
        },
        month: {
            start: null,
            end: null,
            min: null,
            max: null,
            mean: null,
            stdev: null,
            chartUrl: null,
            volume: null,
            points: []
        },
        year: {
            start: null,
            end: null,
            min: null,
            max: null,
            mean: null,
            stdev: null,
            chartUrl: null,
            volume: null,
            points: []
        },
        all: {
            start: null,
            end: null,
            min: null,
            max: null,
            mean: null,
            stdev: null,
            chartUrl: null,
            volume: null,
            points: []
        }
    }

    let data = await getRawGraphData(code)

    data = await data.json()
    data = data.market_cap_by_available_supply

    {
        const series = new timeseries.main(data)

        const res = series
            .smoother({
                period: 6
            })
            .ma({
                period: 6
            })

        result.all.min = res.min()
        result.all.max = res.max()
        result.all.mean = res.mean()
        result.all.stdev = res.stdev()
        result.all.chartUrl = res.chart()
        result.all.start = res.data[0][1]
        result.all.end = res.data[res.data.length - 1][1]

        result.marketCap = result.all.max
        result.priceUsd = data[data.length - 1][1]
    }

    {
        data = data.slice(365 * 4 * -1)
        const series = new timeseries.main(data)

        const res = series
            .smoother({
                period: 6
            })
            .ma({
                period: 6
            })

        result.year.min = res.min()
        result.year.max = res.max()
        result.year.mean = res.mean()
        result.year.stdev = res.stdev()
        result.year.chartUrl = res.chart()
        result.year.start = res.data[0][1]
        result.year.end = res.data[res.data.length - 1][1]
    }

    {
        const series = new timeseries.main(data.slice(31 * 4 * -1))

        const res = series
            .smoother({
                period: 3
            })
            .ma({
                period: 3
            })

        let lines: Array<any> = []
        let prevVal = res.data[0][1]
        let majorPeakVal = res.data[res.data.length - 1][1] * 0.05 // Peak at 5% diff
        let curStreak = 0

        const refinedData = res.data

        for (let i = 1; i < refinedData.length; i++) {
            let curVal = refinedData[i][1]

            // Check for a streak turn around
            if (curStreak == 0) {
                curStreak = curVal - prevVal
            } else if (curStreak > 0 && curVal - prevVal < 0) {
                if (curStreak > majorPeakVal) {
                    lines.push(prevVal)
                }

                curStreak = curVal - prevVal
            } else if (curStreak < 0 && curVal - prevVal > 0) {
                if (curStreak < majorPeakVal * -1) {
                    lines.push(prevVal)
                    // points.push({
                    //     color: 'ff0000',
                    //     point: i-1
                    // })
                }

                curStreak = curVal - prevVal
            } else {
                curStreak += curVal - prevVal
            }

            prevVal = curVal
        }

        result.month.min = res.min()
        result.month.max = res.max()
        result.month.mean = res.mean()
        result.month.stdev = res.stdev()
        result.month.chartUrl = res.chart({ lines })
        result.month.start = res.data[0][1]
        result.month.end = res.data[res.data.length - 1][1]
    }

    {
        const series = new timeseries.main(data.slice(7 * 4 * -1))

        const res = series
            .smoother({
                period: 3
            })
            .ma({
                period: 3
            })

        let points: Array<any> = []
        let lines: Array<any> = []
        let prevVal = res.data[0][1]
        let majorPeakVal = res.data[res.data.length-1][1] * 0.05 // Peak at 5% diff
        let curStreak = 0

        const refinedData = res.data

        for (let i = 1; i < refinedData.length; i++) {
            let curVal = refinedData[i][1]
            
            // Check for a streak turn around
            if (curStreak == 0) {
                curStreak = curVal - prevVal
            } else if (curStreak > 0 && curVal - prevVal < 0) {
                if (curStreak > majorPeakVal) {
                    lines.push(prevVal)

                    points.push({
                        type: 'downturn',
                        value: prevVal
                    })
                }

                curStreak = curVal - prevVal
            } else if (curStreak < 0 && curVal - prevVal > 0) {
                if (curStreak < majorPeakVal * -1) {
                    lines.push(prevVal)

                    points.push({
                        type: 'upturn',
                        value: prevVal
                    })
                }

                curStreak = curVal - prevVal
            } else {
                curStreak += curVal - prevVal
            }

            prevVal = curVal
        }
        
        result.week.min = res.min()
        result.week.max = res.max()
        result.week.mean = res.mean()
        result.week.stdev = res.stdev()
        result.week.chartUrl = res.chart({ lines })
        result.week.points = points
        result.week.start = res.data[0][1]
        result.week.end = res.data[res.data.length - 1][1]
    }

    {
        data = data.slice(1 * 4 * -1)
        const series = new timeseries.main(data)

        const res = series
            .smoother({
                period: 6
            })
            .ma({
                period: 6
            })

        result.day.min = res.min()
        result.day.max = res.max()
        result.day.mean = res.mean()
        result.day.stdev = res.stdev()
        result.day.chartUrl = res.chart()
        result.day.start = res.data[0][1]
        result.day.end = res.data[res.data.length - 1][1]
    }

        // .save('1')
        // .reset()
        // .smoother({
        //     period: 100
        // })
        // .ma({
        //     period: 12
        // })
        // .save('1')
        // .reset()
        // .dsp_itrend({
        //     alpha: 0.7
        // })
        // .save('1')
        // .reset()
        // .dsp_itrend({
        //     alpha: 0.2
        // })

    return result
}

const tokenLookup = {
    btc: {
        name: 'Bitcoin',
        code: 'btc',
        coinmarketcapName: 'bitcoin'
    },
    ltc: {
        name: 'Litecoin',
        code: 'ltc',
        coinmarketcapName: 'litecoin'
    },
    neo: {
        name: 'NEO',
        code: 'neo',
        coinmarketcapName: 'neo'
    },
    eth: {
        name: 'Ethereum',
        code: 'eth',
        coinmarketcapName: 'ethereum'
    }
}



export async function getRawGraphData(code: string, opts?: { convert?: string }): Promise<any> {
    const asset = tokenLookup[code].coinmarketcapName
    const query = querystring.stringify(opts)

    const res = await fetch(`https://graphs.coinmarketcap.com/currencies/${asset}/?${query}`, {
        method: 'GET',
        headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
        }
    }).catch((err) => console.log(err))

    return res
}

async function wait(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), milliseconds)
    })
}

type TokenItem = {
    code: string,
    data: GraphDataPoints | null
}


export class Module {
    tokens: Array<TokenItem> = [
        {
            code: 'neo',
            data: null
        },
        {
            code: 'btc',
            data: null
        },
        {
            code: 'ltc',
            data: null
        },
        {
            code: 'eth',
            data: null
        }
    ]

    async monitor() {
        console.log('Monitoring...')

        for (let token of this.tokens) {
            console.log('Monitoring ', token)

            token.data = await getGraphDataPoints(token.code)
            console.log(token.data.week.points)

            if (token.data.week.end! < token.data.week.max! * 0.9) {
                const possibleIncrease = token.data.week.max! / token.data.week.end! - 1
                console.log('Price is down more than 10% from all time high this week: ', possibleIncrease)
                console.log(token.data.week)
            }

            await wait(1000)
            //opn(graph.day.chartUrl)
            //opn(graph.month.chartUrl)
            //opn(graph.month.chartUrl)
            //opn(graph.year.chartUrl)
            //opn(graph.all.chartUrl)
        }
    }

    async run() {
        this.monitor()

        ipcMain.on('coinmarketcap-hills:invokeAction', (_, data) => {
            console.log(data)
            //event.sender.send('actionReply', result)
        })

        const options = { frame: false, height: 768, width: 1024, x: 0, y: 0, webPreferences: { nodeIntegration: false } } // preload: 'sad.js'

        const win = new BrowserWindow(options)

        // goto next step when webpage is loaded
        win.webContents.once('did-stop-loading', () => {
            // let code = `
            //     if (typeof module === 'object') {
            //         window.ELECTRON_module = module;
            //         module = undefined;
            //     }
            //     if (typeof require === 'object') {
            //         window.ELECTRON_require = require;
            //         require = undefined;
            //     }
            //     var ipc = window.ELECTRON_require('electron').ipcRenderer;
            //     ipc.send('coinmarketcap-hills:invokeAction', window.document.body.innerText);
            // `

            // win.webContents.executeJavaScript(code)
        })

        // open url
        // win.loadURL(`https://coinmarketcap.com/currencies/${token}/`, {
        //     userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
        // })
    }
}

export default async () => {
    const mod = new Module()
    mod.run()
}
