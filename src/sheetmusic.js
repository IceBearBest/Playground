import { Vex } from 'vexflow';
import './index.css';
export function RenderSheet() {
  const root = document.getElementById('root');
  const sheetDiv = document.createElement('div');
  sheetDiv.setAttribute('id', 'sheet');
  root.appendChild(sheetDiv);
  var vf = new Vex.Flow.Factory({ renderer: { elementId: 'sheet' } });
  var score = vf.EasyScore();
  var system = vf.System();
  system.addStave({
    voices: [score.voice(score.notes('C#5/q, B4, A4, G4,C#5/q, B4, A4, G4'), {time: '8/4'})]
  });
  vf.draw();

  var br = document.createElement('br');
  sheetDiv.appendChild(br);
  // creating the span element, then add a class attribute
  const choice = document.createElement('button');
  choice.setAttribute('id', 'choicebutton');
  choice.innerHTML = 'span'; // some text to improve visualization

  // add the <a> element tree into the div#something
  sheetDiv.appendChild(choice);
}
