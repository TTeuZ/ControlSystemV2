<template>
  <v-app class="ma-0 pa-0">
    <div
      :class="{ navBarExpanded: $store.state.drawer == true ? true : false }"
      class="nav-bar"
    >
      <div>
        <div class="nav-header">
          <v-app-bar-nav-icon
            class="navigation"
            @click="$store.state.drawer = !$store.state.drawer"
          />
          <span v-if="this.$store.state.drawer" class="text">Controle</span>
        </div>
        <div class="links">
          <v-list dense style="width: 100%">
            <div v-for="(drw, d) in drwItens" :key="drw">
              <v-list-item class="pl-1 pr-0">
                <v-list-item-content>
                  <v-list-item-title class="item-drawer" @click="selected = d">
                    <nuxt-link
                      :class="{
                        navItemPermanent: selected === d ? true : false
                      }"
                      class="link-text"
                      :to="drw.link"
                    >
                      <v-icon
                        :class="{
                          iconPermanent: selected === d ? true : false
                        }"
                        class="icon"
                      >
                        {{ drw.icon }}
                      </v-icon>
                      <span v-if="$store.state.drawer">
                        {{ drw.label }}
                      </span>
                    </nuxt-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
            <v-list-item v-if="isAdmin" class="pl-1 pr-0">
              <v-list-item-content>
                <v-list-item-title class="item-drawer" @click="selected = 10">
                  <nuxt-link
                    :class="{
                      navItemPermanent: selected === 10 ? true : false
                    }"
                    class="link-text"
                    to="/registrar"
                  >
                    <v-icon
                      :class="{
                        iconPermanent: selected === 10 ? true : false
                      }"
                      class="icon"
                    >
                      mdi-account-box-outline
                    </v-icon>
                    <span v-if="$store.state.drawer">Registrar</span>
                  </nuxt-link>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </div>
      <v-btn
        v-if="$store.state.drawer"
        class="exit"
        text
        color="#ec6f3d"
        label="login"
        @click="exit()"
      >
        sair
      </v-btn>
    </div>
    <nuxt class="nuxt" />
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      selected: '',
      isAdmin: false,
      drwItens: [
        {
          label: 'Home',
          icon: 'mdi-home-outline',
          link: '/'
        },
        {
          label: 'Estoque',
          icon: 'mdi-table',
          link: '/estoque'
        },
        {
          label: 'Fornecedores',
          icon: 'mdi-account-multiple-outline',
          link: '/fornecedores'
        },
        {
          label: 'Manutenção',
          icon: 'mdi-plus-outline',
          link: '/manutencao'
        }
      ]
    }
  },
  beforeCreate() {
    // Middleware de verificação de esta logado
    const user = this.$store.state.user
    if (!user) {
      this.$router.push('/login')
    }
  },
  mounted() {
    if (this.$store.state.user.email === 'admin@admin.com') this.isAdmin = true
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
  transition: 1s;
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
  position: fixed;
}
.nav-header {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.link-text {
  text-decoration: none;
  font-size: 16px;
  font-family: 'Exo Regular';
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 15px;
}
.navItemPermanent {
  color: orange;
}
.icon {
  font-size: 2em;
  color: black;
}
.iconPermanent {
  color: orange;
  transition: 0s;
}
.links {
  display: flex;
  justify-content: flex-start;
  margin-top: 50px;
}
.exit {
  margin-bottom: 30px;
}
</style>
