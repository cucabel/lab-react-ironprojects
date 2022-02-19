import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import project from './../../lib/project-services';

import './AddProject.css';

class AddProject extends Component {
  constructor(props){
      super(props);
      this.state = { title: "", description: "" };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, description } = this.state;
    
    project.addProject({ title, description })
      .then( () => {
        this.props.getData();
        this.setState({title: "", description: ""});
      })
      .catch( (err) => console.log(err) )
  }


  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState( {[name]: value} );
  }

  render(){
    return(
        <Row className="justify-content-center">
          <Col md={6}>
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
          </Col>
        </Row>
    )
  }
}

export default AddProject;
