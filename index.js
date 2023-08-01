import GoogleSearchInput from './scripts/googleSearchInput.js';
import { InternetSpeed, UserActiveTime, ChromeActiveTime } from './scripts/stats.js';
import Apis from './scripts/Apis.js';
import GoogleShortcuts from './scripts/GoogleShortcuts.js'
import WebsiteShortcuts from './scripts/WebsiteShortcuts.js';
import Setting from './scripts/Setting.js';
import Theme from './scripts/Theme.js';



const searchInput = document.getElementById('search-input');
const suggestionsDiv = document.getElementById('suggestions');
const setInternetSpeed = document.getElementById('internetSpeed');
const setCustomName = document.getElementById('setCustomName');
const quoteAuthor = document.getElementById('quoteAuthor');
const quote = document.getElementById('quote');
const SetUserActiveTime = document.getElementById('userActiveFor');
const setChromeActiveTime = document.getElementById('chromeActiveFor')
var menubar = document.getElementById('menuBar');
var openGmail = document.getElementById('openGmail');
var openPhotos = document.getElementById('openPhotos')
var navigationButton = document.getElementById('navigationButton');
const popUpContainer = document.getElementById('shortCutPopupCont');
const popup = document.getElementById('popUp');
const popupSave = document.getElementById('save-button');
const mainBodyCont = document.getElementById('mainBodyCont');
var openGmail = document.getElementById('openGmail');
var openPhotos = document.getElementById('openPhotos')
const radioButtons = document.getElementsByName("color");


const googleSearchInput = new GoogleSearchInput(searchInput, suggestionsDiv);
const internetSpeed = new InternetSpeed(setInternetSpeed);
const userActiveTime = new UserActiveTime(SetUserActiveTime);
const chromeActiveTime = new ChromeActiveTime(setChromeActiveTime);
const apis = new Apis();
const googleShortcuts = new GoogleShortcuts(menubar, openGmail, openPhotos, navigationButton, openGmail, openPhotos);
const websiteShortcuts = new WebsiteShortcuts();
const setting = new Setting(mainBodyCont);
const theme = new Theme();
theme.setTheme();

async function handleRadioButtonChange(event) {
    await apis.saveToStorage({ 'color': event.target.value })
    setColor();
}
for (const radioButton of radioButtons) {
    radioButton.addEventListener("change", handleRadioButtonChange);
}
async function setColor() {
    const color = await apis.fetchFromStorage('color');
    const buttonElement = document.querySelectorAll(".navbtn");
    const inputElement = document.querySelectorAll("input");
    const menubarBtn = document.getElementsByClassName('menubarBtn')
    if (color.color) {
        document.body.style.color = `${color.color}`;
       for(let i  = 0 ; i< buttonElement.length;i++){
        buttonElement[i].style.color = `${color.color}`
       }
       for(let  i = 0 ; i<inputElement.length;i++){
        inputElement[i].style.color = `${color.color}`
       }
        for (let i = 0; i < menubarBtn.length; i++) {
            const btn = menubarBtn[i];
            btn.style.backgroundColor = `${color.color}`;
          }
    } else {
        document.body.color = `white`
        for(let i  = 0 ; i< buttonElement.length;i++){
            buttonElement[i].style.color = `white`
           }
           for(let  i = 0 ; i<inputElement.length;i++){
            inputElement[i].style.color = `white`
           }
        for (let i = 0; i < menubarBtn.length; i++) {
            const btn = menubarBtn[i];
            btn.style.backgroundColor = "white";
          }
    }
}
setColor();

async function setName() {
    const customName = await apis.fetchFromStorage('customName');
    if (customName.customName) {
        setCustomName.textContent = customName.customName;
    } else {
        setCustomName.textContent = 'Google';
    }
}

// add new website shortcut 
document.getElementById('add-button').addEventListener('click', function (event) {
    popUpContainer.style.display = 'flex';

});
document.getElementById('save-button').addEventListener('click', function (event) {
    websiteShortcuts.savePopUpDetails(popUpContainer);
});
popUpContainer.addEventListener('click', function (event) {
    // Check if clicked outside the popup
    if (!popupSave.contains(event.target) && !popup.contains(event.target)) {
        document.getElementById('website-name').value = '';
        document.getElementById('website-url').value = '';
        shortCutPopupCont.style.display = "none";
    }
});


internetSpeed.convertSpeed();
userActiveTime.getUserActiveTime();
chromeActiveTime.getChromeActiveTime();
googleShortcuts.googleShortcutsEvent();
websiteShortcuts.retrieveWebsiteShortCutsDetail();
setting.openSettingPopUP();



function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function compareStringDate(dateStr1, dateStr2) {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    const year1 = date1.getFullYear();
    const month1 = date1.getMonth();
    const day1 = date1.getDate();
    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();

    if (year1 === year2 && month1 === month2 && day1 === day2) {
        return true;
    } else {
        return false;
    }
}
// function to check the previous day date if find then set the all data to the zero 
async function toCheckPrevDay() {
    let todayDate = getCurrentDate();
    var prevDate = await apis.fetchFromStorage('todayDate');
    if (prevDate.todayDate && !compareStringDate(todayDate, prevDate.todayDate)) {
        console.log(' welcome to new day', prevDate.todayDate)
        await setting.saveFreshQuote();
        setting.setQuotes();
        apis.saveToStorage({ 'todayDate': todayDate })
        apis.saveToStorage({ 'WindowTotalActiveTime': 0 })
        apis.saveToStorage({ 'UserActiveTime': 0 })
    } else if (!prevDate.todayDate) {
        console.log('welcome setup has done ', todayDate)
        await setting.saveFreshQuote();
        setting.setQuotes();
        chrome.storage.local.set({ 'todayDate': todayDate });
    } else {
        console.log('old day', todayDate)
        setting.setQuotes();
        chrome.storage.local.set({ 'todayDate': todayDate });
    }
}

setName();
toCheckPrevDay();

setInterval(() => {
    internetSpeed.convertSpeed();
}, 30000);

setInterval(() => {
    console.log('active')
    userActiveTime.getUserActiveTime();
    chromeActiveTime.getChromeActiveTime();
}, 60000);
