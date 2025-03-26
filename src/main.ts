import DiscordRich from './discord'

DiscordRich()
function Windows() {
	const { app, BrowserWindow, Menu, Tray } = require('electron')
	const path = require('path')

	function createWindow() {
		const mainWindow = new BrowserWindow({
			width: 460,
			height: 180,
			resizable: false,
			icon: './electron-icon.png',
			webPreferences: {
				preload: path.join(__dirname, 'preload.js'),
				nodeIntegrationInWorker: true,
				devTools: false,
			},
		})
		mainWindow.setMenuBarVisibility(false)

		if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
			mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
		} else {
			mainWindow.loadFile(
				path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
			)
		}

		mainWindow.webContents.openDevTools()

		mainWindow.on('close', (ev: { preventDefault: () => void }) => {
			if (mainWindow?.isVisible()) {
				ev.preventDefault()
				mainWindow.hide()
			}
		})
	}

	function createTray() {
		const contextMenu = Menu.buildFromTemplate([
			{ type: 'separator' },
			{
				label: 'Quit',
				accelerator: 'CmdOrCtrl+Q',
				click: () => {
					BrowserWindow.getAllWindows().forEach((w: { destroy: () => any }) =>
						w.destroy()
					)
					app.quit()
				},
			},
		])

		const tray = new Tray('electron-icon.png')
		tray.setToolTip('Shortcutter')
		tray.setContextMenu(contextMenu)
		tray.on('click', () => {
			BrowserWindow.getAllWindows().shift().show()
		})
	}

	app.whenReady().then(() => {
		createWindow()
		createTray()
	})

	app.on('activate', () => {
		const window = BrowserWindow.getAllWindows().shift()
		if (window) {
			window.show()
		} else {
			createWindow()
		}
	})
}

Windows()
