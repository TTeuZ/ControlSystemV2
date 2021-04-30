<template>
  <v-container fluid> </v-container>
</template>

<script>
import firebase from 'firebase'
import { database } from '~/plugins/firebase.js'
export default {
  // middleware: 'auth'
}
</script>

<style scoped>
.positions {
  position: absolute;
  left: 60px !important;
  transition: 1s;
  width: 95%;
}
.positionsExpanded {
  left: 240px !important;
  width: 86% !important;
  transition: 1s;
}
</style>
