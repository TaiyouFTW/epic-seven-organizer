const { app, BrowserWindow } = require('electron')

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        minWidth: 425,
        width: 1280,
        height: 720,
        icon: `${__dirname}/dist/epic_seven_organizer/favicon.ico`,
        webPreferences: {
            nodeIntegration: true,
        },
        autoHideMenuBar: true
    })


    win.loadURL(`file://${__dirname}/dist/epic_seven_organizer/index.html`)

    //// uncomment below to open the DevTools.
    // win.webContents.openDevTools()

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})