import { app, BrowserWindow } from 'electron';

let mainWindow = null;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 630
  });

  mainWindow.loadURL(winURL);

  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});