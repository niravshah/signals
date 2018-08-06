import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Details from '@/components/Detail'
import Upload from '@/components/Upload'
import Users from '@/components/users/Users'
import AddUser from '@/components/users/Add'
import Login from '@/components/Login'
import Logout from '@/components/Logout'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'upload',
          name: 'Upload',
          component: Upload,
          meta: {requiresAuth: true, mini: true, admin:true}
        },
        {
          path: 'users',
          name: 'Users',
          component: Users,
          meta: {requiresAuth: true, mini: true, admin:true}
        },
        {
          path: 'users/add',
          name: 'AddUser',
          component: AddUser,
          meta: {requiresAuth: true, mini: true, admin:true}
        },
        {
          path: 'details/:ticker',
          name: 'Details',
          component: Details,
          meta: {requiresAuth: true, mini: true}
        },
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
          meta: {requiresAuth: true, mini: true}
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (Vue.$jwt.hasToken()) {

      var token = Vue.$jwt.decode()

      var current_time = new Date().getTime() / 1000
      if (current_time > token.exp) {
        next({path: '/login', query: {redirect: to.fullPath}})
      } else {
        if (to.meta.admin) {
          if (token.data.admin) {
            next()
          } else {
            Vue.toasted.show('You don\'t have sufficient permission for this action!', {
              icon: 'error',
              type: 'error',
              duration: 3000
            })
            next({path: from.fullPath})
          }
        } else {
          next()
        }
      }

    } else {
      next({path: '/login', query: {redirect: to.fullPath}})
    }

  } else {
    next()
  }
})

export default router
