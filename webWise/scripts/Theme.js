import Apis from "./Apis.js";
const apis = new Apis();
class Theme {
    mainBodyCont = document.getElementById('mainBodyCont');
    constructor() {
        // this.setTheme();
    }
    darkTheme() {
        this.mainBodyCont.style.backgroundColor = 'black';
        // document.body.style.backgroundColor = 'black';

    }
    lightTheme() {
        this.mainBodyCont.style.backgroundColor = 'white';
        // document.body.style.backgroundColor = 'white';

    }

    // save default theme 
    async setTheme() {
        const DarkTheme =  await apis.fetchFromStorage('themeToggle');
        if(DarkTheme.themeToggle === 'ON'){
            this.darkTheme();
        }else{
            this.lightTheme();
        }
    }
}
export default Theme