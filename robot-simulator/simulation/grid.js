export const GRID_SIZE = 30, WIDTH = 800, HEIGHT = 800;
export function same(a,b) { return a.x===b.x && a.y===b.y; }
export function adjacent(r) {
  const x=r.x, y=r.y, g=GRID_SIZE;
  return [{x,y},{x:x+g,y},{x:x+g/2,y:y+g},{x:x-g/2,y:y+g},
          {x:x-g,y},{x:x-g/2,y:y-g},{x:x+g/2,y:y-g}];
}
export function nearestVertex(x,y,vertices) {
  let nearest=null, minDist=Infinity;
  for(const p of vertices) {
    const d=Math.hypot(p.x-x,p.y-y);
    if(d<minDist) {minDist=d;nearest=p;}
  }
  return nearest;
}
