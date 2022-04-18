import React from 'react';
import { Navbar, Container, Nav, Button, Card, CardGroup } from 'react-bootstrap';

var cards = [
  {
    Title: 'Cat Jump Single Frame',
    Description:
      'A fixed window platform jumping game. Collect the stars and avoid the rabbits :)',
    Hash: '#CatJumpSingle',
    Preview: 'CatJumpSingle.png'
  },
  {
    Title: 'Drop and combine cats',
    Description: 'Similar to synthetic watermelon',
    Hash: '#CatDrop',
    Preview: 'CatDrop.png'
  },
  {
    Title: 'An example of using matter.js',
    Description:
      'Click on the screen to see cats pop out, this is an illustration of Matter.js',
    Hash: '#MatterPhaserExample',
    Preview: 'MatterPhaserExample.png'
  }
];

class Main extends React.Component {
  render() {
    return (
      <div>
        <CardGroup>
        {cards.map((card, idx) => {
          return <MyCard card={card} key={idx}></MyCard>;
        })}
        </CardGroup>
      </div>
    );
  }
}

class HeaderMenu extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">IceBearBest</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Achive</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

class MyCard extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.props.card.Title}</Card.Title>
          <Card.Text>{this.props.card.Description}</Card.Text>
          <Card.Img src={"preview/".concat(this.props.card.Preview)}/>
          <Button variant="primary" href={this.props.card.Hash}>
            Start
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export { Main, HeaderMenu };
