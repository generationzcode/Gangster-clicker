import firebase  from 'firebase/app';
import 'firebase/database';
var firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};
class Fireapp {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();
  }
  writeScoreData(score,userName) {
  this.db.ref('users/').set({
    score:score,
    userName:userName
  });
  }
  getData(){
    this.db.ref('users/score').once("value",async (snap)=>{
      return snap.val();
    });
  }
}
 
export default Fireapp;
