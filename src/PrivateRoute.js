import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({component: Component, ...rest}) {
  // FIXME!
  const isAuthenticated = true

  return (
    <Route
      {... rest}
      render={(props) =>
        isAuthenticated ? (
          <Component{...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}
export default PrivateRoute
