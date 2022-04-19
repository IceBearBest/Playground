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
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(fas);
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
              <Nav.Link href="#link">Achive</Nav.Link>
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

var songs = [
  {
    name: 'On Wings of Song (RH)',
    path: 'OnWingsOfSong(RH).mp3',
    date: '2022-04-17',
    description: 'from Op. 34, No. 2 from voice and piano',
    author: {
      name: 'Felix Mendelssohn',
    },
    arranged: 'James Bastien'
  },
  {
    name: 'Morning Mood',
    path: 'MorningMood.mp3',
    date: '2022-04-16',
    description: "from \"Peer Gynt Suit\", No. 1, Op. 46 (Theme from 1st Movement)",
    author: {
      name: 'Edward Greig',
    },
    arranged: 'James Bastien'
  },
  {
    name: 'Can-Can(faster)',
    path: 'Cancan-faster.mp3',
    date: '2022-03-06',
    chord: 'Key of C Major',
    author: {
      name: 'Jacques Offenbach',
      year: '1819-1880',
      nationality: 'France',
    }
  },
  {
    name: 'The Lion Sleep Tonight',
    path: 'TheLionSleepTonight.mp3',
    date: '2022-03-05',
    description: "Worlds and Music by George David Weiss, Hugo Peritti, Luigi Creatore, and Solomon Linda",
    author: {
      name: ''
    }
  },
  {
    name: 'Can-Can',
    path: 'Cancan.mp3',
    date: '2022-03-05',
    description:
      'can-can - a lively French dance that features high kicks perfomed by women in a chorus line',
    author: {
      name: 'Jacques Offenbach',
      year: '1819-1880',
      nationality: 'France'
    },
    chord: 'Key of C Major'
  },
  {
    name: 'The Entertainer',
    path: 'Entertainer.mp3',
    date: '2022-03-05',
    author: {
      name: 'Scott Joplin',
      year: '1867-1917',
      nationality: 'arranged'
    },
    chord: 'Key of C Major'
  },
  {
    name: 'HungarianDance',
    path: 'HungarianDance2.mp3',
    date: '2022-03-05',
    author: {
      name: 'Johannes Brahms',
      year: '1883-1897',
      nationality: 'Germany',
    }
  },
  {
    name: 'HungarianDance',
    path: 'HungarianDance1.mp3',
    date: '2021-11-26',
    author: {
      name: 'Johannes Brahms',
      year: '1883-1897',
      nationality: 'Germany',
    }
  },
  {
    name: '风笛舞曲',
    path: '风笛舞曲.mp3',
    date: '2020-11-25',
    author: {
      name: ''
    }
  }
];

class PianoPage extends React.PureComponent {
  constructor(props) {
    super(props);
    var audios = [];
    songs.forEach((song) => {
      audios.push({ name: song.name, musicSrc: 'mypiano/'.concat(song.path) });
    });
    this.state = {
      options: {
        audioLists: audios,
        playIndex: 0,
        autoPlay: false,
        mode: 'full'
      }
    };
  }

  updateOptions = (options) => {
    const data = {
      ...this.state.options,
      ...options
    };
    this.setState({ options: data });
  };

  render() {
    return (
      <div>
        <ReactJkMusicPlayer {...this.state.options}></ReactJkMusicPlayer>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Name</th>
              <th>Chord</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, idx) => {
              return (
                <tr>
                  <td>{idx}</td>
                  <td>{song.date}</td>
                  <td>
                    {
                      <FontAwesomeIcon
                        icon="circle-pause"
                        onClick={() => {
                          this.updateOptions({ playIndex: idx });
                        }}
                        key={idx}
                      />
                    }
                    {' '.concat(song.name)}
                  </td>
                  <td>{song.chord}</td>
                  <td>{song.author.name}</td>
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

export { GamePage, HeaderMenu, PianoPage };
