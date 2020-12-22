import React, { useState, useEffect } from 'react'

//firebase
import { firestore } from '../firebase.js'
import { collectIdsAndData } from '../utilities.js'

//authentication
import Authentication from './Authentication'

import Posts from './Posts'

const Application = () => {
	const [posts, setPosts] = useState([])
	const [user, setUser] = useState()

	useEffect(() => {
		const unsub = () => {
			firestore.collection('posts').onSnapshot(snapshot => {
				const posts = snapshot.docs.map(collectIdsAndData)
				setPosts(posts)
			})
		}

		return unsub()
	}, [])

	return (
		<main className='Application'>
			<h1>Think Piece</h1>
			<Authentication user={user} />
			<Posts posts={posts} />
		</main>
	)
}

export default Application

// const postsData = [
// 	{
// 		id: '1',
// 		title: 'A Very Hot Take',
// 		content:
// 			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!',
// 		user: {
// 			uid: '123',
// 			displayName: 'Bill Murray',
// 			email: 'billmurray@mailinator.com',
// 			photoURL: 'https://www.fillmurray.com/300/300',
// 		},
// 		stars: 1,
// 		comments: 47,
// 	},
// 	{
// 		id: '2',
// 		title: 'The Sauciest of Opinions',
// 		content:
// 			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!',
// 		user: {
// 			uid: '456',
// 			displayName: 'Mill Burray',
// 			email: 'notbillmurray@mailinator.com',
// 			photoURL: 'https://www.fillmurray.com/400/400',
// 		},
// 		stars: 3,
// 		comments: 0,
// 	},
// ]
