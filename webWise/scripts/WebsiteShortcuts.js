import Apis from "./Apis.js";
const apis = new Apis();
class WebsiteShortcuts {
    constructor() {

    }
    async deleteWebsiteShortCuts(id) {
        var shortCuts = await apis.fetchFromStorage('websiteShortcuts');
        var newShortCuts = shortCuts.websiteShortcuts
        newShortCuts.splice(id, 1)
        await apis.saveToStorage({ 'websiteShortcuts': newShortCuts })
        this.retrieveWebsiteShortCutsDetail();
    }
    savePopUpDetails(popUpContainer) {
        var websiteName = document.getElementById('website-name').value;
        var websiteUrl = document.getElementById('website-url').value;
        // Check if both websiteName and websiteUrl have values
        if (websiteName && websiteUrl) {
            document.getElementById('website-name').value = '';
            document.getElementById('website-url').value = '';
            this.saveWebsiteShortcutDetails({ name: websiteName, link: websiteUrl })
                .then(() => {
                    this.retrieveWebsiteShortCutsDetail();
                })
                .catch((error) => {
                    console.error("Error saving data to local storage:", error);
                });
            popUpContainer.style.display = 'none';
        }
    }
    saveWebsiteShortcutDetails(shortcut) {
        return new Promise(async (resolve, reject) => {
            const websiteShortcuts = await apis.fetchFromStorage('websiteShortcuts');
            if (websiteShortcuts.websiteShortcuts) {
                const existingShortcuts = websiteShortcuts.websiteShortcuts;
                const allShortcuts = [...existingShortcuts, shortcut];
                chrome.storage.local.set({ 'websiteShortcuts': allShortcuts }, () => {
                    resolve();
                });
            } else {
                const allShortcuts = [shortcut];
                chrome.storage.local.set({ 'websiteShortcuts': allShortcuts }, () => {
                    resolve();
                });
            }
        });
    }
    displayWebsiteShortcuts(websiteShortcuts) {
        const shortcutsContainer = document.getElementById('shortcuts-box');
        shortcutsContainer.innerHTML = '';
        // Loop through each website shortcut and create HTML elements to display them
        websiteShortcuts.forEach((shortcut, index) => {
            const shortcutElement = document.createElement('div');
            shortcutElement.className = 'shortcuts_items';
            const iconElement = document.createElement('img');
            iconElement.src = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${shortcut.link}&size=48`;
            const shortcutName = document.createElement('p');
            shortcutName.classList = 'shortcutsName';
            shortcutName.textContent = shortcut.name;
            const dots = document.createElement('div');
            dots.className = 'three_dots';
            dots.innerHTML = '&#8942;'
            const del = document.createElement('button')
            del.className = 'shortcut_item_delete';
            del.textContent = 'Delete';
            shortcutElement.appendChild(iconElement);
            shortcutElement.appendChild(shortcutName);
            shortcutElement.appendChild(del)
            shortcutElement.appendChild(dots)
            shortcutsContainer.appendChild(shortcutElement);
            dots.addEventListener('mouseenter', function () {
                del.style.display = 'block';
            });
            dots.addEventListener('mouseleave', function () {
                del.style.display = 'none';
            });
            del.addEventListener('mouseenter', function () {
                del.style.display = 'block';
            });
            del.addEventListener('mouseleave', function () {
                del.style.display = 'none';
            });
            del.addEventListener('click', () => {
                this.deleteWebsiteShortCuts(index);
            })
            shortcutElement.addEventListener('click', function (event) {
                if (!del.contains(event.target) && !dots.contains(event.target)) {
                    console.log(shortcut.link)
                    chrome.tabs.update({ url: shortcut.link })
                }
            });
        });
    }
    async retrieveWebsiteShortCutsDetail() {
        var websiteShortcuts = [];
        const data = await apis.fetchFromStorage('websiteShortcuts');
        if (data.websiteShortcuts) {
            websiteShortcuts = data.websiteShortcuts;
            this.displayWebsiteShortcuts(websiteShortcuts);
        }
    }

}
export default WebsiteShortcuts