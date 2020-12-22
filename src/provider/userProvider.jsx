import React, { useEffect, useState, createContext } from 'react'

import { auth, createUserProfileDocument } from '../firebase'

export const UserContext = createContext()

const PostProvider = ({ children }) => {
	const [user, setUser] = useState()

	useEffect(() => {
		const unsub = () => {
			auth.onAuthStateChanged(async userAuth => {
				if (userAuth) {
					const userRef = await createUserProfileDocument(userAuth)
					userRef.onSnapshot(snapshot => {
						setUser({ uid: snapshot.id, ...snapshot.data() })
					})
				}
				setUser(userAuth)
			})
		}

		return unsub()
	}, [])

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default PostProvider
