import React, { Component } from 'react';
import { connect } from 'react-redux';
import Feed from './feed';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Container, Col, FormGroup, Label, Input } from 'reactstrap';

class ContainerFeed extends Component
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
                        <FormGroup>
                            <Label for="exampleSelect">Filtrar</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>Público</option>
                                <option>Privado</option>
                            </Input>
                        </FormGroup>
                        <Feed/>
                        <Feed/>
                        <Feed/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ContainerFeed;