import InitCatDrop from './catdrop-scene.js';
import { InitCatJumpSingle } from './catjump-scene.js';
import { InitMatter } from './tutorial/matter_example.js';
import { InitPhaserMatter } from './tutorial/phaser_matter.js';
import { HeaderMenu, RenderGamePage, RenderPianoPage } from './intro.js';
import { RenderSheet } from './sheetmusic.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
window.addEventListener('hashchange', (event) => {
  window.location.reload();
});
var renderList = {
  '#CatJumpSingle': InitCatJumpSingle,
  '#MatterExample': InitMatter,
  '#MatterPhaserExample': InitPhaserMatter,
  '#CatDroP':InitCatDrop,
  '#game': RenderGamePage, 
  '#piano': RenderPianoPage,
  '#music': RenderSheet,
  '':RenderGamePage,
  '#home':RenderGamePage
}
ReactDOM.render(<HeaderMenu></HeaderMenu>, document.getElementById('menu'));
var hash = window.location.hash;
if (hash in renderList) {
  renderList[hash]();
}
