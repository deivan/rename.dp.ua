class Renames {
  constructor () {
    console.log('started!');
    this.getData();
    this.personTypes = ['особа', 'подія', 'об’єкт', 'спільнота'];
    this.areas = ['r61','r62','r63','r64','r65','r66','r67','r68'];
    this.names = [];
    this.objectTypes = {
      street:     'вулиця',
      lane:       'провулок',
      avenue:     'проспект',
      impasse:    'тупик',
      square:     'площа',
      embankment: 'набережна',
      park:       'парк, сквер',
      slope:      'узвіз',
      area:       'житломасив',
      lake:       'затока',
      island:     'острів',
      station:    'станція'
    };
  }
  
  makeApp () {
    this.makeComponents();
    this.app = new Vue({
      el: '#app-instance',
      router: this.makeRoutes(),
      data: {

      },
      methods: {
        isSelected: function (url) {
          console.log(this.$route.path, url)
          return this.$route.path === url ? 'selected' : '';
        }
      }
    });
  }
  
  getData () {
    let self = this;
    Vue.http.get('rename.json')
      .then( data => {
          this.dataField = JSON.parse(data.data);
          this.areas.map( area => {
            this.dataField[area].objects.map(obj => {
              this.names.push(obj);
            });
          });
          this.makeApp();
          console.log(this.dataField, this.names)
      })
      .catch( data => {
          console.log('error', data,this.app)
          this.app.$refs.snackbar.open();
      })
  }
  
  makeRoutes () {
    return new VueRouter({
      routes: [
        { path:'/and', component: { template: '<table-view data="r61"></table-view>'} },
        { path:'/shevchenkivskiy', component: { template: '<table-view data="r62"></table-view>'} },
        { path:'/soborniy', component: { template: '<table-view data="r63"></table-view>'} },
        { path:'/industrialniy', component: { template: '<table-view data="r64"></table-view>'} },
        { path:'/tsentralniy', component: { template: '<table-view data="r65"></table-view>'} },
        { path:'/chechelevskiy', component: { template: '<table-view data="r66"></table-view>'} },
        { path:'/novokodatskiy', component: { template: '<table-view data="r67"></table-view>'} },
        { path:'/samarskiy', component: { template: '<table-view data="r68"></table-view>'} },
        { path:'/', component: { template: '<about-project></about-project>'} },
        { path:'/proproekt', component: { template: '<about-us></about-us>'} },
        { path:'/api', component: { template: '<api-descr></api-descr>'} }
      ]
    });
  }
  
  makeComponents () {
    let self = this;
    Vue.component('table-view', {
     template: '<div><div class="container__title"><span>НОВА / стара назва</span><span class="column2">На честь</span></div>\
                  <div class="container__cover"><table class="table-view">\
                  <tbody>\
                    <tr v-for="item in arr">\
                      <td class="table-view__names">\
                        <div class="table-view__names--new">{{item.newName}}<span v-if="item.newType">, {{getObjectType(item.newType)}}</span></div>\
                        <div class="table-view__names--old">{{getObjectType(item.type)}} {{item.oldName}}</div>\
                      </td><td class="table-view__descr">\
                        <span class="table-view__descr--mark" :class="getClass(item.restored)" :title="getTitle(item.restored)"></span>\
                        <a v-if="item.link" target="new" class="table-view__descr--link" :href="item.link.href">{{getPersonType(item.link.type)}}</a>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table></div></div>',
      props: ['data'],
      data: function () {
        return {
          arr: self.dataField[this.data].objects
        };
      },
      methods: {
        getClass: function (mark) {
          return !!mark ? 'restored' : '';
        },
        getPersonType: function (type) {
          return self.personTypes[type];
        },
        getTitle: function (mark) {
          return !!mark ? 'Повернута історична назва' : '';
        },
        getObjectType: function (type) {
          return self.objectTypes[type];
        }
      }
    });
    
    Vue.component('about-project', {
      template: '<section><h1>Перейменування вулиць та місць Дніпра 2015-2016</h1>\
          <p>Всі назви представлені відповідно до розпоряджень про перейменування: міського голови - \n\
          <ul><li><strong>№882-р від 24.11.2015 р.</strong></li> <li><strong>№897-р від 26.11.2015 р.</strong></li>\n\
              <li><strong>№71-р від 19.02.2016 р.</strong></li></ul> обласного голови - <strong>№Р-223/0/3-16 от 19.05.2016 р.</strong></p>\
          <p>Весь масив даних доступний до будь-якого використання у вигляді JSON-об\'єкту, що є доступним <a href="rename.json">за цім посиланням</a>.</p>\n\
          <p>Запрошуємо завантажити додаток для ОС Android: \
          <a href="https://play.google.com/store/apps/details?id=ua.dp.rename.dniprostreets&amp;utm_source=global_co&amp;utm_medium=prtnr&amp;utm_content=Mar2515&amp;utm_campaign=PartBadge&amp;pcampaignid=MKT-AC-global-none-all-co-pr-py-PartBadges-Oct1515-1"><img alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/images/apps/ru-play-badge.png" width="82" height="25"></a></p>\n\
          <p>Також для пошуку <a href="http://telegram.me/renamedpuabot">можливо скористатись Телеграм-ботом</a></p>\
          <h3>Пошук за назвою (бажано українською):</h3>\
          <input class="input-search" v-model.trim="search" @keyup="filter" />\
            <table class="table-view" v-for="tab in filteredData" v-if="tab.obj.length > 0">\
            <tr class="search-header"><th colspan="2">{{tab.name}}</th></tr>\
            <tbody>\
              <tr v-for="item in tab.obj">\
                <td class="table-view__names">\
                  <div class="table-view__names--new">{{item.newName}}<span v-if="item.newType">, {{getObjectType(item.newType)}}</span></div>\
                  <div class="table-view__names--old">{{getObjectType(item.type)}} {{item.oldName}}</div>\
                </td><td class="table-view__descr">\
                  <span class="table-view__descr--mark" :class="getClass(item.restored)" :title="getTitle(item.restored)"></span>\
                  <a v-if="item.link" target="new" class="table-view__descr--link" :href="item.link.href">{{getPersonType(item.link.type)}}</a>\
                </td>\
              </tr>\
            </tbody>\
          </table></section>',
            
      data: function () {
        return {
          intro: '',
          search: '',
          filteredData: []
        };
      },
      methods: {
        filter: function () {
          this.filteredData = [];
          if (this.search === '') {
            
          } else {
            self.areas.map( area => {
              let obj = { name: `${self.dataField[area].newAreaName} (${self.dataField[area].oldAreaName})`, obj: [] };
              obj.obj = self.dataField[area].objects.filter( item => {
                return (item.oldName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 
                     || item.newName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
              });
              this.filteredData.push(obj);
              console.log(area, obj)
            });
          }
        },
        getClass: function (mark) {
          return !!mark ? 'restored' : '';
        },
        getPersonType: function (type) {
          return self.personTypes[type];
        },
        getTitle: function (mark) {
          return !!mark ? 'Повернута історична назва' : '';
        },
        getObjectType: function (type) {
          return self.objectTypes[type];
        }
      }
    });
    
    Vue.component('about-us', {
      template: 
        '<section>\
          <h1>Про проект</h1>\
          <h4>Як все починалось та навіщо все це</h4>\
          <p>Детальна стаття про проект на DOU.ua - <a href="https://dou.ua/lenta/articles/dou-projector-rename/">Rename.dp.ua — справочник о переименовании улиц Днепра, написанный за 2 дня</a></p>\
          <p>Сюжет 51-го телеканалу м. Дніпра у жовтні 2016, автор - <a href="https://www.facebook.com/profile.php?id=100007976653247">Тетяна Консевич</a> </p>\
          <iframe width="560" height="315" src="https://www.youtube.com/embed/oSsYiAqoS-Y" frameborder="0" allowfullscreen=""></iframe>\
          <h4>Хто ми?</h4><p>Автор та керманич проекту - <a href="http://demenkov.dp.ua/">Іван Юрійович ДЕМЕНКОВ</a>\
          <p>Авторська графіка для шапки сайту та буклет - <a href="http://atomoxod.in.ua">Олексій Пильов</a>.</p>\
          <p>Наповнення бази даних, пошук актуальних посиланнь та корекція помилок -  <a href="https://facebook.com/rasim.labibov">Расім Лабібов</a></p>\
          <p>Перший <a href="https://play.google.com/store/apps/details?id=ua.dp.rename.dniprostreets">мобільний додаток для ОС Андроид</a> - зробив <a href="https://www.facebook.com/den.drobiazko">Den Drobiazko</a></p>\
          <p>Розробник <a href="http://telegram.me/renamedpuabot">телеграм-боту</a> для пошуку нових назв - <a href="https://www.facebook.com/stanislav.blokh">Stanislav Blokh</a></p>\
          <h4>Чи потрібна проекту допомога?</h4><p>Цій сервіс створений дніпрянами для дніпрян. Все бескоштовно. Якщо ви маєте сили та бажання покращити проект - приєднуйтесь до нас <a href="https://github.com/deivan/rename.dp.ua">у мережі проектів GitHub</a></p>\
          <p>Малюнки та побажання ласкаво просимо слати за адресою: <span style="color:#00a; text-decoration:underground">info@rename.dp.ua</span></p>\
        </section>',            
      data: function () {
        return {
          intro: ''
        };
      },
      methods: {

      }
    });
    
    Vue.component('api-descr', {
      template: '#api-description',            
      data: function () {
        return {
          intro: ''
        };
      },
      methods: {

      }
    });
  }
}
