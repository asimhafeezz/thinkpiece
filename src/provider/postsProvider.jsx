import React, { useEffect, useState, createContext } from 'react'

import { firestore } from '../firebase'

import { collectIdsAndData } from '../utilities'

export const PostContext = createContext()

const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const unsub = () => {
			firestore
				.collection('posts')
				.orderBy('createdAt', 'desc')
				.onSnapshot(snapshot => {
					const posts = snapshot.docs.map(collectIdsAndData)
					setPosts(posts)
				})
		}

		return unsub()
	}, [])

	return <PostContext.Provider value={posts}>{children}</PostContext.Provider>
}

export default PostProvider
