<template>
  <div class="content">
    <h1>Перейменування вулиць та місць Дніпра 2015-2016</h1>
    <article>
      <p>Всі назви представлені відповідно до розпоряджень про перейменування: міського голови -
      <ul>
        <li><strong>№882-р від 24.11.2015 р.</strong></li>
        <li><strong>№897-р від 26.11.2015 р.</strong></li>
        <li><strong>№71-р від 19.02.2016 р.</strong></li>
      </ul>
      міської ради -
      <ul>
        <li><strong>№61/34 від 25.07.2018 р.</strong></li>
        <li><strong>№57/46 від 19.06.2019 р.</strong></li>
        <li><strong>№78/47 від 24.07.2019 р.</strong></li>
      </ul>
      обласного голови - <strong>№Р-223/0/3-16 от 19.05.2016 р.</strong></p>
      <p>Весь масив даних доступний до будь-якого використання у вигляді JSON-об\'єкту, що є доступним <a href="rename.json">за цим посиланням</a>.</p>
      <p>Запрошуємо завантажити додаток для ОС Android:
        <a href="https://play.google.com/store/apps/details?id=ua.dp.rename.dniprostreets&amp;utm_source=global_co&amp;utm_medium=prtnr&amp;utm_content=Mar2515&amp;utm_campaign=PartBadge&amp;pcampaignid=MKT-AC-global-none-all-co-pr-py-PartBadges-Oct1515-1"><img alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/images/apps/ru-play-badge.png" width="82" height="25"></a></p>
      <p>Також для пошуку <a href="http://telegram.me/renamedpuabot">можливо скористатись Телеграм-ботом</a></p>
      <p>Позначкою  <img :src="historicalIcon" />  помічена повернута історична назва об\'єкту.</p>
      <p class="special">Завантажте авторський буклет з переліком перейменувань від <a href="http://atomoxod.in.ua">Олексія Пильова</a>, у вигляді файла формату PDF <a href="Dnipro_Rename_v2.pdf">за цим посиланням</a></p>

      <h3>Пошук за назвою (бажано українською):</h3>
      <input class="input-search" v-model.trim="search" @keyup="filter" />
      <table class="table-view" v-for="tab in filteredData" v-if="tab.obj.length > 0">
        <tr class="search-header"><th colspan="2">{{tab.name}}</th></tr>
        <tbody>
        <tr v-for="item in tab.obj">
          <td class="table-view__names">
            <div class="table-view__names--new">{{item.newName}}<span v-if="item.newType">, {{getObjectType(item.newType)}}</span></div>
            <div class="table-view__names--old">{{getObjectType(item.type)}} {{item.oldName}}</div>
          </td>
          <td class="table-view__descr">
            <span class="table-view__descr--mark" :class="getClass(item.restored)" :title="getTitle(item.restored)"></span>
            <a v-if="item.link" target="new" class="table-view__descr--link" :href="item.link.href">{{getPersonType(item.link.type)}}</a>
          </td>
        </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>

<script>
import Icon from '../assets/restore.png'
export default {
  name: 'HomePage',
  props: ['allData', 'baseData'],
  data () {
    return {
      historicalIcon: Icon,
      search: '',
      filteredData: []
    }
  },
  methods: {
    filter () {
      this.filteredData = []
      if (this.search === '') {

      } else {
        this.baseData.areas.map(area => {
          let obj = { name: `${this.allData[area].newAreaName} (${this.allData[area].oldAreaName})`, obj: [] }
          obj.obj = this.allData[area].objects.filter(item => {
            return (item.oldName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
                item.newName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
          })
          this.filteredData.push(obj)
        })
      }
    },
    getClass (mark) {
      return mark ? 'restored' : ''
    },
    getPersonType (type) {
      return this.baseData.personTypes[type]
    },
    getTitle (mark) {
      return mark ? 'Повернута історична назва' : ''
    },
    getObjectType (type) {
      return this.baseData.objectTypes[type]
    }
  }
}
</script>

<style></style>
