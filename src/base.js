import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCT-X3eH1EiMldy62ClcRysoNL4W5HdqwQ",
    authDomain: "catch-of-the-day---dave.firebaseapp.com",
    databaseURL: "https://catch-of-the-day---dave-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export { firebaseApp };

//This is a default export
export default base;