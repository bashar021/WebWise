 class Apis{
    constructor(){

    }
    fetchFromStorage(key){
        return new Promise((resolve)=>{
            chrome.storage.local.get(key, function (data){ resolve(data) })
        })
    }
    async saveToStorage(dataObject){
        chrome.storage.local.set(dataObject);
    }
    userActivityStatus(){
        return new Promise((resolve) => { 
            chrome.idle.queryState(15, (state) =>{ resolve(state) }); 
        })
    }
    windowMaximizeMinimize(){
        return new Promise((resolve) => { 
            chrome.windows.getCurrent((window) => { resolve(window.state) }) 
        })
    }
}
export default Apis