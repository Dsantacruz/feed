import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Container, Col } from 'reactstrap';

class ContainerFeed extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <Card>
                <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>
        )
    }
}

export default ContainerFeed;