import InitCatDrop from './catdrop-scene.js';
import {InitCatJumpSingle} from './catjump-scene.js';
import { InitMatter } from './tutorial/matter_example.js';
import { InitPhaserMatter } from './tutorial/phaser_matter.js';
if (window.location.hash==="#CatJumpSingle") {
  InitCatJumpSingle();
}
else if (window.location.hash==="#MatterExample"){
  InitMatter();
}
else if (window.location.hash==="#MatterPhaserExample"){
  InitPhaserMatter();
}
else if (window.location.hash === "#CatDrop"){
  InitCatDrop();
}
else{
  InitCatJumpSingle();
}