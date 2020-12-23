import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase'
import { collectIdsAndData } from '../utilities'
import Comments from './Comments'
import Post from './Post'

const PostPage = props => {
	const { match } = props
	const [post, setPost] = useState(null)
	const [comments, setComments] = useState([])

	const postId = match.params.id

	const postRef = firestore.doc(`posts/${postId}`)

	const commentsRef = postRef.collection('comments')

	useEffect(() => {
		const unsub = () => {
			postRef.onSnapshot(snapShot => {
				const post = collectIdsAndData(snapShot)
				setPost(post)
			})
		}

		return unsub()
	}, [])

	useEffect(() => {
		const unsub = () => {
			commentsRef.onSnapshot(snapShot => {
				const comments = snapShot.docs.map(collectIdsAndData)
				setComments(comments)
			})
		}

		return unsub()
	}, [])

	//create comment
	const createComment = comment => {
		commentsRef.add({
			comment,
		})
	}

	return (
		<div>
			{/* <Post /> */}
			{/* <Comments /> */}
			<div>post page {match.params.id}</div>
			<section>
				{post && <Post {...post} />}
				<Comments
					comments={comments}
					// postId={postId}
					onCreate={createComment}
				/>
			</section>
		</div>
	)
}

export default PostPage
