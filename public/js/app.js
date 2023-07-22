class RenameApp {
    constructor(area = '/') {
        this.navMenu = NAV_MENU;
        this.aliases = ALIASES;
        this.area = area;
        this.data = JSON.parse(DATA);
        this.tableContent = document.querySelector('#tableContent');
        this.filteredData = [];
        this.init();
    }

    init() {
        this.initMenu();
        this.initDataTable();
    }

    initMenu() {
        const navBar = document.querySelector('#navBar');
        const donate = document.createElement('DIV');
        let menuContent = '';

        if (!navBar) return;

        NAV_MENU.forEach(item => {
            menuContent += `
                <li class="list-group-item ${this.area === item.area ? 'active' : ''}">
                <a href="${item.link}">${item.text}</a>
                </li>
            `;
        });

        donate.classList.add('donation');
        donate.innerHTML = `
            <p>Проект потребує систематичнмх витрат на підтримку серверу та домену, якщо у вас є можливість допомогти, - натисніть кнопку нижче, щиро дякую:</p>
            <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="LMVNT3JF6TR66" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_UA/i/scr/pixel.gif" width="1" height="1" />
            </form>
        `;
        navBar.parentElement.appendChild(donate);

        menuContent += `
            <div class="fb-share-button" data-href="http://rename.dp.ua/" data-layout="button_count" style="margin-top:36px"></div>
        `;
        navBar.innerHTML = menuContent;
    }

    initDataTable() {
        document.querySelector('#newAreaName').innerText = this.data[this.area].newAreaName;
        if (this.data[this.area].newAreaName !== this.data[this.area].oldAreaName) {
            document.querySelector('#oldAreaName').innerText = `(${this.data[this.area].oldAreaName})`;
        }
        this.filteredData = this.data[this.area].objects;
        this.renderResultsTable();
    }

    renderResultsTable() {
        let htmlString = '';
        this.filteredData.forEach(item => {
            if (item.newAreaName && htmlString.indexOf(item.newAreaName) === -1) {
                htmlString += `<tr class="areaLine"><td colspan="2">${item.newAreaName} (${item.oldAreaName}) район</td></tr>`;
            }
            htmlString += 
                `<tr><td>${item.newName.toUpperCase()} / ${ALIASES.objectTypes[item.type]} ${item.oldName}</td>
                <td class="secondColumn">${item.restored ? '<img src="assets/restore.png" title="відновлено історичну назву" />' : ''}&nbsp;
                ${item.link ? `<a href="${item.link.href}" target="_blank">${ALIASES.personTypes[item.link.type]}</a>` : ''}</td></tr>`;
        });
        document.querySelector('#tableContent').innerHTML = htmlString;
    }
}