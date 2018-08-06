<template>
  <div class="login-container">
    <div class="u-mt-xlarge o-page__card o-page__card--horizontal">
      <div class="c-card c-login-horizontal">
        <div class="u-p-medium">
          <img src="/static/img/prudential-logo-2.png" alt="Prudential Signals">
        </div>

        <div class="c-login__content-wrapper">
          <header class="c-login__header">
            <a class="c-login__icon c-login__icon--rounded c-login__icon--left" href="#!">
              <img src="/static/img/logo.png" alt="Dashboard's Logo">
            </a>

            <h2 class="c-login__title">Sign In</h2>
          </header>

          <form class="c-login__content">
            <div class="c-field u-mb-small">
              <label class="c-field__label" for="input1">Email Address</label>
              <input v-model="user.email" class="c-input" type="email" id="input1" placeholder="user@signals.com">
            </div>

            <div class="c-field u-mb-small">
              <label class="c-field__label" for="input2">Password</label>
              <input v-model="user.password" class="c-input" type="password" id="input2" placeholder="Password">
            </div>

            <button v-on:click.prevent="login" class="c-btn c-btn--prudential c-btn--fullwidth" type="submit">Sign in
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import LoginService from '@/services/LoginService'
  import ToastedService from "@/services/ToastedService"

  export default {
    name: 'Login',
    data: function () {
      return {
        user: {}
      }
    },
    methods: {
      login: function () {
        LoginService.login(this.user).then(resp => {
          this.$store.commit('setLoggedIn');
          this.$ls.set('jwt', resp.data.token);
          this.$router.push(this.$route.query.redirect || '/')
        }).catch(err => {
          if (err.response) {
            ToastedService.showError(err.response.data.message, 4000)
          } else {
            ToastedService.showError(err.message, 4000)
          }
        });
      }
    }
  }
</script>
<style>
  .login-container {
    height: 100vh;
    background-image: url("/static/img/prudential-1.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 60px;
  }
</style>
