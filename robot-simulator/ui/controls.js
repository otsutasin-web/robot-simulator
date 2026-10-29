import {GRID_SIZE,WIDTH,HEIGHT,same,adjacent,nearestVertex} from '../simulation/grid.js';
import {createPair} from '../models/robot.js';
import {moveRobots} from '../simulation/simulator.js';
import {draw} from './renderer.js';
import {modelConfig} from '../models/modelConfig.js';

export function initializeControls() {
  const canvas=document.getElementById('board');
  const ctx=canvas.getContext('2d');
  const stats=document.getElementById('stats');
  let robots=[],robotPairs=[],timer=null,steps=0,nextId=0;
  let editMode=false,selectedPair=null;
  const vertices=[];
  for(let y=0;y<Math.floor(HEIGHT/GRID_SIZE);y++) {
    for(let x=0;x<Math.floor(WIDTH/GRID_SIZE);x++) {
      vertices.push({x:x*GRID_SIZE+(y%2===0?0:GRID_SIZE/2),y:y*GRID_SIZE});
    }
  }
  const redraw=()=>draw(ctx,robots,robotPairs,steps,editMode,selectedPair,stats);
  function addRobotPairAt(p) {
    nextId=createPair(p,robots,robotPairs,nextId);
    redraw();
  }
function canvasPoint(e) {
  const rect=canvas.getBoundingClientRect();
  return {x:(e.clientX-rect.left)*canvas.width/rect.width,
          y:(e.clientY-rect.top)*canvas.height/rect.height};
}
function setGuide(message) { document.getElementById('guide').textContent=message; }
function setEditMode(value) {
  if(value) pause();
  editMode=value; selectedPair=null;
  const button=document.getElementById('edit');
  button.textContent=`配置変更モード：${value?'ON':'OFF'}`;
  button.setAttribute('aria-pressed',String(value));
  button.classList.toggle('active',value);
  setGuide(value?'配置変更：まずペアのいる格子点をクリックし、次に隣接する6点のいずれかをクリックしてください。2台目のロボットを移動します。':'通常モード：格子点をクリックするとペアを追加します。');
  redraw();
}
function handleBoardClick(e) {
  const pos=canvasPoint(e);
  const nearest=nearestVertex(pos.x,pos.y,vertices);
  if(!nearest) return;
  if(!editMode) {addRobotPairAt(nearest);return;}
  if(selectedPair===null) {
    const index=robotPairs.findIndex(([a,b])=>same(a,nearest)&&same(b,nearest));
    if(index===-1) {
      setGuide('Short状態のペアがある格子点を選択してください。');
      return;
    }
    selectedPair=index;
    setGuide(`ペア${index+1}を選択中：隣接する6点のいずれかをクリックするとLong状態になります。元の点をクリックすると選択を解除します。`);
    redraw();
    return;
  }
  const [a,b]=robotPairs[selectedPair];
  if(same(nearest,a)) {
    selectedPair=null;setGuide('選択を解除しました。別のペアを選択できます。');redraw();return;
  }
  const valid=adjacent(a).slice(1).some(p=>same(p,nearest));
  if(!valid) {setGuide('移動先は選択したペアの隣接6点から選んでください。');return;}
  b.x=nearest.x;b.y=nearest.y;
  selectedPair=null;
  setGuide('Long状態に変更しました。別のShort状態のペアも変更できます。');
  redraw();
}
  canvas.addEventListener('click',handleBoardClick);
  function stepOnce() {moveRobots(robots);steps++;redraw();}
function start() { if(editMode) setEditMode(false); if(timer===null) timer=setInterval(stepOnce,modelConfig.intervalMs); }
function pause() { if(timer!==null) {clearInterval(timer);timer=null;} }
document.getElementById('start').addEventListener('click',start);
document.getElementById('pause').addEventListener('click',pause);
document.getElementById('step').addEventListener('click',()=>{pause();if(editMode)setEditMode(false);stepOnce();});
document.getElementById('edit').addEventListener('click',()=>setEditMode(!editMode));
document.getElementById('reset').addEventListener('click',()=>{
  pause();robots=[];robotPairs=[];steps=0;nextId=0;setEditMode(false);redraw();
});
redraw();
}
