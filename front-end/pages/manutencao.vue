<template>
  <v-row
    :class="{ positionsExpanded: $store.state.drawer == true ? true : false }"
    class="pa-0 ma-0 positions"
  ></v-row>
</template>

<script>
import firebase from 'firebase'
export default {}
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
