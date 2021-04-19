<template>
  <v-row
    :class="{ positionsExpanded: $store.state.drawer == true ? true : false }"
    class="pa-0 ma-0 positions"
  >
    <v-col cols="12" class="header">
      <v-row class="ma-0 pa-0">
        <v-col class="buttons" cols="6">
          <NewItem />
          <Log />
          <v-switch @click="changeEdit()" label="Edição total?" />
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
            <UpdateItem ref="updateItem" :item="item" />
            <v-icon medium color="error" @click="deletaItem(item)">
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
      isFullEdit: false
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
        this.estoque.push(item)
      }
    }
  },
  mounted() {
    const data = database.child('estoque-item')
    data.on('value', (snap) => (this.estoqueItens = snap.val()))
  },
  methods: {
    changeEdit() {
      this.$refs.updateItem.fullEdit = !this.$refs.updateItem.fullEdit
    }
  }
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
</style>
