import React from 'react'
import { render } from 'react-dom'

import './index.scss'

import { BrowserRouter as Router } from 'react-router-dom'

import Providers from './provider/index'

import Application from './components/Application'

render(
	<Router>
		<Providers>
			<Application />
		</Providers>
	</Router>,
	document.getElementById('root')
)
