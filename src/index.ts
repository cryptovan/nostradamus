// import { tickerByAsset } from './scraper'

// const run = async () => {
//     const res = await tickerByAsset('bitcoin')
//     console.log(res)
// }

// run()


import { app, BrowserWindow } from 'electron'

var ipc = require('electron').ipcMain

ipc.on('invokeAction', function(_, data){
    console.log(data)
    //event.sender.send('actionReply', result)
});

// require('electron').remote.getGlobal('console')
app.on('ready', () => {
    const options = { frame: false, height: 768, width: 1024, x: 0, y: 0 }
    const win = new BrowserWindow(options)

    // goto next step when webpage is loaded
    win.webContents.once('did-stop-loading', () => {
        let code = `
            var ipc = require('electron').ipcRenderer;
            ipc.send('invokeAction', window.document.body.innerText);
        `

        win.webContents.executeJavaScript(code)

        win.capturePage(options, (data) => {
            // screenshot
            require('fs').writeFileSync(
                './tmp/screenshot.testExampleJs.browser.png',
                data.toPNG()
            )
        })
    })

    // open url
    win.loadURL('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
})