'use strict';

import { app, BrowserWindow, globalShortcut } from 'electron';

// Global reference to mainWindow
// Necessary to prevent win from being garbage collected
let mainWindow;

function createMainWindow() {
    // Construct new BrowserWindow
    const window = new BrowserWindow({
        title: 'Youtube Player',
        titleBarStyle: 'hidden'
    });

    window.loadURL(`file:///${__dirname}/../renderer/index.html`);

    window.webContents.openDevTools();

    window.on('closed', () => {
        mainWindow = null;
    });

    return window;
}

app.on('browser-window-created', (_e, window) =>  {
    window.setMenu(null);
    window.maximize();
});

app.on('ready', () => {
    globalShortcut.register('MediaPlayPause', () => {
        sendCommand('MediaPlayPause');
    });

    globalShortcut.register('MediaPreviousTrack', () => {
        sendCommand('MediaPreviousTrack');
    });

    globalShortcut.register('MediaNextTrack', () => {
        sendCommand('MediaNextTrack');
    });
});

// Quit application when all windows are closed
app.on('window-all-closed', () => {
    // On macOS it is common for applications to stay open
    // until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it is common to re-create a window
    // even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow();
    }
});

// Create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow();
});

function sendCommand(command: string) {
    mainWindow.webContents.send('control', command);
}

// Linux Media Key bindings
function registerBindings(desktopEnv, session) {
    session.getInterface(`org.${desktopEnv}.SettingsDaemon`,
    `/org/${desktopEnv}/SettingsDaemon/MediaKeys`,
    `org.${desktopEnv}.SettingsDaemon.MediaKeys`, (err, iface) => {
        if (!err) {
            iface.on('MediaPlayerKeyPressed', (_n, keyName) => {
                switch (keyName) {
                    case 'Next': sendCommand('MediaPlayPause'); return;
                    case 'Previous': sendCommand('MediaPreviousTrack'); return;
                    case 'Play': sendCommand('MediaNextTrack'); return;
                    default: return;
                }
            });
            iface.GrabMediaPlayerKeys(0, `org.${desktopEnv}.SettingsDaemon.MediaKeys`); // eslint-disable-line
        }
    });
}

try {
    const DBus = require('dbus');

    const dbus = new DBus();
    const session = dbus.getBus('session');

    registerBindings('gnome', session);
    registerBindings('mate', session);
} catch (e) {
    // do nothing.
}
