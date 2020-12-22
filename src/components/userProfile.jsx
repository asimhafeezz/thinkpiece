import React, { useState } from 'react'
import { auth, firestore } from '../firebase'

const UserProfile = () => {
	const [displayName, setDisplayName] = useState('')

	const onChangeHandler = e => {
		setDisplayName(e.target.value)
	}

	const onSubmitHandler = async e => {
		e.preventDefault()

		const userId = auth.currentUser.uid
		const userRef = await firestore.doc(`users/${userId}`)

		if (displayName) {
			userRef.update({
				displayName,
			})
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
				<input
					type='submit'
					disabled={displayName === '' ? true : false}
					name='Update Display Name'
				/>
			</form>
		</div>
	)
}

export default UserProfile
