<template>
  <v-container class="total pa-0 ma-0" fluid>
    <v-row class="total ma-0 pa-0">
      <v-col md="6" class="preenchimento">
        <span class="text">
          Bem vindo ao PLK Controle
        </span>
      </v-col>
      <v-col md="6" class="login-section">
        <div class="login-table">
          <v-text-field v-model="email" label="Email" suffix='@plkdobrasil.com.br' />
          <v-text-field
            v-model="password"
            label="Senha"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
          />
          <div class="buttons">
            <v-btn text color="#ec6f3d" label="login" @click="login()">
              Login
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      show: false,
      email: '',
      password: ''
    }
  },
  mounted() {
    window.addEventListener('keydown', this.loginWithEnter)
  },
  destroyed() {
    window.removeEventListener('keydown', this.loginWithEnter)
  },
  methods: {
    loginWithEnter(e) {
      if (e.code === 'Enter') {
        this.login()
      }
    },
    login() {
      this.$store
        .dispatch('signInWithEmail', {
          email: this.email + '@plkdobrasil.com.br',
          password: this.password
        })
        .then(() => {
          ;(this.email = ''), (this.password = '')
          this.$router.push('/')
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  },
  layout: 'login'
}
</script>

<style scoped>
.total {
  height: 100%;
}
.preenchimento {
  background-color: #ec6f3d;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  font-family: 'Exo Regular';
  font-size: 200%;
}
.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-table {
  height: 250px;
  width: 450px;
  -webkit-box-shadow: 0px 0px 17px -3px rgba(0, 0, 0, 0.63);
  box-shadow: 0px 0px 17px -3px rgba(0, 0, 0, 0.63);
  padding: 25px;
  border-radius: 25px;
}
.buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
@media screen and (max-width: 960px) {
  .total {
    display: flex;
    flex-flow: column;
  }
}
</style>
