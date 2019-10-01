<template>
  <div class="sidebar">
    <router-link to="/">Пошук</router-link>
    <router-link to="/and">Амур-Нижньодніпровський</router-link>
    <router-link to="/shevchenkivskiy">Шевченківський (Бабушкінський)</router-link>
    <router-link to="/soborniy">Соборний (Жовтневий)</router-link>
    <router-link to="/industrialniy">Індустріальний</router-link>
    <router-link to="/tsentralniy">Центральний (Кіровський)</router-link>
    <router-link to="/chechelevskiy">Чечелівський (Красногвардійський)</router-link>
    <router-link to="/novokodatskiy">Новокодацький (Ленінський)</router-link>
    <router-link to="/samarskiy">Самарський</router-link>
    <router-link to="/proproekt">Про проект</router-link>
    <router-link to="/api">Опис API</router-link>
    <div class="fb-share-button" data-href="http://rename.dp.ua/" data-layout="button_count" style="margin-top:36px"></div>
  </div>
</template>

<script>
export default {
  name: 'NavSlider'
}
</script>

<style scoped lang="scss">
  .sidebar {
    width: 90%;
    text-align: right;
    min-height: 540px;
    a {
      display: inline-block;
      width: calc(100% - 30px);
      height: 28px;
      line-height: 30px;
      margin-top: 10px;
      padding-right: 10px;
      background-color: #eee;
      color: #008;
      font-weight: 900;
      text-decoration: none;
      font-size: 14px;
      border: 1px solid #fff;
      border-top-left-radius: 4px;
      border-bottom-left-radius:4px;
      &:visited {
        color: #008;
      }
      &.router-link-exact-active {
        background-color: #fff;
        border: 1px solid #eee;
        border-right: none;
        color: #444;
        cursor: default;
      }
    }
  }
</style>
