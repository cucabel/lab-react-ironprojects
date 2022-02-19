import React, { Component } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import tasks from '../../lib/task-services';

import './TaskDetails.css';

class TaskDetails extends Component {
	state = {};

  componentDidMount(){
    this.getTheTask();
  }

  getTheTask = () => {
    const { id: projectId, taskId } = this.props.match.params;

    tasks.getTaskById(projectId, taskId)
    	.then( (theTask) => {
      	this.setState(theTask);
    })
    .catch( (err) => console.log(err))
  }

  render(){
    return(
      <Container fluid="md">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="task">
              <Card.Body>
                <Card.Title>
                  <h2>{this.state.title}</h2>
                </Card.Title>
                <Card.Text>
                  <p>{this.state.description}</p>
                </Card.Text>
              </Card.Body>
            </Card>

            <Button onClick={this.props.history.goBack} variant="primary" id="fluid-button">Go Back</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default TaskDetails;
