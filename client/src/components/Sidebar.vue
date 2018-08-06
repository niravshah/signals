<template>

  <div class="o-page__sidebar js-page-sidebar"
       :class="{'is-minimized':isMinimized}">
    <div class="c-sidebar" :class="{'is-minimized':isMinimized}">
      <a class="c-sidebar__brand" href="#">
        <img class="c-sidebar__brand-img" src="/static/img/logo2.png" alt="Logo"> Signals
      </a>
      <ul class="c-sidebar__list">
        <li class="c-sidebar__item">
          <router-link class="c-sidebar__link" to="/">
            <span class="c-sidebar__icon u-mr-xsmall">
                                <i class="fa fa-home"></i>
                            </span> Dashboard
          </router-link>
        </li>
        <li v-if="isAdmin()" class="c-sidebar__item">
          <router-link class="c-sidebar__link" :to="{'name':'Upload'}">
            <span class="c-sidebar__icon u-mr-xsmall">
                                <i class="fa fa-upload"></i>
                            </span> Data
          </router-link>
        </li>
        <li v-if="isAdmin()" class="c-sidebar__item">
          <router-link class="c-sidebar__link" :to="{'name':'Users'}">
            <span class="c-sidebar__icon u-mr-xsmall">
                                <i class="fa fa-users"></i>
                            </span> Users
          </router-link>
        </li>

      </ul>
    </div>
  </div>


</template>
<script>
  export default {
    name: 'Sidebar',
    props: ['mini'],
    computed: {
      isMinimized: function () {
        return this.$store.state.sidebarMinified == true;
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.mini)
    },
    methods: {},
    watch: {
      $route(to, from){
        if (typeof to.meta.mini !== "undefined") {
          this.$store.commit('sidebar', to.meta.mini)
        }
      }
    }
  }
</script>
<style>
</style>
