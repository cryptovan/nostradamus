import { BrowserWindow, ipcMain, app } from 'electron'

export class Module {
    run() {
        ipcMain.on('bittrex-change:invokeAction', (_, data) => {
            console.log(data)
            //event.sender.send('actionReply', result)
        })

        app.commandLine.appendSwitch('disable-web-security')

        const win = new BrowserWindow({
            frame: false,
            height: 768,
            width: 1024,
            x: 0,
            y: 0,
            // "node-integration": "iframe", // and this line
            // "web-preferences": {
            //     "web-security": false
            // }
        })
        var onHeadersReceived = (d, c) => {
            if (d.responseHeaders['X-Frame-Options']) {
                delete d.responseHeaders['X-Frame-Options'];
            }
            c({ cancel: false, responseHeaders: d.responseHeaders });
        }
        win.webContents.session.webRequest.onHeadersReceived({urls: []}, onHeadersReceived);

        // this.frameElement.setAttribute('name', 'browser-page-disable-x-frame-options');
        // this.frameElement.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        // goto next step when webpage is loaded
        // win.webContents.once('paint', () => {
        //     let code = `
        //     alert(jQuery)
        //     alert($)
        //     alert($$)
        //         if (typeof window.module === 'object') {
        //             window.ELECTRON_module = window.module
        //             window.module = undefined
        //         }

        //         if (typeof window.require === 'function') {
        //             window.ELECTRON_require = window.require
        //             window.require = undefined
        //         }

        //         const ipc = window.ELECTRON_require('electron').ipcRenderer

        //         setTimeout(() => {
        //             const result = {
        //                 tokens: []
        //             }

        //             $$('[data-bind="foreach: visibleSummaries"] tr').map((rowItem) => {
        //                 const name = rowItem.querySelectorAll(':scope > td.name')
        //                 const symbol = rowItem.querySelectorAll('[data-bind="text: baseVolume().toFixed(3)"]')

        //                 return {
        //                     name,
        //                     symbol
        //                 }
        //             })

        //             ipc.send('bittrex-change:invokeAction', JSON.stringify(result))
        //         }, 4000)
        //     `

        //     win.webContents.executeJavaScript(code)
        // })

        // open url
        win.loadURL('http://localhost:3000/trends')
        //win.openDevTools()
    }
}

export default async () => {
    const mod = new Module()
    mod.run()
}
