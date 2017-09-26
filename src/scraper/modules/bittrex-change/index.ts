import { BrowserWindow, ipcMain, app } from 'electron'

export class Module {
    run() {
        ipcMain.on('bittrex-change:invokeAction', (_, data) => {
            console.log(data)
            //event.sender.send('actionReply', result)
        })

        app.commandLine.appendSwitch('disable-web-security')

        const win = new BrowserWindow({
            titleBarStyle: 'hidden',
            frame: false,
            width: 1024,
            height: 768,
            x: 0,
            y: 0,
            backgroundColor: '#000',
            webPreferences: {
                nodeIntegration: false,
                webSecurity: false
            }
            // "node-integration": "iframe", // and this line
            // "web-preferences": {
            //     "web-security": false
            // }
        })

        const onHeadersReceived = (d, c) => {
            if (d.responseHeaders['x-frame-options']) {
                delete d.responseHeaders['x-frame-options']
            }

            c({ cancel: false, responseHeaders: d.responseHeaders })
        }

        win.webContents.session.webRequest.onHeadersReceived({ urls: [] }, onHeadersReceived)

        //let numDoneInBackground = 0

        // // When work makes progress, show the progress bar
        // function onProgress(progess) {
        //     // Use values 0 to 1, or -1 to hide the progress bar
        //     win.setProgressBar(progress || -1) // Progress bar works on all platforms
        // }

        // // When work completes while the app is in the background, show a badge
        // var numDoneInBackground = 0
        // function onDone() {
        //     var dock = electron.app.dock // Badge works only on Mac
        //     if (!dock || win.isFocused()) return
        //     numDoneInBackground++
        //     dock.setBadge('' + numDoneInBackground)
        // }

        // Subscribe to the window focus event. When that happens, hide the badge
        // function onFocus() {
        //     var dock = electron.app.dock // Badge works only on Mac
        //     numDoneInBackground = 0
        //     dock.setBadge('')
        // }

        // win.on('focus', onFocus)

        // win.webContentsframeElement.setAttribute('name', 'browser-page-disable-x-frame-options')
        // this.frameElement.setAttribute('sandbox', 'allow-scripts allow-same-origin')
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
        win.loadURL('http://localhost:3000/')
        //win.openDevTools()
    }
}

export default async () => {
    const mod = new Module()
    mod.run()
}
