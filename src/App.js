import './App.css';
import React from 'react';
// import ArApp from './ArApp';
import ManagePoints from './ManagePoints';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

function App() {
  
  return (
    <ManagePoints/>
    // <ArApp />
    // <Router>
    //   <header className="d-flex justify-content-center py-3">
    //   <ul className="nav nav-pills">
    //     <li class="nav-item">
    //       <Link className="nav-link active" to="/">Home</Link>
    //     </li>
    //     <li class="nav-item">              
    //       <Link className="nav-link"  to="/arapp">Ar App</Link>
    //     </li>
    //   </ul>
    // </header>
    //     <Switch>
    //       <Route path="/arapp">
    //         <ArApp/>
    //       </Route>
    //       <Route path="/">
    //         <ManagePoints/>
    //       </Route>
    //     </Switch>
    // </Router>
  );
}

export default App;
