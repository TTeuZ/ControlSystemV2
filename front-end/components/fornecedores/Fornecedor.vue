<template>
  <div class="panels-section">
    <div class="serch-section">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar (Item)"
        single-line
        hide-details
        @keyup="filterFornecedores()"
      ></v-text-field>
    </div>
    <v-expansion-panels v-model="panel" accordion flat>
      <v-expansion-panel
        v-for="(f, index) in fornecedores"
        :key="f"
        class="expansion-panel"
      >
        <v-expansion-panel-header
          class="expansion-panel"
          @click="getItens(index)"
        >
          <div
            v-if="!(isEdit === index)"
            class="fornecedor-info"
            @click="isEdit = ''"
          >
            <span class="text forn-text"> Nome: {{ f.nome }} </span>
            <span class="text forn-text"> email: {{ f.email }} </span>
            <span class="text forn-text"> Telefone: {{ f.telefone }} </span>
          </div>
          <div v-if="isEdit === index" class="att-form">
            <v-text-field
              v-model="attFornecedorObj.nome"
              :rules="[(v) => !!v || 'Nome Obrigatório']"
              color="cyan darken-2"
              label=" Nome"
              class="inputs"
            ></v-text-field>
            <v-text-field
              v-model="attFornecedorObj.email"
              :rules="[(v) => !!v || 'Email Obrigatório']"
              color="cyan darken-2"
              label=" Email"
              class="inputs"
            ></v-text-field>
            <v-text-field
              v-model="attFornecedorObj.telefone"
              v-maska="'(##) #####-####'"
              :rules="[(v) => !!v || 'Telefone Obrigatório']"
              color="cyan darken-2"
              label=" Telefone"
              class="inputs"
            ></v-text-field>
          </div>
          <div class="edit-icon">
            <v-icon
              v-if="canEdit === index"
              color="primary"
              @click="attFornecedor(index)"
              >mdi-circle-edit-outline</v-icon
            >
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="expansion-panel pa-0">
          <div v-if="show">
            <div
              v-for="(item, i) in fornecedorItems"
              :key="item"
              class="fornecedor-itens-section"
            >
              <div
                v-if="!(isEditItem === i)"
                class="item-info"
                @click="showOb(index, item.id)"
              >
                <span class="text text-name"> Item: {{ item.nome }} </span>
                <span class="text text-quant">
                  Quantidade: {{ item.quantidade }}
                </span>
                <span class="text text-value"> Valor: {{ item.valor }} </span>
                <span class="text text-date"> Data: {{ item.data }} </span>
              </div>
              <div v-if="isEditItem === i" style="width:100%;">
                <div class="att-form">
                  <v-select
                    v-model="attItemObj.nome"
                    :rules="[(v) => !!v || 'Item Obrigatório']"
                    color="cyan darken-2"
                    label=" Item"
                    :items="estoqueItems"
                    class="inputs"
                  ></v-select>
                  <v-text-field
                    v-model="attItemObj.quantidade"
                    v-maska="'#*'"
                    :rules="[(v) => !!v || 'Quantidade Obrigatório']"
                    color="cyan darken-2"
                    label=" Quantidade"
                    class="inputs"
                  ></v-text-field>
                  <v-text-field
                    v-model="attItemObj.valor"
                    v-maska="'R$ #*,#*'"
                    :rules="[(v) => !!v || 'Valor Obrigatório']"
                    color="cyan darken-2"
                    label=" Valor"
                    class="inputs"
                  ></v-text-field>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="attItemObj.data"
                        label="Data da compra"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker @change="setData(date), (menu = false)" v-model="date" no-title scrollable>
                    </v-date-picker>
                  </v-menu>
                </div>
                <v-text-field
                  v-model="attItemObj.observacao"
                  label="Observação"
                  dense
                ></v-text-field>
                <!-- eslint-disable-line -->
              </div>
              <div class="edit-icon-item">
                <v-icon color="primary" @click="attItem(index, i, item)"
                  >mdi-circle-edit-outline</v-icon
                >
              </div>
            </div>
            <div v-if="limit" class="show-more-section">
              <span class="show-text" @click="showAll(index)"
                >Mostrar mais</span
              >
            </div>
          </div>
          <div v-else class="else-text">
            <span class="text">
              Não foi efetuada nenhuma compra com este fornecedor
            </span>
          </div>
          <div
            style="display:flex; justify-content:flex-end; align-items:center"
          >
            <!-- eslint-disable-line -->
            <div v-if="isAdd" style="width:100%;">
              <!-- eslint-disable-line -->
              <div class="create-form">
                <v-select
                  v-model="newItem.nome"
                  :rules="[(v) => !!v || 'Item Obrigatório']"
                  color="cyan darken-2"
                  label=" Item"
                  :items="estoqueItems"
                  class="inputs"
                ></v-select>
                <v-text-field
                  v-model="newItem.quantidade"
                  v-maska="'#*'"
                  :rules="[(v) => !!v || 'Quantidade Obrigatório']"
                  color="cyan darken-2"
                  label=" Quantidade"
                  class="inputs"
                ></v-text-field>
                <v-text-field
                  v-model="newItem.valor"
                  v-maska="'R$ #*,#*'"
                  :rules="[(v) => !!v || 'Valor Obrigatório']"
                  color="cyan darken-2"
                  label=" Valor"
                  class="inputs"
                ></v-text-field>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="newItem.data"
                      label="Data da compra"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker @change="setData(date), (menu = false)" v-model="date" no-title scrollable>
                  </v-date-picker>
                </v-menu>
              </div>
              <v-text-field
                v-model="newItem.observacao"
                label="Observação"
                dense
              ></v-text-field>
            </div>
            <v-btn
              class="add-btn"
              small
              fab
              depressed
              color="#fafafa"
              @click="addItem(index)"
            >
              <v-icon class="add-icon">mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <div class="create-fornecedor-section">
        <div v-if="isCreate" class="create-form">
          <v-text-field
            v-model="newFornecedor.nome"
            :rules="[(v) => !!v || 'Nome Obrigatório']"
            color="cyan darken-2"
            label=" Nome"
            class="inputs"
          ></v-text-field>
          <v-text-field
            v-model="newFornecedor.email"
            :rules="[(v) => !!v || 'Email Obrigatório']"
            color="cyan darken-2"
            label=" Email"
            class="inputs"
          ></v-text-field>
          <v-text-field
            v-model="newFornecedor.telefone"
            v-maska="'(##) #####-####'"
            :rules="[(v) => !!v || 'Telefone Obrigatório']"
            color="cyan darken-2"
            label=" Telefone"
            class="inputs"
          ></v-text-field>
        </div>
        <v-btn
          class="add-btn"
          small
          plain
          fab
          depressed
          color="#fafafa"
          @click="createFornecedor()"
        >
          <v-icon class="add-icon">mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-expansion-panels>
    <ObDialog :ob-dialog="obDialog" :ob-item="obItem" />
    <ShowAllDialog :forn-items="ShowAllItems" :forn-items-res="ShowAllItemsRes" :show="showAllDialog" />
  </div>
</template>

<script>
import firebase from 'firebase'
import ObDialog from '../fornecedores/ObDialog'
import ShowAllDialog from '../fornecedores/ShowAllDialog'
import { database } from '~/plugins/firebase.js'
export default {
  components: {
    ObDialog,
    ShowAllDialog
  },
  data() {
    return {
      show: false,
      limit: false,
      isCreate: false,
      canEdit: '',
      isEdit: '',
      isEditItem: '',
      isAdd: false,
      obDialog: false,
      obItem: {},
      showAllDialog: false,
      ShowAllItems: {},
      ShowAllItemsRes: {},
      fornecedores: {},
      fornecedoresRes: {},
      fornItens: {},
      estoque: {},
      estoqueItems: [],
      fornecedoresItems: {},
      fornecedorItems: [],
      newFornecedor: {
        nome: '',
        email: '',
        telfone: ''
      },
      attFornecedorObj: {
        nome: '',
        email: '',
        telfone: ''
      },
      date: new Date().toISOString().substr(0, 10),
      newItem: {
        nome: '',
        quantidade: '',
        valor: '',
        data: '',
        observacao: ''
      },
      attItemObj: {
        nome: '',
        quantidade: '',
        valor: '',
        data: '',
        observacao: ''
      }
    }
  },
  mounted() {
    const forn = database.child('fornecedor')
    forn.on('value', (snap) => (this.fornecedores = snap.val()))
    forn.on('value', (snap) => (this.fornecedoresRes = snap.val()))
    const data = database.child('estoque-item')
    data.on('value', (snap) => (this.estoque = snap.val()))
    const fornItens = database.child('fornecedor-item')
    fornItens.on('value', (snap) => (this.fornecedoresItems = snap.val()))
  },
  methods: {
    filterFornecedores() {
      this.obDialog = false
      this.showAllDialog = false
      let items = {}
      let searchedFornecedores = {}
      this.fornecedores = this.fornecedoresRes
      // Pega todos os itens de todos os fornecedores e coloca no mesmo OBJ
      for(const fornecedor in this.fornecedoresItems) {
        let keys = Object.keys(this.fornecedoresItems[fornecedor])
        for(const key in keys) {
          items[keys[key]] = this.fornecedoresItems[fornecedor][keys[key]]
        }
      }
      // armazena todos os fornecedores que possuem aquele item
      for(const item in items) {
        if (items[item].nome.toLowerCase().includes(this.search.toLowerCase())) {
          searchedFornecedores[items[item].fornecedor_id] = this.fornecedores[items[item].fornecedor_id]
        }
      }
      this.fornecedores = searchedFornecedores
    },
    createFornecedor() {
      if (!this.isCreate) {
        this.isCreate = true
      } else {
        const fornecedor = {
          nome: this.newFornecedor.nome,
          email: this.newFornecedor.email,
          telefone: this.newFornecedor.telefone
        }
        database
          .child('fornecedor')
          .push()
          .set(fornecedor)
          .then(() => {
            this.newFornecedor = {}
            this.isCreate = false
          })
      }
    },
    attFornecedor(id) {
      if (this.isEdit !== id) {
        this.isEdit = id
        let selected = {}
        firebase
          .database()
          .ref('fornecedor/' + id)
          .on('value', (snap) => (selected = snap.val()))
        this.attFornecedorObj = selected
      } else {
        const update = this.attFornecedorObj
        database
          .child('fornecedor/' + id)
          .set(update)
          .then(() => {
            this.attFornecedorObj = {}
            this.isEdit = ''
            this.canEdit = ''
          })
      }
    },
    getItens(index) {
      this.obDialog = false
      this.showAllDialog = false
      this.fornecedorItems = []
      this.canEdit = index
      this.show = false
      this.limit = false
      for (const fornecedor in this.fornecedoresItems) {
        if (fornecedor === index) {
          this.show = true
          const reverseKeys = Object.keys(this.fornecedoresItems[fornecedor]).reverse()
          for (const item in Object.keys(this.fornecedoresItems[fornecedor]).reverse()) {
            if (this.fornecedorItems.length < 3) {
              this.fornecedoresItems[fornecedor][reverseKeys[item]].id = reverseKeys[item]
              this.fornecedorItems.push(
                this.fornecedoresItems[fornecedor][reverseKeys[item]]
              )
            } else {
              this.limit = true
            }
          }
        }
      }
    },
    addItem(id) {
      if (!this.isAdd) {
        this.isAdd = true
        for (const i in this.estoque) {
          this.estoqueItems.push(this.estoque[i].name)
        }
      } else {
        const item = this.newItem
        item.fornecedor_id = id
        database
          .child('fornecedor-item/' + id)
          .push()
          .set(item)
          .then(() => {
            this.newItem = {}
            this.isAdd = false
            this.getItens(id)
          })
      }
    },
    attItem(fornId, arrayIndex, item) {
      this.obDialog = false
      this.showAllDialog = false
      if (this.isEditItem !== arrayIndex) {
        this.isEditItem = arrayIndex
        this.attItemObj = item
        for (const i in this.estoque) {
          this.estoqueItems.push(this.estoque[i].name)
        }
      } else {
        const itemId = item.id
        const update = this.attItemObj
        delete update.id
        database
          .child('fornecedor-item/' + fornId + '/' + itemId)
          .set(update)
          .then(() => {
            this.attItemObj = {}
            this.isEditItem = ''
          })
      }
    },
    setData(data) {
      this.newItem.data = data.split(' ')[0].split('-').reverse().join('/') /*eslint-disable-line*/
      this.attItemObj.data = data.split(' ')[0].split('-').reverse().join('/') /*eslint-disable-line*/
    },
    showOb(fornId, id) {
      let selected = {}
      firebase
        .database()
        .ref('fornecedor-item/' + fornId + '/' + id)
        .on('value', (snap) => (selected = snap.val()))
      this.obDialog = true
      this.showAllDialog = false
      this.obItem = selected
    },
    showAll(fornId) {
      let selected = {}
      let newObj = {}
      firebase
        .database()
        .ref('fornecedor-item/' + fornId)
        .on('value', (snap) => (selected = snap.val()))
      const reverseKeys = Object.keys(selected).reverse()
      for(const i in reverseKeys) {
        newObj[reverseKeys[i]] = selected[reverseKeys[i]]
      }
      selected = newObj
      this.showAllDialog = true
      this.obDialog = false
      this.ShowAllItems = selected
      this.ShowAllItemsRes = selected
    }
  }
}
</script>

<style scoped>
.serch-section {
  margin-bottom: 35px;
  width: 500px;
  margin-right: 20px;
  align-self: flex-end;
}
.text {
  font-family: 'Exo Regular';
}
.text-name {
  width: 44%;
}
.text-quant {
  width: 18%;
}
.text-value {
  width: 18%;
}
.text-date {
  width: 20%;
}
.edit-icon {
  width: 30px;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.edit-icon-item {
  width: 30px;
  display: flex;
  justify-content: flex-end;
}
.fornecedores-total {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
}
.fornecedor-info {
  display: flex;
  justify-content: space-between;
}
.item-info {
  width: 95%;
  display: flex;
  justify-content: space-between;
}
#header-title {
  font-family: 'Exo Regular';
  font-size: 20px;
  text-align: center;
}
.panels-section {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
}
.expansion-panel >>> .v-expansion-panel-header {
  border: 0px none transparent !important;
  -webkit-box-shadow: 0px 0px 0px -30px rgba(0, 0, 0, 0);
  box-shadow: 0px 0px 0px -30px rgba(0, 0, 0, 0);
}
.expansion-panel >>> .v-expansion-panel-content {
  border: 0px none transparent !important;
  -webkit-box-shadow: 0px 0px 0px -30px rgba(0, 0, 0, 0);
  box-shadow: 0px 0px 0px -30px rgba(0, 0, 0, 0);
}
.v-expansion-panel::before {
  box-shadow: none !important;
}
.fornecedor-itens-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
  margin-bottom: 6px;
}
.show-more-section {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.show-text {
  font-family: 'Exo Regular';
  color: #777;
  font-size: 16px;
}
.else-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.create-fornecedor-section {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.create-form {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
.att-form {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
.inputs {
  padding-left: 10px;
  padding-right: 10px;
}
.add-btn {
  margin-right: 16px;
}
.add-icon {
  color: #777 !important;
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

@media screen and (max-width: 1024px) {
  .item-info {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
  .text-name {
    width: 100%;
  }
  .text-quant {
    width: 100%;
  }
  .text-value {
    width: 100%;
  }
  .text-date {
    width: 100%;
  }
}
@media screen and (max-width: 1024px) {
  .fornecedor-info {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
  .forn-text {
    font-size: 17px;
    margin-bottom: 5px;
  }
  .serch-section {
    width: 90%;
  }
}
</style>
