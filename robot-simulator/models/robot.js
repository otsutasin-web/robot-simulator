import {same} from '../simulation/grid.js';

export function createPair(p,robots,robotPairs,nextId) {

  if (robots.some(r=>same(r,p))) return nextId;
  const a={id:nextId++,x:p.x,y:p.y,pair:null};
  const b={id:nextId++,x:p.x,y:p.y,pair:a};
  a.pair=b;
  robots.push(a,b);
  robotPairs.push([a,b]);

  return nextId;
}
