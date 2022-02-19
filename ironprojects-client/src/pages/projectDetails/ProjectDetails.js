import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditProject from '../../components/projects/EditProject';
import AddTask from '../../components/tasks/AddTask';
import project from '../../lib/project-services';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import './ProjectDetails.css';

class ProjectDetails extends Component {
  constructor(props){
    super(props);
    this.state = {title: '', description: '', tasks: []};
  }
  
  renderEditForm = () => {
    if (!this.state.title && !this.state.description) return <p>LOADING</p>; 
    else {
      return (
        <EditProject theProject={this.state}
          getTheProject={this.getSingleProject} 
          {...this.props} /> 
      )      
    }
  }

  renderAddTaskForm = () => {
    if(!this.state.title && !this.state.description) return  <p>LOADING</p>; 
    else {
      return <AddTask projectID={this.state._id} getTheProject={this.getSingleProject}/>
    }
  }

  deleteProject = () => {
    const { id } = this.props.match.params;
    
    project.deleteProject(id)
    	.then( () => this.props.history.push('/projects') )
    	.catch( (err) => console.log(err));
  }


  componentDidMount() {
    this.getSingleProject();
  }

  getSingleProject = () => {
    const { id } = this.props.match.params;
  
    project.getProjectById(id)
      .then( (data) =>{
        const theProject = data;
        this.setState(theProject);
      })
      .catch((err) => console.log(err));
  }
  
  render() {
    return (
      <Container fluid="md">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card key={project._id} className="cards">
              <Card.Body>
                <Card.Title>
                  <h2>{this.state.title}</h2>
                </Card.Title>
                <Card.Text>
                  <p>{this.state.description}</p>
                </Card.Text>
              </Card.Body>
            </Card>

            <Link to={'/projects'}>
              <Button variant="primary" id="fluid-button">Back</Button>
            </Link>
          </Col>

          <Col md={6} className=".mt-3">
            { this.renderEditForm() }   {/* Render the form in here */}
            <Button onClick={() => this.deleteProject()} variant="primary" id="fluid-button">
              Delete project
            </Button>
          </Col>
        </Row>

        <br />
        <br />

        <Row className="justify-content-center">
          <Col md={{ width: 6, order: 'last' }}>
            { this.renderAddTaskForm() }
          </Col>

          <Col md={6}>
            <Row>

              { 
                (this.state.tasks.length === 0) ?
                <h2>NO TASKS TO DISPLAY</h2> :
                this.state.tasks.map((task) => {
                  return(
                    <Col md={6}>
                      <Card key={task._id} className="cards project-tasks">
                        <Card.Body>
                          <Card.Link href={`/projects/${this.state._id}/tasks/${task._id}`} className="nav-link">
                            <Card.Title>
                              <h2>{ task.title }</h2>
                            </Card.Title>
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    </Col>

                  )
                })
              }
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ProjectDetails;
