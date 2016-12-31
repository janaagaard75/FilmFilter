import * as moment from 'moment'
import * as React from 'react'
import { browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Route } from 'react-router'
import { Router } from 'react-router'

import { allRoutes } from './routes'

// TODO: Remove this and jQuery.
import 'bootstrap/js/dist/collapse'

import './main.scss'

moment.locale('da')

render(
  <Router history={browserHistory}>
    {allRoutes.map(route =>
      <Route key={route.routePath} component={route.component} path={route.routePath}/>
    )}
  </Router>,
  document.getElementById('app')
)