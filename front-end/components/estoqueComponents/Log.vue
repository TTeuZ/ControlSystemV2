<template>
  <div class="mr-1">
    <v-btn rounded depressed color="blue" @click="getInfos()">
      LOG
    </v-btn>
    <v-dialog v-model="modal" max-width="1600px" no-click-animation persistent>
      <v-card class="modal-card">
        <div class="modal-title-section">
          <span class="modal-title">
            LOG DO ESTOQUE
          </span>
        </div>
        <v-row id="log-total" class="ma-0 pa-0" justify="center" align="center">
          <v-col
            class="log-table-total"
            xl="6"
            lg="6"
            md="6"
            sm="11"
            xs="11"
            cols="11"
          >
            <span class="log-title"> CRIADOS </span>
            <div class="log-table">
              <div v-for="item in criados" :key="item">
                <div class="log-item">
                  <span class="log-text"> Nome: {{ item.name }} </span>
                  <span class="log-text">
                    {{ getDate(item.createdAt) }}
                  </span>
                  <span class="log-text">
                    {{ item.userCreated }}
                  </span>
                </div>
                <v-divider class="divider" />
              </div>
            </div>
          </v-col>
          <v-col
            class="log-table-total"
            xl="6"
            lg="6"
            md="6"
            sm="11"
            xs="11"
            cols="11"
          >
            <span class="log-title"> ATUALIZAÇÕES </span>
            <div class="log-table">
              <div v-for="item in atualizacoes" :key="item">
                <div class="log-item">
                  <span class="log-text"> Nome: {{ item.name }} </span>
                  <span class="log-text">
                    {{ getDate(item.updatedAt) }}
                  </span>
                  <span class="log-text">
                    {{ item.userUpdated }}
                  </span>
                  <span class="log-text"> quant: {{ item.quantidade }} </span>
                </div>
                <v-divider class="divider" />
              </div>
            </div>
          </v-col>
        </v-row>
        <div class="btn-section">
          <v-btn color="blue" text @click="modal = false">
            SAIR
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
      atualizacoes: [],
      criados: []
    }
  },
  mounted() {
    const criadosData = database.child('estoque-item')
    criadosData.on('value', (snap) => (this.criados = snap.val()))
    const atualizacoesData = database.child('estoque-log')
    atualizacoesData.on('value', (snap) => (this.atualizacoes = snap.val()))
  },
  methods: {
    getInfos() {
      this.modal = true
    },
    getDate(timestamp) {
      const date = new Date(timestamp)
      const realDate =
        date.toLocaleDateString() +
        ' ' +
        date.getHours().toString() +
        ':' +
        date.getMinutes().toString() +
        ':' +
        date.getSeconds().toString()
      return realDate
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
.log-table-total {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.log-table {
  border: 1px solid black;
  width: 97%;
  height: auto;
  max-height: 600px;
  overflow: auto;
}
.log-title {
  font-family: 'Exo Regular';
  font-size: 20px;
}
.log-item {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
}
.log-text {
  font-family: 'Exo Regular';
  font-size: 14px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.btn-section {
  padding-bottom: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media screen and (max-width: 680px) {
  .log-item {
    flex-flow: column;
    justify-content: start;
    align-items: flex-start;
  }

  .log-text {
    margin-left: 5px;
  }
}
</style>
