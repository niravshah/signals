<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .c-btn--prudential{
    background: #df1c26;
    border-color: #df1c26;
  }
  .abs-bottom {
    position: absolute;
    bottom: 0;
  }

  .vgt-selection-info-row {
    line-height: 4em;
  }

  .vgt-selection-info-row .c-btn {
    line-height: 1;
    font-size: 0.8rem;
    font-weight: 200;
  }

  .vgt-table th {
    font-size: 0.9rem;
    font-weight: 400;
  }

  .vgt-table td {
    font-size: 0.8rem;
    font-weight: 200;
  }

  .well {
    padding: 1em;
    border: solid 2px grey;
    border-radius: 6px;
  }

  .error-well {
    border-color: red;
  }
</style>
