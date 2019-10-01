<template>
    <v-app>
      <v-content>
        <v-container>
          <v-card height="100%" :loading="isLoading">
            <v-img src="./assets/cover3.jpg" height="350" position="center top"></v-img>
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-flex sm5 md4 lg4>
                      <NavSlider />
                    </v-flex>
                    <v-flex sm7 md8 lg8>
                      <router-view :allData="data" :baseData="baseData"></router-view>
                    </v-flex>
                  </v-row>
                  <v-row>
                    <AppFooter />
                  </v-row>
                </v-container>
            </v-card-text>
          </v-card>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
import BaseData from './assets/data/baseData'
import AppFooter from './components/AppFooter.vue'
import NavSlider from './components/NavSlider.vue'

export default {
  name: 'baseApp',
  data: function () {
    return {
      data: {},
      baseData: BaseData,
      isLoading: true
    }
  },
  components: {
    AppFooter,
    NavSlider
  },
  mounted () {
    fetch('/rename.json')
      .then(r => r.json())
      .then(json => {
        this.data = json;
        this.baseData.areas.map(area => {
          this.data[area].objects.map(obj => {
            this.baseData.names.push(obj)
          })
          this.isLoading = false
        })
      },
      res => {
        console.warn('Error loading json:', res)
      })
  }
}
</script>

<style lang="scss" src="./assets/scss/base.scss"></style>
