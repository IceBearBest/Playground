import InitCatDrop from './catdrop-scene.js';
import { InitCatJumpSingle } from './catjump-scene.js';
import { InitMatter } from './tutorial/matter_example.js';
import { InitPhaserMatter } from './tutorial/phaser_matter.js';
import { HeaderMenu, GamePage } from './intro.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
window.addEventListener('hashchange', (event) => {
  window.location.reload();
});
ReactDOM.render(<HeaderMenu></HeaderMenu>, document.getElementById('menu'));
if (window.location.hash === '#CatJumpSingle') {
  InitCatJumpSingle();
} else if (window.location.hash === '#MatterExample') {
  InitMatter();
} else if (window.location.hash === '#MatterPhaserExample') {
  InitPhaserMatter();
} else if (window.location.hash === '#CatDrop') {
  InitCatDrop();
} else if (window.location.hash === '#game') {
  ReactDOM.render(<GamePage></GamePage>, document.getElementById('root'));
} else {
  ReactDOM.render(<GamePage></GamePage>, document.getElementById('root'));
}
