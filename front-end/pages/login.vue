<template>
  <v-container fluid>
      <div class="login-section">
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="Senha" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" v-model="senha" @click:append="show = !show"></v-text-field>
          <v-btn label="login"></v-btn>
      </div>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    }
}
</script>

<style scoped>

</style>