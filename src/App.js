import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ContainerComponent from './components/ContainerComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <ContainerComponent /> */}
         <Router>
          <nav className="navigion-menu">
            <Link to="/">Homes</Link> | <Link to="/about">About</Link>
          </nav>
          <Switch>
            <div className="contents">
              <Route path="/" exact component={ ContainerComponent} />
            </div>
            {/* <Route path="/about" component={About} /> */}
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
