import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
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
const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()
const signInWithGoogle = () => auth.signInWithPopup(provider)

const signOut = () => auth.signOut()

window.firebase = firebase

const storage = firebase.storage()

const getUserDocument = async uid => {
	if (!uid) return null

	try {
		return firestore.doc(`users/${uid}`)

		// return { uid, ...userDocument.data() }
	} catch (err) {
		console.error('Error not created User', err)
	}
}

const createUserProfileDocument = async (user, additionalData) => {
	if (!user) return

	//get a reference to the place in the database where id matches
	const userRef = firestore.doc(`users/${user.uid}`)

	//go and fetch the document from the user
	const snapShot = await userRef.get()

	if (!snapShot.exists) {
		const { displayName, email, photoURL } = user
		const createdAt = new Date()
		try {
			await userRef.set({
				displayName,
				photoURL,
				email,
				createdAt,
				...additionalData,
			})
		} catch (err) {
			console.error('Error not created User', err)
		}
	}

	return getUserDocument(user.uid)
}

// firestore.settings({
// 	timestampsInSnapshots: true,
// })

export {
	firestore,
	firebase,
	signInWithGoogle,
	auth,
	signOut,
	createUserProfileDocument,
	storage,
}
