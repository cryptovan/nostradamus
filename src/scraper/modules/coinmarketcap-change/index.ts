import { BrowserWindow, ipcMain } from 'electron'

export default {
    run: () => {
        ipcMain.on('coinmarketcap-change:invokeAction', (_, data) => {
            console.log(data)
            //event.sender.send('actionReply', result)
        })

        const options = { frame: false, height: 768, width: 1024, x: 0, y: 0 }
        const win = new BrowserWindow(options)

        // goto next step when webpage is loaded
        win.webContents.once('did-stop-loading', () => {
            let code = `
                var ipc = require('electron').ipcRenderer;
                ipc.send('invokeAction', window.document.body.innerText);
            `

            win.webContents.executeJavaScript(code)
        })

        // open url
        win.loadURL('https://coinmarketcap.com/')
    }
}