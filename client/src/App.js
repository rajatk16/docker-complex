import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Fib from './pages/Fib'
import OtherPage from './pages/OtherPage'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Fib} />
      <Route exact path="/otherpage" component={OtherPage} />
    </Router>
  );
}

export default App;
