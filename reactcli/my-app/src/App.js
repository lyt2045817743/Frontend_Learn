import React from 'react';
import './App.css';
import Page1 from './views/Page1';
import Page2 from './views/Page2';
import{
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">Page1</Link> | 
        <Link to="/Page2">Page2</Link>
        <Switch>
          <Route exact path="/" component={Page1}></Route>
          <Route path="/Page2" component={Page2}></Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
