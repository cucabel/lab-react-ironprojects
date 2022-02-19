import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import ProjectList from './pages/projectList/ProjectList';
import Navbar from './components/navbar/Navbar';
import ProjectDetails from './pages/projectDetails/ProjectDetails';
import TaskDetails from './pages/taskDetails/TaskDetails'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/projects" component={ProjectList}/>
          <Route exact path="/projects/:id" component={ProjectDetails} />
          <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} /> 
        </Switch>
      </div>
    );
  }
}

export default App;
