import Apis from "./Apis.js";
var apis = new Apis();
export class InternetSpeed {
    startTime = 0;
    endTime = 0;
    imageSize = "";
    image = new Image();
    imageLink = "https://source.unsplash.com/random?topics=nature";
    constructor(setInternetSpeed) {
        this.setInternetSpeed = setInternetSpeed
    }
    calculateSpeed() {
        let timeDuration = (this.endTime - this.startTime) / 1000;
        let loadedBits = this.imageSize * 8;
        let speedInBps = (loadedBits / timeDuration).toFixed(2);
        let speedInKbps = (speedInBps / 1024).toFixed(2);
        let speedInMbps = (speedInKbps / 1024).toFixed(2);
        if (speedInKbps > 1024) {
            this.setInternetSpeed.innerText = `${speedInMbps} MB/S`;
        } else {
            this.setInternetSpeed.innerText = `${speedInKbps} KB/S`;
        }
    }
    init() {
        this.startTime = new Date().getTime();
        this.image.src = this.imageLink;
    };
    convertSpeed() {
        fetch(this.imageLink, { method: 'HEAD' })
            .then((response) => {
                this.imageSize = response.headers.get("content-length");
                this.init();
            })
        this.image.onload = () => {
            this.endTime = new Date().getTime();
            this.calculateSpeed();
        };
    }
}
export class UserActiveTime {
    constructor(setUserActiveTime) {
        this.setUserActiveTime = setUserActiveTime;
    }
    async getUserActiveTime() {
        var userActiveTime = await apis.fetchFromStorage('UserActiveTime');
        if (userActiveTime.UserActiveTime) {
            const time = userActiveTime.UserActiveTime / 60;
            time >= 60 ? this.setUserActiveTime.textContent = `${(time / 60).toFixed(1)} H` : this.setUserActiveTime.textContent = `${Math.floor(time)} M`
        }
    }
}
export class ChromeActiveTime{
    constructor(setChromeActiveTime){
        this.setChromeActiveTime = setChromeActiveTime;
    }
    async getChromeActiveTime(){
        var chromeActiveTimeIs  = await apis.fetchFromStorage('WindowTotalActiveTime');
        if (chromeActiveTimeIs.WindowTotalActiveTime) {
            const time = chromeActiveTimeIs.WindowTotalActiveTime / 60;
            time >= 60 ? this.setChromeActiveTime.textContent = `${(time / 60).toFixed(1)} H` : this.setChromeActiveTime.textContent = `${Math.floor(time)} M`
          }
    }
}
