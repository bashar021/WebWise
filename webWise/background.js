
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // console.log('Extension installed! Performing one-time setup...');
        chrome.alarms.create('updateStats', {
            delayInMinutes: 0,
            periodInMinutes: 1 / 60
        });
    }
});

const previousSearches = [];
// Get the previous searches from the browser's history
chrome.history.search({ text: '', maxResults: 100 }, function (historyItems) {
    historyItems.forEach((historyItem) => {
        // Check if the URL contains the search engine's query parameter (e.g., q for Google)
        if (historyItem.url.includes('q=')) {
            const searchQuery = new URL(historyItem.url).searchParams.get('q');
            if (searchQuery && !previousSearches.includes(searchQuery)) {
                previousSearches.push(searchQuery);
            }
        }
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const searchQuery = message.query;
    if (message.action === 'suggestions') {
        const suggestions = previousSearches.filter((query) => query.includes(searchQuery));
        sendResponse({ response: suggestions })
    }
});

// // Function to check user activity status on system
function checkUserActivityStatus() {
    return new Promise((resolve) => { chrome.idle.queryState(15, (state) => { resolve(state) }); })
}

function fetchFromStorage(key) {
    return new Promise((resolve) => { chrome.storage.local.get(key, function (data) { resolve(data) }) })
}
function saveToStorage(dataObject) {
    chrome.storage.local.set(dataObject);
}

function returnActiveWindows() {
    return new Promise((resolve) => { chrome.tabs.query({ active: true }, (tabs) => { resolve(tabs) }); })
}
function windowMaximizedMinimized() {
    return new Promise((resolve) => { chrome.windows.getCurrent((window) => { resolve(window.state) }) })
}
// Function to display a message when the Chrome window is closed
async function calculateWindowActiveTotalTime() {
    const userActivity = await checkUserActivityStatus();
    var tabs = await returnActiveWindows();
    if (userActivity != 'locked' && tabs.length > 0) {
        var storedWindowTotalTime = await fetchFromStorage('WindowTotalActiveTime');
        storedWindowTotalTime.WindowTotalActiveTime ? saveToStorage({ 'WindowTotalActiveTime': storedWindowTotalTime.WindowTotalActiveTime + 1 }) : saveToStorage({ 'WindowTotalActiveTime': 1 });
    }
}
async function checkChromeWindowStatus() {
    var userActivityStatus = await checkUserActivityStatus();
    var window = await windowMaximizedMinimized();
    if (userActivityStatus === 'active' && window === 'maximized') {
        var userActiveTime = await fetchFromStorage('UserActiveTime');
        userActiveTime.UserActiveTime ? saveToStorage({ 'UserActiveTime': userActiveTime.UserActiveTime + 1 }) : saveToStorage({ 'UserActiveTime': 1 })
    }
}
chrome.alarms.onAlarm.addListener((alarm) => {
    if(alarm.name === 'updateStats'){
        calculateWindowActiveTotalTime();
        checkChromeWindowStatus();
    }
});
