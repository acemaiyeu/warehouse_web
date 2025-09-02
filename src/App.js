import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ContainerComponent from './components/ContainerComponent';
import './scss/Navigation.scss';
import { useState } from "react";

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        {/* <ContainerComponent /> */}
         <Router>
          <nav className="navigion-menu">
            <div className="navigation-item" onClick={() => setActiveMenuItem(1)}>
              <p>SO List</p>
              {activeMenuItem === 1 && 
              <div className="navigation-modal">
                  <Link to="/">Danh sách đơn hàng</Link>  <Link to="/about">Chi tiết đơn hàng</Link>
              </div>
              }
              
            </div>
             <div className="navigation-item" onClick={() => setActiveMenuItem(2)}>
              <p>SO List</p>
             {activeMenuItem === 2 && 
              <div className="navigation-modal">
                  <Link to="/">Homes</Link>  <Link to="/about">About</Link>
              </div>
              }
            </div>
            {/* <Link to="/">Homes</Link> | <Link to="/about">About</Link> */}
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
