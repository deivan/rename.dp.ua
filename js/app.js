class Renames {
  constructor () {
    console.log('started!');
    this.getData();
    this.personTypes = ['особа', 'подія', 'об’єкт', 'спільнота'];
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

      }
    });
  }
  
  getData(){
    Vue.http.get('rename.json')
      .then( data => {
          this.dataField = JSON.parse(data.data);
          this.makeApp();
          console.log(this.dataField, this)
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
        { path:'/proproekt', component: { template: ''} },
        { path:'/api', component: { template: ''} }
      ]
    });
  }
  
  makeComponents () {
    let self = this;
    Vue.component('table-view', {
     template: '<table class="table-view">\
                  <tbody>\
                    <tr v-for="item in arr">\
                      <td class="table-view__names">\
                        <div class="table-view__names--new">{{item.newName}}<span v-if="item.newType">, {{getObjectType(item.newType)}}</span></div>\
                        <div class="table-view__names--old">{{getObjectType(item.type)}} {{item.oldName}}</div>\
                      </td><td class="table-view__descr">\
                        <span class="table-view__descr--mark" :class="getClass(item.restored)" :title="getTitle(item.restored)"></span>\
                        <a v-if="item.link" class="table-view__descr--link" :href="item.link.href">{{getPersonType(item.link.type)}}</a>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>',
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
  }
}