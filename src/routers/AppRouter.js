import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import routes from './routes'
import Login from "../Views/Login";
import Layout from '../components/layout/Layout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>
        <Layout>
          {
            routes.map(route =>
              <PrivateRoute key={route.path} path={route.path} exact={route.exact}>
                {route.component && <route.component />}
              </PrivateRoute>)
          }
          {/* <Redirect to='/' /> */}
        </Layout>
      </Switch>
    </BrowserRouter>
  )
}
export default AppRouter