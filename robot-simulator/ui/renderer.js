import {GRID_SIZE,WIDTH,HEIGHT,adjacent} from '../simulation/grid.js';
export const COLORS = ['#ff0000','#0000ff','#008000','#ff00ff','#ffa500','#00ffff','#ffc0cb','#ffff00','#800080','#008080'];

export function draw(ctx,robots,robotPairs,steps,editMode,selectedPair,stats) {
function drawTriangle(x,y) {
  ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+GRID_SIZE/2,y+GRID_SIZE);
  ctx.lineTo(x-GRID_SIZE/2,y+GRID_SIZE);ctx.closePath();ctx.stroke();
}
function draw() {
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  ctx.lineWidth=1;ctx.strokeStyle='#000';
  for(let y=0;y*GRID_SIZE<HEIGHT;y++) {
    for(let x=0;x*GRID_SIZE<WIDTH;x++) {
      drawTriangle(x*GRID_SIZE+(y%2===0?0:GRID_SIZE/2),y*GRID_SIZE);
    }
  }
  if(editMode && selectedPair!==null) {
    const [a]=robotPairs[selectedPair];
    ctx.fillStyle='rgba(28,92,201,.13)';
    ctx.strokeStyle='#1c5cc9';ctx.lineWidth=2;
    for(const p of adjacent(a).slice(1)) {
      ctx.beginPath();ctx.arc(p.x,p.y,11,0,2*Math.PI);ctx.fill();ctx.stroke();
    }
    ctx.beginPath();ctx.arc(a.x,a.y,14,0,2*Math.PI);ctx.stroke();
  }
  const positionCount=new Map();
  for(const robot of robots) {
    const key=`${robot.x},${robot.y}`;
    const count=positionCount.get(key)||0;
    const offsetX=((count%3)-1)*5;
    const offsetY=(Math.floor(count/3)-1)*5;
    const pairIndex=robotPairs.findIndex(pair=>pair.includes(robot));
    ctx.fillStyle=COLORS[pairIndex%COLORS.length]||'#ddd';
    ctx.strokeStyle='#000';ctx.lineWidth=1;
    ctx.beginPath();ctx.arc(robot.x+offsetX,robot.y+offsetY,GRID_SIZE/4,0,2*Math.PI);
    ctx.fill();ctx.stroke();
    positionCount.set(key,count+1);
  }
  ctx.lineWidth=3;
  for(let i=0;i<robotPairs.length;i++) {
    const [a,b]=robotPairs[i];
    ctx.strokeStyle=COLORS[i%COLORS.length];
    ctx.beginPath();ctx.moveTo(a.x,a.y-4);ctx.lineTo(b.x,b.y-4);ctx.stroke();
  }
  stats.textContent=`${robotPairs.length}ペア / ${robots.length}台 · ${steps}ステップ`;
}
  draw();
}
