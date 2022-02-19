import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import AddProject from "../../components/projects/AddProject"; // <== !!!
import projectAPI from "../../lib/project-services";

import './ProjectList.css';

class ProjectList extends Component {
  state = {
    listOfProjects: [],
  };

  getAllProjects = () => {
    projectAPI.getAllProjects().then((data) => {
      this.setState({ listOfProjects: data });
    });
  };

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    const { listOfProjects } = this.state;

    return (
      <Container fluid="md">
        {" "}
        <AddProject getData={this.getAllProjects} />

        {listOfProjects.map((project) => {
          return (
            <Row className="justify-content-center">
              <Col md={6}>
                <Card key={project._id} className="cards">
                  <Card.Body>
                    <Card.Link href={`/projects/${project._id}`} className="nav-link">
                      <Card.Title>
                        <h2>{project.title}</h2>
                      </Card.Title>
                      <Card.Text>
                        <p>{project.description}</p>
                      </Card.Text>
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          );
        })}
      </Container>
    );
  }
}

export default ProjectList;
