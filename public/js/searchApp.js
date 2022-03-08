class SearchApp extends RenameApp {
    constructor() {
        super();
    }

    init() {
        this.searchBtn = document.querySelector('#searchRename');
        this.searchName = document.querySelector('#searchName');
        this.searchForm = document.querySelector('form.needs-validation');
        this.initMenu();
        this.initDataTable();
    }

    initDataTable() {
        this.initEmptyTable();
        this.searchBtn.addEventListener('click', e => {
            e.preventDefault();
            if (this.searchName?.value) {
                this.filterData();
            }
        });
        this.searchName.addEventListener('search', e => {
            this.searchName.classList.remove('is-invalid');
            this.initEmptyTable();
        })
        this.searchName.addEventListener('keydown', e => {
            this.searchName.classList.remove('is-invalid');
            if (e.keyCode === 13) {
                e.preventDefault();
                this.filterData();
            }
        })
    }

    filterData() {
        if (this.searchName.value.length < 3) {
            this.searchName.classList.add('is-invalid');
            return;
        }
        this.filteredData = this.filter(this.searchName.value);
        if (this.filteredData.length > 0) {
            this.renderResultsTable();
        } else {
            this.initEmptyTable();
        }
    }

    initEmptyTable() {
        this.tableContent.innerHTML = `<tr><td>...</td><td>...</td></tr>`;
    }

    filter(name) {
        let filteredData = []
        for (let key in this.data) {
            if (key.indexOf('r6') !== -1) {
                let areaObjects = this.data[key].objects;
                areaObjects.forEach(item => {
                    if (isPresent(name, item.oldName, item.newName)) {
                        filteredData.push(Object.assign({
                            newAreaName: this.data[key].newAreaName,
                            oldAreaName: this.data[key].oldAreaName,
                       }, item));
                    }
                })
            }
        }
        return filteredData;

        function isPresent(name, oldName, newName) {
            name = name.toLowerCase();
            oldName = oldName.toLowerCase();
            newName = newName.toLowerCase();
            return oldName.indexOf(name) !== -1 || newName.indexOf(name) !== -1;
        }
    }
}