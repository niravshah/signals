<template>
  <div class="container-fluid">
    <div class="u-m-auto">
      <div class="row">
        <div class="col-md-6  u-mb-medium">
          <label class="c-field__label">Search By Ticker</label>
          <v-select id="input1" v-model="tickerFilter" :options="tickerOptions"></v-select>
        </div>
        <div class="col-md-2 u-mb-medium">
          <a v-on:click="filterRecords" class="abs-bottom c-btn c-btn--prudential c-btn--fullwidth" style="width: 80%"
             href="#">Get Reports</a>
        </div>
      </div>
      <div class="row u-mb-medium">
        <div class="col-md-12">
          <h5 class="u-mb-small">Featured Reports</h5>
          <vue-table @getRowDetails="getRowDetail" :rows="featuredRows" :columns="columns"
                     :tableActions="tableActions"></vue-table>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h5 class="u-mb-small">Latest Reports Analysed</h5>
          <vue-table @getRowDetails="getRowDetail" :rows="rows" :columns="columns" :tableActions="tableActions"></vue-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import DataService from "@/services/DataService"
  import VueTable from './_partials/_table'
  export default {
    components: {VueTable},
    name: 'Dashboard',
    data: function () {
      return {
        selRows: [],
        columns: [],
        tickerOptions: [],
        tickerFilter: '',
        rows: [],
        featuredRows: [],
        tableActions: []
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Dashboard");
    },
    created: function () {
      this.getVueGoodTableSchema()
      this.getData();
      this.getFeaturedRows();
      this.getTickerFilter();
    },
    methods: {
      getVueGoodTableSchema: async function () {
        const response = await DataService.getSchema();
        this.columns = response.data;
      },
      getData: async function () {
        const response = await DataService.getData();
        this.rows = response.data
      },
      getFeaturedRows: async function () {
        const response = await DataService.getFeaturedRows();
        this.featuredRows = response.data
      },
      getTickerFilter: async function () {
        const response = await DataService.getTickerFilter();
        this.tickerOptions = response.data.data;
      },
      filterRecords: async function () {
        this.$router.push({name: 'Details', params: {ticker: this.tickerFilter}})
      },
      getRowDetail: async function (params) {
        this.$router.push({name: 'Details', params: {ticker: params.row.ticker}})
      }
    }
  }
</script>
<style></style>
