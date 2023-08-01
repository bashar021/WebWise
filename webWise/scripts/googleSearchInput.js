import BackgroundConnection from './BackgroundConnection.js'
class GoogleSearchInput {
    constructor(searchInput, suggestionsDiv,openGmail,openPhotos) {
        this.searchInput = searchInput
        this.suggestionsDiv = suggestionsDiv
        this.getValue()
        this.searchOnEnterBtn()
        this.openGmail = openGmail
        this.openPhotos = openPhotos
        this.gmailPhotos();
    }
    performWebSearch(query) {
        chrome.tabs.update({ url: `https://www.google.com/search?q=${encodeURIComponent(query)}` });
    }
    disPlaySuggestions(suggestions) {
        const query = this.searchInput.value
        this.suggestionsDiv.innerHTML = '';
        if (!query) {
            this.suggestionsDiv.innerHTML = '';
            return;
        }
        suggestions.response.forEach((suggestion) => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.textContent = suggestion;
            suggestionDiv.className = 'suggestions_items';
            suggestionDiv.addEventListener('click', () => {
                this.searchInput.value = suggestion;
                this.suggestionsDiv.innerHTML = '';
                this.performWebSearch(suggestion);
            });
            this.suggestionsDiv.appendChild(suggestionDiv);
        });
    }
    getValue() {
        this.searchInput.addEventListener('keyup', async (event) => {
            var backgroundConnection = new BackgroundConnection()
            var result;
            if (event.target.value) {
                result = await backgroundConnection.sendMessage('suggestions', event.target.value)
            }
            this.disPlaySuggestions(result)
        })
    }
    searchOnEnterBtn() {
        this.searchInput.addEventListener('keypress', (event) => {
            if (event.key == 'Enter') {
                if (event.target.value) {
                    this.performWebSearch(event.target.value)
                }
            }
        })
    }
    gmailPhotos() {
        openGmail.addEventListener('click',  (event)=>{
            chrome.tabs.update({ url: `https://mail.google.com` });
        })
        openPhotos.addEventListener('click', (event)=>{
            chrome.tabs.update({ url: `https://photos.google.com/` })
        })

    }
}
export default GoogleSearchInput