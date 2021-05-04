<template>
  <div class="mr-1">
    <v-btn rounded depressed color="green" @click="modal = true">
      NOVO ITEM
    </v-btn>
    <v-dialog v-model="modal" max-width="800px" no-click-animation persistent>
      <v-card class="modal-card">
        <div class="modal-title-section">
          <span class="modal-title">
            ADICIONE UM ITEM
          </span>
          <div class="form">
            <v-text-field
              v-model="newItem.name"
              :rules="[(v) => !!v || 'Campo Obrigatório']"
              color="cyan darken-2"
              label=" Nome"
            />
            <v-text-field
              v-model="newItem.quantidade"
              v-maska="'#*'"
              :rules="[(v) => !!v || 'Campo Obrigatório']"
              color="cyan darken-2"
              label=" Quantidade"
            />
            <v-text-field
              v-model="newItem.quantidade_min"
              v-maska="'#*'"
              :rules="[(v) => !!v || 'Campo Obrigatório']"
              color="cyan darken-2"
              label=" Minimo"
            />
            <v-select
              v-model="newItem.tipo"
              :items="tipes"
              :rules="[(v) => !!v || 'Campo Obrigatório']"
              color="cyan darken-2"
              label=" Tipo"
            />
          </div>
        </div>
        <div class="btn-section">
          <v-btn color="#43A047" text @click="close()">
            Cancelar
          </v-btn>
          <v-btn color="#43A047" text @click="criaItem()">
            Salvar
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import firebase from 'firebase'
import { database } from '~/plugins/firebase.js'
export default {
  data() {
    return {
      modal: false,
      newItem: {
        name: '',
        quantidade: '',
        quantidade_min: '',
        tipo: '',
        color: '',
        createdAt: '',
        userCreated: ''
      },
      tipes: ['Lacre', 'Cabo']
    }
  },
  methods: {
    criaItem() {
      this.newItem.userCreated = this.$store.state.user.displayName
      this.newItem.createdAt = firebase.database.ServerValue.TIMESTAMP
      database
        .child('estoque-item')
        .push()
        .set(this.newItem)
        .then(() => {
          this.close()
        })
    },
    close() {
      this.modal = false
      this.newItem.name = ''
      this.newItem.quantidade = ''
      this.newItem.quantidade_min = ''
      this.newItem.tipo = ''
    }
  }
}
</script>

<style scoped>
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

.form {
  width: 80%;
  padding-top: 20px;
  padding-bottom: 30px;
}

.btn-section {
  padding-bottom: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
