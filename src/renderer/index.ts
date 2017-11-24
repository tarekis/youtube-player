import { ipcRenderer } from 'electron';
import * as ElectronNavigation from 'electron-navigation';

document.write(" <div id='nav-body-ctrls'></div><div id='nav-body-views'"
+"> <div id='loader'> <div class='showbox'> <div class='loader'> <svg cl"
+"ass='circular' viewBox='25 25 50 50'> <circle class='path' cx='50' cy="
+"'50' r='20' fill='none' stroke-width='2' stroke-miterlimit='10'/> </sv"
+"g> </div></div></div></div><style>html,body{width: 100%; height: 100%;"
+" margin: 0; display: flex; flex-direction: column;}#nav-body-ctrls{bac"
+"kground-color: white; padding: 10px 20px 5px; font-family: arial;}#nav"
+"-body-views{flex: 1;}.nav-icons{fill: rgba(17, 17, 17, 0.4)!important;"
+" border-radius: 3px; transition: background-color 0.25s ease-in;}.nav-"
+"icons:hover{background: rgba(17, 17, 17, 0.1)!important;}#nav-ctrls-ba"
+"ck,#nav-ctrls-forward,#nav-ctrls-reload{height: 30px; width: 30px; mar"
+"gin-right: 10px;}#nav-ctrls-url{display: none;}#nav-body-views > *{dis"
+"play: none!important;}#nav-body-views > *:last-child{display: flex!imp"
+"ortant;}#loader{width: 100%; height: 100%; flex: 1;}.circular{top: 0; "
+"bottom: 0; left: 0; right: 0}.loading-title{text-align: center; margin"
+"-bottom: 25px; font-family: Roboto, 'Helvetica Neue', sans-serif}.show"
+"box{margin: auto;}.loader{position: relative; margin: 0 auto; width: 1"
+"00px}.loader:before{content: ''; display: block; padding-top: 100%}.ci"
+"rcular{animation: rotate 2s linear infinite; height: 100%; transform-o"
+"rigin: center center; width: 100%; position: absolute; margin: auto}.p"
+"ath{stroke-dasharray: 1, 200; stroke-dashoffset: 0; animation: dash 1."
+"5s ease-in-out infinite; stroke: #FF0000; stroke-linecap: round}@keyfr"
+"ames rotate{100%{transform: rotate(360deg)}}@keyframes dash{0%{stroke-"
+"dasharray: 1, 200; stroke-dashoffset: 0}50%{stroke-dasharray: 89, 200;"
+" stroke-dashoffset: -35px}100%{stroke-dasharray: 89, 200; stroke-dasho"
+"ffset: -124px}}</style>");

const enav = new ElectronNavigation();
const webview = enav.newTab('https://youtube.com/');

ipcRenderer.on('control', (event, control) => {
    switch (control) {
        case 'MediaPlayPause':
            webview.executeJavaScript(`
                document.querySelector('.ytp-play-button').click();
            `);
            break;
        case 'MediaPreviousTrack':
            webview.executeJavaScript(`
                document.querySelector('.ytp-prev-button').click();
            `);
            break;
        case 'MediaNextTrack':
            webview.executeJavaScript(`
                document.querySelector('.ytp-next-button').click();
            `);
            break;
    }
});