<template>
  <v-container fluid>
    <v-row class="pa-0 ma-0">
      <v-col cols="12">
        <span class="text">Formulario de cadastro</span>
      </v-col>
      <v-col class="form-card" cols="5">
        <v-row class="pa-0 ma-0">
          <v-col cols="12">
            <v-text-field v-model="name" label="Nome" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="email" label="Email" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="password" label="Senha" />
          </v-col>
        </v-row>
        <v-btn text @click="signUp()"> Cadastrar </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp() {
      this.$store
        .dispatch('signUp', {
          email: this.email,
          password: this.password
        })
        .then((result) => {
          result.user.updateProfile({
            displayName: this.name
          })
          this.clearForm()
          alert('Usuário criado com sucesso')
        })
        .catch((err) => {
          alert(err.message)
        })
    },
    clearForm() {
      ;(this.email = ''), (this.password = ''), (this.name = '')
    }
  }
}
</script>

<style scoped>
.text {
  font-family: 'Exo Regular';
  font-size: 30px;
}
.form-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-top: 100px;
}
</style>
