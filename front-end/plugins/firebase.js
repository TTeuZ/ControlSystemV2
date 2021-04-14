import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDXfAUxRFjM8slyu1WMSmzLLdksiC03EhY',
  authDomain: 'plk-manutencao-backend.firebaseapp.com',
  databaseURL: 'https://plk-manutencao-backend-default-rtdb.firebaseio.com',
  projectId: 'plk-manutencao-backend',
  storageBucket: 'plk-manutencao-backend.appspot.com',
  messagingSenderId: '491836340989',
  appId: '1:491836340989:web:e01fdcd64570864582dc94'
}

let app = null

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export default firebase
