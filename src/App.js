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
          <nav>
            <Link to="/">Homes</Link> | <Link to="/about">About</Link>
          </nav>
          <Switch>
            <Route path="/" exact component={ ContainerComponent} />
            {/* <Route path="/about" component={About} /> */}
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
