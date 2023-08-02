# WebWise : Smart tab extension for google chrome
## Intro
The NewTab Customizer Chrome Extension offers a personalized browsing experience by replacing the default Google tab. Key features include:

 1 - Background Customization: Choose random images from various categories for a fresh look on every new tab.

 2 - Daily Quotes: Get inspiring quotes daily or search for quotes from specific authors.

 3 - Theme & Font Colors: Switch between light and dark themes and customize font colors for readability.

 4 - Internet Speed Indicator: Real-time display of internet speed in KB/s or MB/s.

 5 - Chrome Activity Tracking: Monitor total Chrome usage time for productivity insights.

 6 - Automatic Wallpaper Change: Enjoy dynamic wallpapers with each tab open.

 7 - Website Shortcuts: Add shortcuts to frequently visited sites for easy access.

 8 - Customizable Tab Name: Replace 'Google' with a name of your choice.



## Chrome Api used 
1 - [chrome.storage](#chrome.storage)

2 - [chrome.idle](#chrome.idle)

3 - [chrome.runtime](#chrome.runtime)

3 - [chrome.history](#chrome.history)

4 - [Message passing](#Message-passing)

5 - [chrome.runtime.sendMessage](#chrome.runtime.sendMessage)

6 - [chrome.tabs](#chrome.tabs)

7 - [chrome.windows](#chrome.windows)

8 - [chrome.alarms](#section8)


## chrome.storage

The `chrome.storage.local.get()` is an API provided by Google Chrome for extensions to access the local storage. It allows you to retrieve data stored in the local storage of your Chrome extension.


- `chrome.storage.local`: This is the namespace for accessing the local storage of the Chrome extension. The local namespace is used for storing data that is specific to a particular device and is not synced across multiple devices.

- `get()`: This is a method within the chrome.storage.local namespace that is used to retrieve data from the local storage.

- `key`: The key parameter is used to specify the key or keys of the data that you want to retrieve from the local storage. It can be a single string or an array of strings if you want to retrieve multiple items at once.

- `function (data){ resolve(data) }`: This is a callback function that will be executed once the data is retrieved from the local storage. It takes a data parameter, which contains the retrieved data.




 ```javascript
 // Suppose you have stored a value with key "username" in the local storage
// and you want to retrieve it.

chrome.storage.local.get("username", function (data) {
  // The retrieved data will be available in the "data" parameter of the callback function.
  // You can access it using the key "username".
  console.log("Username: ", data.username);
});


// Suppose you want to save a username in the local storage.
// Use the chrome.storage.local.set() method to store the data.
chrome.storage.local.set({username:value}, function () {
  console.log("Data has been stored in the local storage.");
});


 ```
[Reference](https://developer.chrome.com/docs/extensions/reference/storage/)


## chrome.idle

The `chrome.idle.queryState()` method is an API provided by the Google Chrome browser extension platform. It allows you to query the current idle state of the user's device. The method takes two arguments: detectionIntervalInSeconds and a callback function.

Here's a breakdown of each parameter:

`detectionIntervalInSeconds`: This is the amount of time, in seconds, that Chrome will wait before querying the idle state. It defines the interval at which Chrome checks if the user's device is idle. In the example provided, it is set to 15 seconds, meaning Chrome will check the idle state every 15 seconds.

`callback`: This is a callback function that will be executed once the idle state is queried. It receives one argument, state, which represents the current idle state of the user's device.

The state argument can have the following values:

- `active`: Indicates that the user is actively using the device.

- `idle`: Indicates that the user's device is idle and has been inactive for a certain period (default is 5 minutes).

- `locked``: Indicates that the user's device is locked (applies to systems that support session locking).

```javascript
chrome.idle.queryState(15, (state) => {
  console.log("Current Idle State:", state);
});
```

[Reference](https://developer.chrome.com/docs/extensions/reference/idle/)


## chrome.runtime

The chrome.runtime.onInstalled event listener is part of the Chrome Extension API. It allows you to listen for when your extension has been installed, updated, or reloaded in the user's browser. Here's a detailed explanation of the event:

1 - ```chrome.runtime.onInstalled```: This is an event listener that triggers when the extension is installed, updated, or reloaded.

2 - ```addListener```: This method is used to add a function as a callback to the onInstalled event. The function will be executed when the event occurs.

3 - ```details```: The details parameter in the callback function provides information about the event that triggered the listener. It is an object containing the following properties:

reason: A string indicating the reason for the event. Possible values are:

- ```"install"```: The extension was installed.
  - ```"update"```: The extension was updated to a new version.
  - ```"chrome_update"```: The Chrome browser was updated.
  - ```"shared_module_update"```: A shared module used by the extension was updated.
- ```previousVersion```: A string representing the version of the extension before the update. This property is only present for "update" events.

- ```id```: The ID of the extension.
- ```temporary```: A boolean indicating if the extension is in temporary mode (e.g., loaded unpacked during development).
- ```incognito```: A boolean indicating if the extension is running in incognito mode.
- ```installType```: A string indicating the type of installation. Possible values are:
  - ```admin```: Installed by an administrator.
  - ```development```: Loaded as an unpacked extension during development.
  - ```normal```: Installed by a regular user.
  - ```sideload```: Sideloaded by a developer in developer mode.


```javascript

chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed or updated.');
  console.log('Reason:', details.reason);
  if (details.reason === 'update') {
    console.log('Previous version:', details.previousVersion);
  }
});

```
[Reference](https://developer.chrome.com/docs/extensions/reference/runtime/)


## chrome.history

The ```chrome.history.search``` method is part of the Chrome Extension API, and it allows you to retrieve a list of user's browsing history items that match a given query. Here's a detailed explanation of the method:

1 - ```chrome.history.search```: This is a method provided by the Chrome Extension API to search the user's browsing history.

2 - ```text```: The text parameter is an optional string that represents the query to filter the history items. When provided, the method will return history items whose URLs or titles contain this text. If an empty string is passed, it matches all history items.

3 - `maxResults`: The maxResults parameter is an optional integer that determines the maximum number of history items to return in the result array. It specifies the limit for the number of history items to be fetched. If not provided, it defaults to 100.

4 - `callback`: The callback function is called with the result of the history search. It receives an array of historyItems that match the search criteria.

 - historyItems: An array of objects, where each object represents a history item with the following properties:

   - `id`: A string representing the unique ID of the history item.
   - `url`: A string representing the URL of the visited page.
   - `title`: A string representing the title of the visited page.
   - `lastVisitTime`: A timestamp indicating the time when the page was last visited.
   - `visitCount`: An integer representing the total number of times the page was visited.
   - `typedCount`: An integer representing the number of times the user typed the URL directly.
   - `typedCount`: An integer representing the number of times the user typed the URL directly.


```javascript

chrome.history.search({ text: 'example', maxResults: 10 }, function (historyItems) {
  // Process the list of historyItems returned by the search.
  historyItems.forEach((item) => {
    console.log('URL:', item.url);
    console.log('Title:', item.title);
    console.log('Last Visit Time:', item.lastVisitTime);
  });
});

```
[Reference](https://developer.chrome.com/docs/extensions/reference/history/)



## Message passing


The `chrome.runtime.onMessage` is an event listener provided by the Chrome Extension API. It allows your extension to listen for messages sent from other parts of the extension, such as content scripts or other extension components. Here's a detailed explanation of this event listener:

1 - `chrome.runtime.onMessage`: This is an event listener that is used to receive messages sent from other parts of the extension.

2 - `addListener`: The addListener method is used to register a callback function that will be executed when a message is received.

3 - `function (message, sender, sendResponse)`: This is the callback function that will be executed when a message is received. It takes three parameters:

   - `message`: The message parameter contains the data sent along with the message. It can be any valid JSON-serializable data, such as objects or primitive types.
   - `sender`: The sender parameter contains information about the sender of the message, such as the sender's ID and the tab in which the sender executed.
   - `sendResponse`: The sendResponse parameter is a function that can be used to send a response back to the sender. It is optional to use and can be invoked with the response data.


```javascript
// Background script (or any script listening for messages)
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Log the received message data
  console.log('Received message:', message);

  // Send a response back to the sender
  sendResponse({ response: 'Message received successfully!' });
});

```
[Reference](https://developer.chrome.com/docs/extensions/mv3/messaging/)



## chrome.runtime.sendMessage

The `chrome.runtime.sendMessage` is a method provided by the Chrome Extension API. It allows your extension to send messages from one component (such as a content script or a popup) to another component (such as a background script or another content script). Here's a detailed explanation of this method:

1 - `chrome.runtime.sendMessage`: This method is used to send a message from one part of the extension to another.

2 - `{ action: action, query: query }`: The first parameter of sendMessage is the message itself, represented as an object. In this example, the message object contains two properties:

   - `action`: This property holds information about the action to be performed or the purpose of the message. It can be any string or value that represents the action being taken.
   - `query`: This property contains additional data or parameters related to the action. It can be any JSON-serializable data, such as objects or primitive types.

3 - `function (response) { ... }`: The second parameter of sendMessage is a callback function that will be executed when a response is received from the recipient of the message. It takes one parameter:

   - response: The response parameter contains the response data sent back by the receiving component. It can be any JSON-serializable data, such as objects or primitive types.


```javascript
// Content script or popup (sender)
const action = 'performSearch';
const query = 'example query';

chrome.runtime.sendMessage({ action: action, query: query }, function (response) {
  // Log the response received from the recipient
  console.log('Received response:', response);
});

```
[Reference](https://developer.chrome.com/docs/extensions/reference/runtime/)


## chrome.tabs

The `chrome.tabs.query` method is an API provided by Chrome extensions to query information about tabs in the current browser window. Here's a detailed explanation of this method:

1 - `chrome.tabs.query` This is the method used to query information about tabs. It takes two parameters:

   - `queryInfo`: An object that specifies the criteria for filtering the tabs.
   - `function (tabs) { ... }`: This is the callback function that will be called once the query is completed. It takes one parameter:
     - `tabs`: The tabs parameter contains an array of tab objects that match the specified query criteria.

2 - `queryInfo`: This is an object used to specify the criteria for filtering tabs. In the example provided, the queryInfo object is { active: true }, which means we want to find the currently active tab in the current window.

3 - `function (tabs) { ... }`: This is the callback function that will be executed once the query is completed. The tabs parameter inside the callback contains an array of tab objects that match the query criteria. The callback function allows you to access and work with the information of the matched tabs.


```javascript
// Query information about the currently active tab
chrome.tabs.query({ active: true }, function (tabs) {
  // Handle the queried tabs
  console.log('Active tab:', tabs[0]);
});

```

```javascript
function getActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true }, function (tabs) {
      resolve(tabs[0]);
    });
  });
}

// Usage with async/await
async function main() {
  const activeTab = await getActiveTab();
  console.log('Active tab:', activeTab);
}

main();

```

[Reference](https://developer.chrome.com/docs/extensions/reference/tabs/)


## chrome.windows

The `chrome.windows.getCurrent` method is an API provided by Chrome extensions to retrieve information about the current window. Here's a detailed explanation of this method:

1 - `chrome.windows.getCurrent`: This is the method used to get information about the currently focused Chrome window. It takes one parameter:

  - `function (window) { ... }`: This is the callback function that will be called once the information is retrieved. It takes one parameter:
    - `window`: The window parameter contains an object representing the current Chrome window.

2 - `function (window) { ... }`: This is the callback function that will be executed once the information is retrieved. The window parameter inside the callback contains an object representing the current Chrome window.

3 - `resolve(window.state)`: In the example provided, the resolve function is used to pass the state property of the window object to the caller of this function. The state property represents the state of the window, which can have one of the following values:
- `normal`: The window is a normal window, meaning it is in its default state.
- `minimized`: The window is minimized and shown on the taskbar or dock.
- `maximized`: The window is maximized to fill the entire screen.
- `fullscreen`: The window is in full-screen mode, hiding the browser UI.

```javascript
// Get information about the current window
chrome.windows.getCurrent(function (window) {
  // Handle the window information
  console.log('Window state:', window.state);
});

```
[Reference](https://developer.chrome.com/docs/extensions/reference/windows/)



## chrome.alarms <a name="section8"></a>

The `chrome.alarms.create` method is a Chrome Extension API used to create an alarm. Alarms allow extensions to schedule code to be executed at specified intervals. Here's a detailed explanation of the parameters used in the chrome.alarms.create method:


1 - `updateStats`: This is the name of the alarm. Each alarm must have a unique name, which allows you to manage and interact with the alarm later, such as updating or clearing it.

2 - `{ delayInMinutes: 0, periodInMinutes: 1 / 60 }`: This is the second parameter of the chrome.alarms.create method and an object that specifies the delay and period for the alarm.

- `delayInMinutes`: This is the delay before the first time the alarm will be triggered. In this example, it is set to 0, meaning the alarm will fire immediately once it is created.
- `periodInMinutes`: This is the interval between consecutive firing of the alarm. In this example, it is set to 1 / 60, which means the alarm will fire every 1 minute (since there are 60 seconds in a minute). The value 1 / 60 is used to represent one minute in the unit of minutes.

```javascript
chrome.alarms.create('updateStats', {
  delayInMinutes: 0,
  periodInMinutes: 1 / 60
});



// Event listener for alarm triggers
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'updateStats') {
    // Execute the code when 'updateStats' alarm fires
  }
});

```

[Reference](https://developer.chrome.com/docs/extensions/reference/alarms/)



