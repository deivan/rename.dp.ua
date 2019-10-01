<template>
  <div>
    <div class="container__title"><span>НОВА / стара назва</span><span class="column2">На честь</span></div>
    <div class="container__cover">
      <table class="table-view">
        <tbody>
          <tr v-for="item in arr">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'AreaTable',
  props: ['area', 'allData', 'baseData'],
  methods: {
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
  },
  computed: {
    arr () {
      return this.allData[this.area].objects
    }
  }
}
</script>

<style scoped>

</style>
