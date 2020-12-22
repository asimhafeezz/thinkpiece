import firebase from 'firebase/app'
import 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyDkMFooUT8s1eFh0BABok0dSHmAEWtl39U',
	authDomain: 'think-piece-d77ed.firebaseapp.com',
	projectId: 'think-piece-d77ed',
	storageBucket: 'think-piece-d77ed.appspot.com',
	messagingSenderId: '739850006749',
	appId: '1:739850006749:web:59f6db43e40e7d8559ab34',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()

window.firebase = firebase

// firestore.settings({
// 	timestampsInSnapshots: true,
// })

export { firestore, firebase }
