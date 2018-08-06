<template>
  <div class="container-fluid">
    <div class="container u-mt-medium">
      <div class="row">
        <div class="col-md-8  u-mb-medium">
          <h4 class="u-mb-medium">Ticker Details</h4>
          <p>Ticker : {{ticker}}</p>
          <p>Exchange: {{eName}} ({{exchange}})</p>
          <p>Country: {{country}}</p>
          <p>Region: {{region}}</p>
          <p>MIC Code: {{micCode}}</p>
        </div>
        <div class="col-md-4  u-mb-medium">
          <h4 class="u-mb-medium">Change Flags</h4>
          <line-chart xtitle="Reports Analysed" ytitle="Flags" :colors="['#df1c26']" :min="0" :max="10" :data="flags"/>
        </div>
      </div>
    </div>
    <div class="u-mt-small u-mt-medium">
      <h4 class="u-mb-medium">Key Change Indicators</h4>
      <div class="row u-mb-medium">
        <div class="col-md-8  u-mb-medium">
          <label class="c-field__label">Filter Indicator</label>
          <v-select multiple id="input1" v-model="filter" :options="filterOptions"></v-select>
        </div>
        <div class="col-md-2 u-mb-medium">
          <a v-on:click.prevent="filterRecords" class="abs-bottom c-btn c-btn--prudential c-btn--fullwidth"
             style="width: 80%"
             href="#">Plot Filtered</a>
        </div>
        <div class="col-md-2 u-mb-medium">
          <a v-on:click.prevent="plotAllGraphs" class="abs-bottom c-btn c-btn--prudential c-btn--fullwidth"
             style="width: 80%"
             href="#">Plot All</a>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <line-chart title="Reports Analysed" ytitle="Indicator" :min="cmin" :max="cmax" :data="cdata"/>
        </div>
      </div>
    </div>
    <div class="row u-mt-small u-mt-medium u-mb-medium">
      <div class="col-md-12">
        <h5 class="u-mb-small">Reports Analysed</h5>
        <vue-table :rows="models" :columns="columns" :tableActions="tableActions"></vue-table>
      </div>
    </div>
  </div>
</template>
<script>
  import DataService from "@/services/DataService"
  import VueTable from './_partials/_table'
  export default {
    components: {VueTable},
    name: 'Detail',
    data: function () {
      return {
        models: [],
        ticker: '',
        label: '',
        exchange: '',
        eName: '',
        country: '',
        region: '',
        micCode: '',
        details: [],
        cdata: [],
        flags: [],
        sdata: {},
        cmin: 0,
        cmax: 500,
        filter: '',
        filterOptions: ["prudentialtopnegativeindex", "he_negativeindex", "prudentialnegativeindex", "lmuncertaintyindex", "lmnegativeindex", "sadnessindex"],
        columns: [],
        tableActions: []
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Details: " + this.$route.params.ticker);
    },
    created: function () {
      this.getVueGoodTableSchema();
      this.getDetails(this.$route.params.ticker)
    },
    methods: {
      getVueGoodTableSchema: async function () {
        const response = await DataService.getSchema();
        this.columns = response.data;
      },
      getDetails: async function (ticker) {
        const response = await DataService.getDataForTicker(ticker);
        this.cmin = response.data.min;
        this.cmax = response.data.max;
        this.sdata = response.data;
        this.flags = response.data.flags;
        this.ticker = response.data.ticker;
        this.label = response.data.label;
        this.exchange = response.data.exchange;
        this.eName = response.data.exchange_name;
        this.models = response.data.models;
        this.country = response.data.country;
        this.region = response.data.region;
        this.micCode = response.data.mic_code;
        this.plotAllGraphs();
      },
      plotAllGraphs: function () {
        this.plotGraphs(['prudentialtopnegativeindex', 'he_negativeindex', 'prudentialnegativeindex', 'lmuncertaintyindex', 'lmnegativeindex', 'sadnessindex']);
      },
      filterRecords: function () {
        this.plotGraphs(this.filter);
      },
      plotGraphs: function (metrics) {
        this.cdata = [];
        var _this = this;
        metrics.forEach(function (mt) {
          _this.cdata.push({name: mt, data: _this.sdata[mt]});
        })
      }
    }
  }
</script>
<style></style>
