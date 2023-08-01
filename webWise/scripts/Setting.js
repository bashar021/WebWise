import Apis from "./Apis.js";
const apis = new Apis();
import Theme from "./Theme.js";
const theme  = new Theme();
class Setting {
    themeToggle = document.getElementById('theme-toggle');
    wallpaperToggle = document.getElementById('wallpaper-toggle');
    quotesToggle = document.getElementById('quotes-toggle');
    customName = document.getElementById('custom-name');
    WallpaperKeywords = document.getElementById('WallpaperKeywords')
    setCustomName = document.getElementById('setCustomName')
    customNameInput = document.getElementById('custom-name');
    authorInput = document.getElementById('authorInput')
    authorSaveButton = document.getElementById('authorSaveButton')
    settings_popup = document.getElementById('settings-popup');
    settingButton = document.getElementById('setting-btn');
    setQuote = document.getElementById('quote');
    setQuoteAuthor = document.getElementById('quoteAuthor')
    constructor(mainBodyCont) {
        this.events();
        this.updateCustomNameSetting()
        this.mainBodyCont = mainBodyCont;
        this.setAuthorName();
        this.setWallpaperKeywords();
        this.updateSettingChanges();
        this.backgroundWallpapers();
    }
    async backgroundWallpapers() {
        const wallpaperToggle = await apis.fetchFromStorage('wallpaperToggle');
        const WallpaperKeywords = await apis.fetchFromStorage('WallpaperKeywords');
        if (wallpaperToggle.wallpaperToggle === 'ON') {
            if (WallpaperKeywords.WallpaperKeywords) {
                var keyWord = WallpaperKeywords.WallpaperKeywords;
                var link = `https://source.unsplash.com/random/${window.innerWidth}x${window.innerHeight}/?${keyWord}`
                this.mainBodyCont.style.backgroundImage = `url(${link})`;
            } else {
                this.mainBodyCont.style.backgroundImage = `url(https://source.unsplash.com/random/${window.innerWidth}x${innerHeight}/?nature)`;
            }
        }
    }
    openSettingPopUP() {
        var settingPopup = this.settings_popup;
        var settingButton = this.settingButton;
        document.getElementById('setting_change_btn').addEventListener('click', (event) => {
            this.settings_popup.style.display = 'flex';
            document.addEventListener('click', closeCheckSettingDialogBox)
        })
        function closeCheckSettingDialogBox(event) {
            if (!settingPopup.contains(event.target) && !settingButton.contains(event.target)) {
                settingPopup.style.display = 'none';
                document.removeEventListener('click', closeCheckSettingDialogBox);
            }
        }
    }
    events() {
        this.customName.addEventListener('input', async (event) => {
            apis.saveToStorage({ 'customName': event.target.value })
            this.updateCustomNameSetting();
        });
        this.WallpaperKeywords.addEventListener('input', async (event) => {
            await apis.saveToStorage({ 'WallpaperKeywords': event.target.value })
        })

        this.authorSaveButton.addEventListener('click', async (event) => {
            await apis.saveToStorage({ 'authorName': authorInput.value })
            await this.saveFreshQuote();
            this.setQuotes()
        })
        this.themeToggle.addEventListener('click', function (event) {
            event.target.checked ? apis.saveToStorage({ 'themeToggle': 'ON' }) : apis.saveToStorage({ 'themeToggle': 'OF' })
            if (event.target.checked) {
                apis.saveToStorage({ 'themeToggle': 'ON' })
                theme.darkTheme();
            } else {
                apis.saveToStorage({ 'themeToggle': 'OF' })
                theme.lightTheme()
            }
        });
        this.wallpaperToggle.addEventListener('click', async (event) => {
            if (event.target.checked) {
                apis.saveToStorage({ 'wallpaperToggle': 'ON' })
                this.mainBodyCont.style.backgroundImage = `url(https://source.unsplash.com/random/${window.innerWidth}x${window.innerHeight}/?nature)`;
            } else {
                apis.saveToStorage({ 'wallpaperToggle': 'OFF' })
                this.mainBodyCont.style.backgroundImage = '';
            }
        });
        this.quotesToggle.addEventListener('click', async (event) => {
            if (event.target.checked) {
                await apis.saveToStorage({ 'quotesToggle': 'ON' })
                this.setQuotes()
            } else {
                await apis.saveToStorage({ 'quotesToggle': 'OFF' })
                this.setQuotes()
            }
        });
    }
    async setAuthorName() {
        const authorName = await apis.fetchFromStorage("authorName")
        if (authorName.authorName) {
            authorInput.value = authorName.authorName
        }
    }
    async updateCustomNameSetting() {
        const customName = await apis.fetchFromStorage('customName')
        if (customName.customName) {
            this.setCustomName.innerText = customName.customName;
            this.customNameInput.value = customName.customName;
        } else { this.setCustomName.innerText = 'Google'; }
    }
    async setWallpaperKeywords() {
        const wallpaperKeywords = await apis.fetchFromStorage('WallpaperKeywords');
        if (wallpaperKeywords.WallpaperKeywords) {
            this.WallpaperKeywords.value = wallpaperKeywords.WallpaperKeywords;
        }
    }
    fetchQuote(author) {
        var link = author ? `https://api.quotable.io/quotes/random?author=${author}` : 'https://api.quotable.io/quotes/random'
        return new Promise((resolve) => {
            fetch(link)
                .then(async function (response) {
                    const data = await response.json();
                    resolve(data)
                }).catch((error) => {
                    console.error(error);
                });
        })
    }

    async saveFreshQuote() {
        var author = await apis.fetchFromStorage("authorName")
        const quote = await this.fetchQuote(author.authorName);
        apis.saveToStorage({ 'todayQuote': { content: quote[0].content, author: quote[0].author } })
    }

    async setQuotes() {
        const quote = await apis.fetchFromStorage('todayQuote');
        const quoteToggleBtn = await apis.fetchFromStorage('quotesToggle')
        if (quote.todayQuote && quoteToggleBtn.quotesToggle === 'ON') {
            this.setQuoteAuthor.textContent = `${quote.todayQuote.author} :`;
            this.setQuote.textContent = quote.todayQuote.content;
        } else {
            this.setQuoteAuthor.textContent = '';
            this.setQuote.textContent = ''
        }
    }
    async updateSettingChanges() {
        const quotesToggle = await apis.fetchFromStorage('quotesToggle');
        const wallpaperToggle = await apis.fetchFromStorage('wallpaperToggle');
        const themeToggle = await apis.fetchFromStorage('themeToggle');
        quotesToggle.quotesToggle === 'ON' ? this.quotesToggle.checked = true : this.quotesToggle.checked = false;
        wallpaperToggle.wallpaperToggle === 'ON' ? this.wallpaperToggle.checked = true : this.wallpaperToggle.checked = false;
        themeToggle.themeToggle === 'ON' ? this.themeToggle.checked = true : themeToggle.checked = false;
    }
}
export default Setting
