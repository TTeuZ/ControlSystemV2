<template>
  <v-app class="ma-0 pa-0">
    <div
      :class="{ navBarExpanded: drawer == true ? true : false }"
      class="nav-bar"
    >
      <div class="nav-header">
        <v-app-bar-nav-icon class="navigation" @click="drawer = !drawer" />
        <span v-if="drawer" class="text">Controle</span>
      </div>
      <v-btn
        v-if="drawer"
        class="exit"
        text
        color="#ec6f3d"
        label="login"
        @click="exit()"
      >
        sair
      </v-btn>
    </div>
    <nuxt
      :class="{ nuxtExpanded: drawer == true ? true : false }"
      class="nuxt"
    />
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    exit() {
      this.$store
        .dispatch('signOut')
        .then(() => {
          this.$router.push('/login')
          this.drawer = false
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }
}
</script>

<style scoped>
.nuxt {
  position: absolute;
  margin-left: 30px;
  transition: 1s;
}
.nuxtExpanded {
  margin-left: 210px !important;
  transition: 1s;
}
.nav-header {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-bar {
  height: 100%;
  width: 45px;
  border-right: #777 1px solid;
  -webkit-box-shadow: 9px 0px 10px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 9px 0px 10px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  transition: 1s;
}
.navBarExpanded {
  width: 225px !important;
  transition: 1s;
}
.navigation {
  justify-content: flex-end;
  padding-right: 2px;
}
.text {
  font-size: 16px;
  font-family: 'Exo Regular';
  margin-right: 15px;
  transition: 1s;
  transition-timing-function: ease-in-out;
  transition-property: all;
}
.exit {
  margin-bottom: 30px;
}
</style>
