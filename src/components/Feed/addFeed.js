import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Jumbotron, Button, Row, Container, Col, Form, Label, FormGroup, Input, FormText } from 'reactstrap';

class AddFeed extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Jumbotron>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleText">Descripción</Label>
                                    <Input type="textarea" name="text" id="exampleText" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Estado</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Seleccione</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleFile">File</Label>
                                    <Input type="file" name="file" id="exampleFile" />
                                    <FormText color="muted">
                                        Subir una imagen
                                    </FormText>
                                </FormGroup>
                                <Button>Publicar Feed</Button>
                            </Form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default AddFeed;