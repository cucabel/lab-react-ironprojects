import React, { Component } from 'react'
import tasks from './../../lib/task-services'
import { Button, Form } from 'react-bootstrap';

import './AddTask.css';

class AddTask extends Component {
  constructor(props){
    super(props);
    this.state = { title: '', description: '', isShowing: false};
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    const { projectID } = this.props; 
                                                
    tasks.addTask({ title, description, projectID })
      .then( () => {
        this.props.getTheProject();
        this.setState({title: '', description: ''});
    })
    .catch( error => console.log(error) )
  }
  
  toggleForm = () => this.setState({isShowing: !this.state.isShowing});

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      <div>
        <Button onClick={this.toggleForm} variant="primary" id="fluid-button">Add task</Button>

        {
          !this.state.isShowing ?
           null
          :
          (
              <Form>
                <Form.Group>
                  <Form.Control type="text" placeholder='Title' name="title" value={this.state.title} onChange={this.handleChange} className="title-form"/>
                </Form.Group>

                <Form.Group>
                  <Form.Control type="text" placeholder='Description' name="description" value={this.state.description} onChange={this.handleChange}/>
                </Form.Group>

                <Button onClick={this.handleFormSubmit} variant="primary" id="fluid-button">Submit</Button>
              </Form>
          )
        }
      </div>
    )
  }
}

export default AddTask;
