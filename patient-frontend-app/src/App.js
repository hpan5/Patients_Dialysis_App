import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import './App.css';
import PatientsList from './feature/PatientsList';

function App() {
  return (
    <Router>
      <div className="App">
        <PatientsList />
        <Routes>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <PatientsList />
              </React.Fragment>
            )}
          />
        </Routes>
      </div>
    </Router>
    
  );
}
/*

          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
*/
export default App;
