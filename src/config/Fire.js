import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// adding firebase configurtaion
var config = {
  apiKey: "AIzaSyAe1lpOoNgxC0UTeE_XjVPSb-J5_STXZIA",
  authDomain: "react-prescibe.firebaseapp.com",
  databaseURL: "https://react-prescibe.firebaseio.com",
  projectId: "react-prescibe",
  storageBucket: "react-prescibe.appspot.com",
  messagingSenderId: "246583401665",
  appId: "1:246583401665:web:584d3f17dcfb543d304840"
};
// initialising firebase
firebase.initializeApp(config);
firebase.firestore()
// .settings({ timestampsInSnapshots: true });
export default firebase;
