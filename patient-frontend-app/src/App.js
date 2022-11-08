import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import './App.css';
import NavBar from './app/NavBar';
import PatientsTable from './feature/PatientsTable';

function App() {
  return (
    <Router>
      <div className="App">
        <h2>Patients Dialysis App</h2>
        <NavBar/>
        <PatientsTable />
        <Routes>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <PatientsTable />
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
