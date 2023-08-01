class BackgroundConnection{
    constructor(){}
    sendMessage(action,query){
        return new Promise((resolve)=>{
            chrome.runtime.sendMessage({ action: action, query: query }, function (response) {
                resolve(response)
            })
        })
    }
    receiveMessage(action){
        chrome.runtime.onMessage.addListener(function (message) {
            if(message.action === action) return message 
        })
    }
}
export default BackgroundConnection