<template>
  <div>
    <v-dialog v-model="show" max-width="1600px" no-click-animation persistent>
      <v-card class="modal-card">
        <div class="modal-title-section">
          <span class="modal-title">
            TODOS OS ITENS
          </span>
          <div class="serch-section">
            <v-text-field
              v-model="searchItem"
              append-icon="mdi-magnify"
              label="Pesquisar (Item)"
              single-line
              hide-details
              @keyup="filterItens()"
            ></v-text-field>
          </div>
          <div
            v-for="item in fornItems"
            :key="item"
            class="fornecedor-itens-all"
            @click="openOb(item)"
          >
            <span class="text"> Item: {{ item.nome }} </span>
            <span class="text"> Quantidade: {{ item.quantidade }} </span>
            <span class="text"> Valor: {{ item.valor }} </span>
            <span class="text"> Data {{ item.data }} </span>
          </div>
        </div>
        <div class="btn-section">
          <v-btn color="#43A047" text @click="(show = false), (showOb = false)">
            sair
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <ObDialog :ob-item="obItem" :ob-dialog="showOb" />
  </div>
</template>

<script>
import ObDialog from '../fornecedores/ObDialog'
export default {
  components: {
    ObDialog
  },
  props: {
    fornItems: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      obItem: {},
      showOb: false,
      searchItem: '',
      fornItemsUti: this.fornItems
    }
  },
  methods: {
    openOb(item) {
      this.obItem = item
      this.showOb = true
    },
    filterItens() {
      this.showOb = false
      for(const item in this.fornItems) {
        if (!this.fornItemsUti[item].nome.toLowerCase().includes(this.searchItem.toLowerCase())) {
          console.log(this.fornItemsUti[item].nome.toLowerCase())
          console.log(item)
          delete this.fornItemsUti[item]
        }
      }
      return this.fornItemsUti
    },
  }
}
</script>

<style>
.text {
  font-family: 'Exo Regular';
}
.serch-section {
  margin-bottom: 35px;
  width: 500px;
  margin-right: 20px;
  align-self: flex-end;
}
.modal-title-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.modal-title {
  font-family: 'Exo Regular';
  font-size: 30px;
  margin-top: 15px;
}
.btn-section {
  padding-bottom: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.fornecedor-itens-all {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}
</style>
