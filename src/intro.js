import React from 'react';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Card,
  CardGroup,
  Table
} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import songs from './piano.json';
import { faCirclePause } from '@fortawesome/free-solid-svg-icons';

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
              <Nav.Link href="#game">Game</Nav.Link>
              <Nav.Link href="#piano">Piano</Nav.Link>
              {/* <Nav.Link href='#music'>Music</Nav.Link> */}
              <Nav.Link href="#achive">Achive</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
class GamePage extends React.Component {
  render() {
    return (
      <div>
        <CardGroup>
          {cards.map((card, idx) => {
            return <MyGameCard card={card} key={idx}></MyGameCard>;
          })}
        </CardGroup>
      </div>
    );
  }
}

class PianoPage extends React.PureComponent {
  constructor(props) {
    super(props);
    var audios = [];
    this.audio = {};
    songs.forEach((song) => {
      audios.push({
        name: song.name,
        musicSrc: 'mypiano/'.concat(song.filePath)
      });
    });
    this.state = {
      options: {
        audioLists: audios,
        playIndex: 0,
        autoPlay: false,
        mode: 'full',
        getAudioInstance: (audio) => {
          this.audio = audio;
        }
      },
      paused: true,
    };
  }
  onClick = (idx) => {
    var paused = false;
    if (this.state.options.playIndex === idx) {
      if (this.audio.paused) {
        this.audio.play();
        paused = false;
      } else {
        this.audio.pause();
        paused = true;
      }
    } 
    const data = {
      ...this.state.options,
      playIndex: idx
    };
    this.setState({ options: data, paused: paused});
  };

  render() {
    return (
      <div>
        <ReactJkMusicPlayer {...this.state.options}></ReactJkMusicPlayer>
        <Table striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Recorded On</th>
              <th>Name</th>
              {/* <th>Chord</th> */}
              {/* <th>Author</th> */}
            </tr>
          </thead>
          <tbody>
            {songs.map((song, idx) => {
              return (
                <tr>
                  <td>{idx}</td>
                  <td>{song.playedOn}</td>
                  <td>
                    {
                      <FontAwesomeIcon
                        icon={
                          (this.state.options.playIndex !== idx || this.state.paused)
                            ? faCirclePlay
                            : faCirclePause
                        }
                        onClick={() => this.onClick(idx)}
                      />
                    }
                    {' '
                      .concat(song.name)
                      .concat(
                        song.versionTag
                          ? ' ('.concat(song.versionTag.join(',')).concat(')')
                          : ''
                      ).concat(song.author?' - '.concat(song.author):'')}
                  </td>
                  {/* <td>{song.chord}</td> */}
                  {/* <td>{song.author}</td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

class MyGameCard extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.props.card.Title}</Card.Title>
          <Card.Text>{this.props.card.Description}</Card.Text>
          <Card.Img src={'preview/'.concat(this.props.card.Preview)} />
          <Button variant="primary" href={this.props.card.Hash}>
            Start
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

function RenderGamePage (){
  ReactDOM.render(<GamePage></GamePage>, document.getElementById('root'));
}
function RenderPianoPage () {
  ReactDOM.render(<PianoPage></PianoPage>, document.getElementById('root'))
}
export {  HeaderMenu, RenderGamePage, RenderPianoPage };
