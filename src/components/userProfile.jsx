import React, { useState, useRef } from 'react'
import { auth, firestore, storage } from '../firebase'

const UserProfile = () => {
	const [displayName, setDisplayName] = useState('')
	const imageRef = useRef(null)

	const onChangeHandler = e => {
		setDisplayName(e.target.value)
	}
	const onSubmitHandler = e => {
		e.preventDefault()

		const userId = auth.currentUser.uid
		const userRef = firestore.doc(`users/${userId}`)

		if (displayName) {
			userRef.update({
				displayName,
			})
		}

		const file = imageRef.current.files[0]
		console.log({ file })

		if (file) {
			storage
				.ref()
				.child('user-profile')
				.child(file.name)
				.put(file)
				.then(res => res.ref.getDownloadURL())
				.then(photoURL => userRef.update({ photoURL }))
		}
	}

	return (
		<div>
			<h3>Its a user Profile Page!!!</h3>
			<form onSubmit={onSubmitHandler}>
				<input
					type='text'
					name='displayName'
					value={displayName}
					placeholder='Display Name'
					onChange={onChangeHandler}
				/>
				<input type='file' ref={imageRef} />
				<input
					type='submit'
					// disabled={displayName === '' ? true : false}
					name='Update Display Name'
				/>
			</form>
		</div>
	)
}

export default UserProfile
