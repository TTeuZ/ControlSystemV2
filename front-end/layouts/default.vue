<template>
  <v-app class="ma-0 pa-0">
    <v-card>
      <v-navigation-drawer class="navi" :mini-variant.sync="mini" app permanent>
        <div>
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img :src="user.photoURL"></v-img>
              </v-list-item-avatar>
              <v-spacer />
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{ user.displayName }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list nav dense>
            <v-list-item v-for="item in drwItens" :key="item" link>
              <nuxt-link class="links" :to="item.link">
                <v-list-item-icon>
                  <v-icon class="icon">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="text">{{
                  item.label
                }}</v-list-item-title>
              </nuxt-link>
            </v-list-item>
            <v-list-item v-if="isAdmin">
              <v-list-item-content>
                <v-list-item-title class="item-drawer">
                  <nuxt-link class="links" to="/registrar">
                    <v-list-item-icon>
                      <v-icon class="icon">mdi-account-box-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="text"
                      >Registrar</v-list-item-title
                    >
                  </nuxt-link>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div class="btn">
          <v-btn
            class="exit"
            text
            color="#ec6f3d"
            label="login"
            @click="exit()"
          >
            sair
          </v-btn>
        </div>
      </v-navigation-drawer>
    </v-card>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      selected: '',
      isAdmin: false,
      drawer: false,
      mini: true,
      user: {},
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
    this.user = this.$store.state.user
    console.log(this.user)
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
.navi >>> .v-navigation-drawer__content {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.btn {
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
}
.text {
  font-size: 14px !important;
  font-family: 'Exo Regular';
}
.navItemPermanent {
  color: orange;
}
.icon {
  font-size: 1.8em;
  color: black;
}
.iconPermanent {
  color: orange;
  transition: 0s;
}
.links {
  display: flex;
  flex-flow: row;
  text-decoration: none;
  color: black;
  font-family: 'Exo Regular';
}
</style>
