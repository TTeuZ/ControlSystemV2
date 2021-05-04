<template>
  <div class="ma-0 pa-0">
    <v-icon medium class="mr-2" color="primary" @click="openModal()">
      mdi-circle-edit-outline
    </v-icon>
    <v-dialog v-model="modal" max-width="800px" no-click-animation persistent>
      <v-card class="modal-card">
        <div class="modal-title-section">
          <span class="modal-title">
            ATUALIZE O ITEM
          </span>
          <div class="form">
            <v-text-field
              v-model="attItem.name"
              :rules="[(v) => !!v || 'Campo Obrigatório']"
              color="cyan darken-2"
              label=" Nome"
              :disabled="!fullEdit"
            />
            <v-text-field
              v-model="attItem.quantidade"
              v-maska="'#*'"
              :rules="[(v) => !!v || 'Campo Obrigatório']"
              color="cyan darken-2"
              label=" Quantidade"
            />
            <v-text-field
              v-model="attItem.quantidade_min"
              v-maska="'#*'"
              :rules="[(v) => !!v || 'Campo Obrigatório']"
              color="cyan darken-2"
              label=" Minimo"
              :disabled="!fullEdit"
            />
            <v-select
              v-model="attItem.tipo"
              :items="tipes"
              :rules="[(v) => !!v || 'Campo Obrigatório']"
              color="cyan darken-2"
              label=" Tipo"
              :disabled="!fullEdit"
            />
          </div>
        </div>
        <div class="btn-section">
          <v-btn color="#43A047" text @click="close()">
            Cancelar
          </v-btn>
          <v-btn color="#43A047" text @click="atualizaItem()">
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
  props: {
    item: {
      type: Object,
      required: true
    },
    fullEdit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      modal: false,
      attItem: {
        name: '',
        quantidade: '',
        quantidade_min: '',
        tipo: ''
      },
      tipes: ['Lacre', 'Cabo']
    }
  },
  methods: {
    openModal() {
      this.modal = true
      this.attItem = Object.assign({}, this.item)
    },
    atualizaItem() {
      database
        .child('estoque-item/' + this.item.id)
        .set(this.attItem)
        .then(() => {
          if (!this.fullEdit) {
            this.putInLog()
          } else {
            this.attLogInfo()
          }
          this.close()
        })
    },
    putInLog() {
      const data = database.child('estoque-log')
      const newLog = {
        name: this.attItem.name,
        userCreated: this.attItem.userCreated,
        quantidade: this.attItem.quantidade,
        itemId: this.attItem.id
      }
      newLog.updatedAt = firebase.database.ServerValue.TIMESTAMP
      newLog.userUpdated = this.$store.state.user.displayName
      data.push().set(newLog)
    },
    attLogInfo() {
      let atualizacoes = []
      const log = database.child('estoque-log')
      log.on('value', (snap) => (atualizacoes = snap.val()))
      for (const i in atualizacoes) {
        if ((atualizacoes[i].itemId = this.item.id)) {
          database.child('estoque-log/' + i + '/name').set(this.attItem.name)
        }
      }
    },
    close() {
      this.modal = false
      this.attItem.name = ''
      this.attItem.quantidade = ''
      this.attItem.quantidade_min = ''
      this.attItem.tipo = ''
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
