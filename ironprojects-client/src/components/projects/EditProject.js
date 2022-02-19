import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import project from './../../lib/project-services';

import './EditProject.css';

class EditProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: this.props.theProject.title, 
      description: this.props.theProject.description
    }
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    const { _id } = this.props.theProject;
  
    project.updateProject(_id,{ title, description })
    .then( () => {
      this.props.history.push('/projects');    
    })
     .catch( (err) => console.log(err) )
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })

  }

  render(){
    return (

            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group>
                <Form.Label className="my-2">Title:</Form.Label>
                <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleChange} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" name="description" value={this.state.description} onChange={this.handleChange} />
              </Form.Group>

              <Button type="submit" value="Submit" variant="primary" id="fluid-button">Submit</Button>
            </Form>
    )
  }
}

export default EditProject;
