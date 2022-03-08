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
        let menuContent = '';

        if (!navBar) return;

        NAV_MENU.forEach(item => {
            menuContent += `
                <li class="list-group-item ${this.area === item.area ? 'active' : ''}">
                <a href="${item.link}">${item.text}</a>
                </li>
            `;
        });
        navBar.innerHTML = menuContent;
    }

    initDataTable() {
        console.log(this.data, this.area)
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
                ${item.link ? `<a href="${item.link.href}">${ALIASES.personTypes[item.link.type]}</a>` : ''}</td></tr>`;
        });
        document.querySelector('#tableContent').innerHTML = htmlString;
    }
}