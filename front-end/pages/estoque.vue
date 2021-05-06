<template>
  <v-row class="pa-0 ma-0">
    <v-col cols="12" class="header pb-0">
      <span class="header-title">ESTOQUE</span>
      <v-divider color="black"></v-divider>
    </v-col>
    <v-col class="pt-0" cols="12">
      <v-row class="ma-0 pa-0">
        <v-col class="buttons" cols="6">
          <NewItem />
          <Log />
          <v-switch label="Edição total?" :disabled="disabled" flat @click="isFullEdit = !isFullEdit" />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="estoque-tables">
      <v-data-table
        id="data-table"
        :headers="headers"
        :items="estoque"
        :search="search"
      >
        <template v-slot:item.action="{ item }">
          <div class="actions">
            <UpdateItem :full-edit="isFullEdit" :item="item" />
            <v-icon medium color="error" @click="delItem(item)">
              mdi-delete
            </v-icon>
            <v-menu right close-on-click>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  depressed
                  height="25"
                  width="25"
                  fab
                  :class="item.color"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-list>
                <v-list-item v-for="color in colors" :key="color">
                  <v-list-item-title @click="updatePriorit(color, item.id)">{{
                    color
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase'
import NewItem from '../components/estoqueComponents/NewItem'
import Log from '../components/estoqueComponents/Log'
import UpdateItem from '../components/estoqueComponents/UpdateItem'
import { database } from '~/plugins/firebase.js'

export default {
  components: {
    NewItem,
    Log,
    UpdateItem
  },
  data() {
    return {
      estoqueItens: {},
      estoque: [],
      search: '',
      headers: [
        { text: 'Nome', value: 'name' },
        { text: 'Quantidade', value: 'quantidade' },
        { text: 'Tipo', value: 'tipo' },
        { text: '', value: 'action', align: 'right', sortable: false }
      ],
      disabled: true,
      isFullEdit: false,
      colors: ['Verde', 'Amarelo', 'Vermelho']
    }
  },
  watch: {
    estoqueItens(itens) {
      this.estoque = []
      for (const i in itens) {
        const item = {}
        item.id = i
        item.name = itens[i].name
        item.quantidade = itens[i].quantidade
        item.quantidade_min = itens[i].quantidade_min
        item.tipo = itens[i].tipo
        item.color = itens[i].color
        item.createdAt = itens[i].createdAt
        item.userCreated = itens[i].userCreated
        this.estoque.push(item)
      }
    }
  },
  mounted() {
    const data = database.child('estoque-item')
    data.on('value', (snap) => (this.estoqueItens = snap.val()))

    if(this.$store.state.user.displayName === 'João' || this.$store.state.user.displayName === 'Paulo Mateus') {
      this.disabled = false
    }
  },
  methods: {
    delItem(item) {
      if(this.$store.state.user.displayName === 'João' || this.$store.state.user.displayName === 'Paulo Mateus') {
        const ok = window.confirm('Voce realmente deseja deletar este item?')
        if (ok) database.child('estoque-item/' + item.id).remove()
      } else {
        window.alert('Vocẽ não tem permissão de excluir um Item')
      }
    },
    updatePriorit(color, id) {
      const item = database.child('estoque-item/' + id + '/color')
      item.set(color)
    }
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
.buttons {
  display: flex;
  flex-flow: row;
  align-items: center;
}
.actions {
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  align-items: center;
}
.Verde {
  background-color: lightgreen !important;
}
.Vermelho {
  background-color: rgb(235, 57, 57) !important;
}
.Amarelo {
  background-color: rgb(240, 240, 50) !important;
}
</style>
