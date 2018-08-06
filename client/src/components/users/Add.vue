<template>
  <div class="container-fluid">


    <div v-if="serverMessage" class="row u-mb-medium">
      <div class="col-md-8">
        <div class="well error-well">
          <p>{{serverMessage}}</p>
        </div>
      </div>
    </div>

    <div class="row u-mb-medium">
      <div class="col-sm-6 col-md-3 u-mb-small">
        <div class="c-field">
          <label class="c-field__label" for="username">Name</label>
          <input v-validate="'required'" v-model="user.name" class="c-input" type="text" name="username" id="username"
                 placeholder="Name">
          <small v-show="errors.has('username')" class="c-field__message u-color-danger">
            <i class="fa fa-times-circle"></i>{{ errors.first('username') }}
          </small>
        </div>
      </div>
      <div class="col-sm-6 col-md-3 u-mb-small">
        <div class="c-field">
          <label class="c-field__label" for="email">Email</label>
          <input v-validate="'required'" v-model="user.email" class="c-input" type="email" name="email" id="email"
                 placeholder="Email">
          <small v-show="errors.has('email')" class="c-field__message u-color-danger">
            <i class="fa fa-times-circle"></i>{{ errors.first('email') }}
          </small>
        </div>
      </div>
      <div class="col-sm-6 col-md-3 u-mb-small">
        <div class="c-field">
          <label class="c-field__label" for="password">Password</label>
          <input v-validate="'required'" v-model="user.password" class="c-input" type="text" name="password"
                 id="password"
                 placeholder="Password">
          <small v-show="errors.has('password')" class="c-field__message u-color-danger">
            <i class="fa fa-times-circle"></i>{{ errors.first('password') }}
          </small>
        </div>
      </div>

    </div>
    <div class="row u-mb-medium">
      <div class="col-sm-6 col-md-3 u-mb-small">
        <div class="c-choice c-choice--checkbox">
          <input class="c-choice__input" v-model="user.admin" id="checkbox2" name="checkboxes" type="checkbox">
          <label class="c-choice__label" for="checkbox2">Admin User</label>
        </div>
      </div>
    </div>
    <div class="row u-mb-medium">
      <div class="col-sm-6 col-md-3 u-mb-small">
        <a v-on:click.prevent="saveUser" class="c-btn c-btn--prudential c-btn--small" href="#">Save User</a>
      </div>
    </div>
  </div>
</template>
<script>
  import UserService from "@/services/UserService"
  import ToastedService from "@/services/ToastedService"
  export default {
    name: 'AddUser',
    data: function () {
      return {

        user: {admin: false},
        serverMessage: ''
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Add User");
    },
    methods: {
      saveUser: function () {
        this.$validator.validateAll().then(result => {
          if (!result) {
            ToastedService.showError("Form not valid", 4000)
          } else {
            UserService.create(this.user).then(res => {
              ToastedService.showInfo(res.data.message, 4000)
              this.$router.push({name: 'Users'})
            }).catch(err => {
              if (err.response) {
                ToastedService.showError(err.response.data.message, 4000)
              } else {
                ToastedService.showError(err.message, 4000)
              }

            })
          }
        })
      }
    }
  }
</script>
<style></style>
