const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    // 创建浏览器窗口
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // 确保 preload.js 文件存在
            nodeIntegration: true
        }
    });

    // 加载index.html
    mainWindow.loadFile('index.html');

    // 禁用默认菜单栏
    Menu.setApplicationMenu(null);
}

// 当 Electron 初始化完成并准备好创建浏览器窗口时调用此函数
app.whenReady().then(() => {
    createWindow();

    // macOS 上，当所有窗口关闭时，点击应用图标重新创建窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// 如果窗口全部关闭，除 macOS 外退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});