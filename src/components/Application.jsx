import React from 'react'

//authentication
import Authentication from './Authentication'

import Posts from './Posts'

import { Switch, Route, Link } from 'react-router-dom'
import UserProfile from './userProfile'
import PostPage from './postPage'

const Application = () => {
	return (
		<main className='Application'>
			<Link to='/'>
				<h1>Think Piece</h1>
			</Link>
			<Authentication />
			<Switch>
				<Route exact path='/' component={Posts} />
				<Route exact path='/profile' component={UserProfile} />
				<Route exact path='/posts/:id' component={PostPage} />
			</Switch>
		</main>
	)
}

export default Application
