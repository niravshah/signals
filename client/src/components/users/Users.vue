<template>
  <div class="container-fluid">
    <div class="row u-mb-medium">
      <div align="right" class="col-md-12">
        <router-link :to="{name:'AddUser'}"
                     class="c-btn c-btn--small c-btn--prudential u-mr-small">
          Add User
        </router-link>
      </div>
    </div>

    <div class="row u-mb-medium">
      <div class="col-md-12">
        <vue-table @getRowDetails="getRowDetail" :rows="rows" :columns="columns" :select=true
                   :tableActions="tableActions" @deleteuser="deleteUser"></vue-table>
      </div>
    </div>
  </div>
</template>
<script>
  import DataService from "@/services/DataService"
  import UserService from "@/services/UserService"
  import VueTable from '../_partials/_table'
  import ToastedService from "@/services/ToastedService"
  export default {
    components: {VueTable},
    name: 'Users',
    data: function () {
      return {
        columns: [],
        rows: [],
        tableActions: [{name: 'Delete User', event: 'deleteuser'}]
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "User Management");
    },
    created: function () {
      this.getVueGoodTableSchema()
      this.getData()
    },
    methods: {
      getVueGoodTableSchema: async function () {
        const response = await DataService.getSchema('users');
        this.columns = response.data;
      },
      getData: async function () {
        var response = await UserService.getData();
        this.rows = response.data;
      },
      getRowDetail: async function () {
      },
      deleteUser: async function (rows) {
        var ids = []
        rows.forEach(function (row) {
          ids.push(row.shortid)
        })
        UserService.delete(ids).then(resp => {
          ToastedService.showInfo(resp.data.message, 4000)
          this.getData()
        }).catch(err => {
          if (err.response) {
            ToastedService.showError(err.response.data.message, 4000)
          } else {
            ToastedService.showError(err.message, 4000)
          }
        })
      }
    }
  }
</script>
<style></style>
