<template>
  <div class="content">
    <h1>Опис даних у форматі JSON</h1>
      <article>
        <p>Дані в файлі представлені у вигляді об'єкту:</p>
        <p class="data-text">
            {<br>
          &nbsp;&nbsp;"lastUpdate": 1451286316468,<br>
          &nbsp;&nbsp;"r61": {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;    "oldAreaName": "Амур-Нижньодніпровський",<br>
          &nbsp;&nbsp;&nbsp;&nbsp;    "newAreaName": "Амур-Нижньодніпровський",<br>
          &nbsp;&nbsp;&nbsp;&nbsp;    "objects": [<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            "type": "street", <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            "newType": "avenue", <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            "oldName": "Баглія",<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            "newName": "Брацлавська",<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            "restored": true,<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            "link": {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                "href": "https://uk.wikipedia.org/wiki/%D0%91%D1%80%D0%B0%D1%86%D0%BB%D0%B0%D0%B2",<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                "type": 2<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            }<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        },<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        ...<br>
          &nbsp;&nbsp;&nbsp;&nbsp;    ]<br>
          &nbsp;&nbsp;},<br>
          &nbsp;&nbsp;"r62": {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;        ...<br>
          &nbsp;&nbsp;},<br>
          &nbsp;&nbsp;...<br>
          &nbsp;&nbsp;"r68": {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;        ...<br>
          &nbsp;&nbsp;}<br>
      } </p>
                      <p>Поля районів представлені ключами виду r61, r62, ..., r68 - таким чином кодуються райони в державних статистичних реєстрах виконавчої влади. Нумерація алфавітна, це означає, що 61 - це АНД район, 62 - Бабушкінський, 68 - Самарський.
       Однак у зв'язку зі зміною назв районів змінився також їх алфавітний порядок. Але!
       <strong>Я більш чим впевнений що в держустановах ці коди змінювати не будуть!</strong>
       Скоріш за все, нумерація зашиться старою, будуть змінені тільки назви.  Таким чином я залишаю нумерацію полів для сумісності даних с базами держустанов.</p>
       <p>Також в корені об'єкту є поле <span class="data-text">lastUpdate</span> яке містить тимчасову мітку дати останнього оновлення файлу даних (ціле число).</p>
      <p>
      Кожен район - це об'єкт з обов'язковими полями:<span class="data-text">oldAreaName</span> - стара назва району,
      <span class="data-text">newAreaName</span> - нова назва району,
      <span class="data-text">objects</span> - масив географічних об'єктів що зазнали перейменування.</p>
      <p>
      Кожен об'єкт перейменування має обов'язкові поля:
        <span class="data-text">type</span> - тип об'єкту (перелік є нижче),
        <span class="data-text">oldName</span> - стара назва об'єкту,
        <span class="data-text">newName</span> - нову назву об'єкта, а також набір обов'язкових полів, таких як
        <span class="data-text">newType</span>, <span class="data-text">restored</span>, <span class="data-text">link</span>.</p>
      <p>Типи об'єктів перейменування вживаються у такому значенні:<br>
        <span class="data-text">street</span> - вулиця<br>
        <span class="data-text">lane</span> - провулок<br>
        <span class="data-text">avenue</span> - проспект<br>
        <span class="data-text">impasse</span> - тупик<br>
        <span class="data-text">square</span> - площа<br>
        <span class="data-text">embankment</span> - набережна<br>
        <span class="data-text">park</span> - парк, сквер<br>
        <span class="data-text">slope</span> - узвіз<br>
        <span class="data-text">area</span> - житломасив<br>
        <span class="data-text">lake</span> - затока<br>
        <span class="data-text">island</span> - острів<br>
        <span class="data-text">station</span> - станція<br>
    </p>
    <p>Поле <span class="data-text">newType</span> описує новий тип об'єкту в разі якщо при перейменуванні також був змінений статус об'єкта (наприклад, якщо вулиця оголошена проспектом).</p>
    <p>Поле <span class="data-text">restored</span> з встановленим значенням <span class="data-text">true</span> вказує на повернення об'єкту історичної назви.</p>
    <p>Поле <span class="data-text">link</span> описує посилання на суб'єкта перейменування поточного об'єкта (інакше кажучи, в честь кого або чого зроблено перейменування конкретної вулиці чи місця). Це поле, в свою чергу, має два обов'язкових поля: <span class="data-text">href</span> - посилання на джерело з інформацією про суб'єкта і <span class="data-text">type</span> - тип суб'єкта, це ціле число, значення якого відповідає таким варіантам:<br>
        <span class="data-text">0</span> - конкретна особа<br>
        <span class="data-text">1</span> - деяка історична подія<br>
        <span class="data-text">2</span> - географічний об'єкт<br>
        <span class="data-text">3</span> - деяка організація або співтовариство, наприклад - сім'я<br>
    </p>
    <p>Приймаються пропозиції щодо додавання іншіх полей та даних. Приєднуйтесь до розробки довідника на сторінці - <a href="#/proproekt">Про проект</a></p>
    <p>Пряме посилання на файл з даними в форматі JSON: <a href="/rename.json">завантажити...</a></p>
  </article>
  </div>
</template>

<script>
export default {
  name: 'APIDescription'
}
</script>

<style scoped lang="scss">
  .content {
    padding: 16px;
  }
  article {
    margin-top: 24px;
  }
  .data-text {
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    line-height: 12px;
    background-color: #eee;
    color: #000;
  }
</style>
