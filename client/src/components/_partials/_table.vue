<template>
  <vue-good-table
    @on-selected-rows-change="selectionChanged"
    :columns="columns"
    :rows="rows"
    :search-options="{ enabled: true }"
    :pagination-options="{enabled: true, perPage: 5}"
    :select-options="{ enabled: select}"
    @on-row-click="getRowDetail">
    <div slot="selected-row-actions">
      <button v-for="action in tableActions" @click="emitEvent(action.event,selRows)"
              class="c-btn c-btn--prudential u-mr-small">
        {{action.name}}
      </button>
    </div>
    <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'flags' && props.row.flags > 3">
                <span style="font-weight: bold; color: red;">{{props.row.flags}}</span>
              </span>
      <span v-else-if="props.column.field=='report_date'">
                {{props.row.report_date | moment("YYYY-MM-DD")}}
              </span>
      <span v-else>
                {{props.formattedRow[props.column.field]}}
              </span>
    </template>
  </vue-good-table>
</template>
<script>
  export default {
    name: 'VueTable',
    props: ['rows', 'columns', 'select', 'tableActions'],
    data: function () {
      return {
        selRows: []
      }
    },
    methods: {
      selectionChanged: function (params) {
        this.selRows = params.selectedRows;
      },
      getRowDetail: function (params) {
        this.$emit('getRowDetails', params)
      },
      emitEvent: function (event, rows) {
        this.$emit(event, rows)
      }
    }
  }
</script>
