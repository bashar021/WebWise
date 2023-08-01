class GoogleShortcuts {
    googleItems = [
        { name: 'Maps', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://maps.google.com&size=50', url: 'https://maps.google.com' },
        { name: 'Play', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://play.google.com&size=50', url: 'https://play.google.com' },
        { name: 'News', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://news.google.com&size=50', url: 'https://news.google.com' },
        { name: 'Chat', favicon: ' https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon_chat_r2.ico', url: 'https://mail.google.com/chat/u/0/' },
        { name: 'Contacts', favicon: 'https://ssl.gstatic.com/images/branding/product/2x/contacts_2022_96dp.png', url: 'https://contacts.google.com' },
        { name: 'Drive', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://drive.google.com&size=50', url: 'https://drive.google.com' },
        { name: 'Calendar', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://calendar.google.com&size=50', url: 'https://calendar.google.com' },
        { name: 'Meet', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://meet.google.com&size=50', url: 'https://meet.google.com' },
        { name: 'Translate', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://translate.google.com&size=50', url: 'https://translate.google.com' },
        { name: 'Photos', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://photos.google.com&size=50', url: 'https://photos.google.com' },
        { name: 'Add Center', favicon: 'https://www.gstatic.com/myadcenter/logo/024c8aa0783d8fcc3bc37a95bacf2f96.webp', url: 'https://myadcenter.google.com/home' },
        { name: 'Shopping', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://shopping.google.com&size=50', url: 'https://shopping.google.com' },
        { name: 'Finance', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://finance.google.com&size=50', url: 'https://finance.google.com' },
        { name: 'Docs', favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico', url: "https://docs.google.com" },
        { name: 'Sheet', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://sheets.google.com&size=50', url: 'https://sheets.google.com' },
        { name: 'Slides', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://slides.google.com&size=50', url: 'https://slides.google.com' },
        { name: 'Blogger', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.blogger.com&size=50', url: 'https://www.blogger.com' },
        { name: 'Keep', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://keep.google.com&size=50', url: 'https://keep.google.com' },
        { name: 'Classroom', favicon: 'https://ssl.gstatic.com/classroom/ic_product_classroom_32.png', url: 'https://classroom.google.com' },
        { name: 'Earth', favicon: 'https://www.gstatic.com/earth/00-favicon.ico', url: 'https://earth.google.com/web/?authuser=0' },
        { name: 'Google Ads', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ads.google.com&size=50', url: 'https://ads.google.com' },
        { name: 'Google One', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://one.google.com&size=50', url: 'https://one.google.com' },
        { name: 'Forms', favicon: ' https://ssl.gstatic.com/docs/spreadsheets/forms/favicon_qp2.png', url: 'https://store.google.com/' },
        { name: 'Google Store', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://store.google.com&size=50', url: 'https://store.google.com' },
        { name: 'Chrome Store', favicon: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://chrome.google.com&size=50', url: 'https://chrome.google.com' }

    ];
    constructor(menubar, openGmail, openPhotos,navigationButton) {
        this.menubar = menubar;
        this.openGmail = openGmail;
        this.openPhotos = openPhotos;
        this.navigationButton = navigationButton;
        this.setGoogleShortCuts();
    }
    setGoogleShortCuts() {
        this.googleItems.forEach((item, index) => {
            var googleShortCutBox = document.createElement('div');
            var googleShortCutIcon = document.createElement('img');
            var googleShortCutName = document.createElement('p');
            googleShortCutBox.classList = 'googleShortCutsBox';
            googleShortCutIcon.classList = 'googleShortCutsIcon';
            googleShortCutName.innerHTML = item.name;
            googleShortCutIcon.src = item.favicon;
            googleShortCutBox.appendChild(googleShortCutIcon);
            googleShortCutBox.appendChild(googleShortCutName);
            this.menubar.appendChild(googleShortCutBox);
            googleShortCutBox.addEventListener('click', function () { chrome.tabs.update({ url: item.url }) });
        });
    }
    googleShortcutsEvent() {
        document.getElementById('navigationButton').addEventListener('click', (event) => {
            this.menubar.style.display = 'flex'
            document.addEventListener('click', closeGoogleShortCuts)
        })
        const Menubar  = this.menubar;
        const NavigationButton = this.navigationButton
        function closeGoogleShortCuts(event){
            if (!Menubar.contains(event.target) && !NavigationButton.contains(event.target)) {
                Menubar.style.display = 'none'
                document.removeEventListener('click', closeGoogleShortCuts)
            }
        }
    }
}
export default GoogleShortcuts;