<template>
  <v-container> </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  beforeCreate() {
    const user = this.$store.state.user
    if (!user) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped></style>
