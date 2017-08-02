import { BrowserWindow, ipcMain } from 'electron'

export default {
    run: () => {
        ipcMain.on('coinmarketcap-ticker:invokeAction', (_, data) => {
            console.log(data)
            //event.sender.send('actionReply', result)
        })

        const options = { frame: false, height: 768, width: 1024, x: 0, y: 0 }
        const win = new BrowserWindow(options)

        // goto next step when webpage is loaded
        win.webContents.once('did-stop-loading', () => {
            let code = `
                var ipc = require('electron').ipcRenderer;
                ipc.send('coinmarketcap-ticker:invokeAction', window.document.body.innerText);
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
    }
}