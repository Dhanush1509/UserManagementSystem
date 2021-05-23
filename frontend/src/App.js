
import './App.css';
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import Alert from './components/layout/Alerts'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './components/pages/Home'
import Appbar from './components/layout/Appbar'
import PrivateRoute from './components/route/PrivateRoute'
function App() {
  return (
    <AuthState>
      <AlertState>
        <Router>
        <Appbar/>
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;
