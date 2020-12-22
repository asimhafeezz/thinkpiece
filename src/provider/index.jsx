import React from 'react'

import UserProvider from './userProvider'
import PostsProvider from './postsProvider'

const Providers = ({ children }) => {
	return (
		<UserProvider>
			<PostsProvider>{children}</PostsProvider>
		</UserProvider>
	)
}

export default Providers
