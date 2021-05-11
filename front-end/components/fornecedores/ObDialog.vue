<template>
  <v-dialog
      v-model="obDialog"
      max-width="600px"
      no-click-animation
      persistent
    >
      <v-card class="modal-card">
        <div class="modal-title-section">
          <span class="modal-title">
            OBSERVAÇÃO
          </span>
          <div v-if="obItem !== {}" class="ob-info">
            <div style="display:flex; justify-content:space-between;">
              <span class="text"> Item: {{ obItem.nome }} </span>
              <span class="text"> Quantidade: {{ obItem.quantidade }} </span>
              <span class="text"> Valor: {{ obItem.valor }} </span>
              <span class="text"> Data: {{ obItem.data }} </span>
            </div>
            <span class="text"> Observação: {{ obItem.observacao }} </span>
          </div>
        </div>
        <div class="btn-section">
          <v-btn color="#43A047" text @click="obDialog = false">
            sair
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    obDialog: {
      type: Boolean,
      required: true
    },
    obItem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.ob-info {
  display: flex;
  flex-flow: column;
  width: 90%;
}
.text {
  font-family: 'Exo Regular';
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
</style>