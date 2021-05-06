<template>
  <v-row class="pa-0 ma-0">
    <v-col cols="12" class="header pb-0">
      <span class="header-title">FORNECEDORES</span>
      <v-divider color="black"></v-divider>
    </v-col>
    <v-col class="pt-0" cols="12">
      <Fornecedores />
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase'
import Fornecedores from '../components/fornecedores/Fornecedor'
export default {
  components: {
    Fornecedores
  }
}
</script>

<style scoped>
.header {
  padding: 20px;
  margin-bottom: 0px;
}
.header-title {
  font-family: 'Exo Regular';
  font-size: 40px;
}
</style>
