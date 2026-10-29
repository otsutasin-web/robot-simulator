import {adjacent,same} from './grid.js';
import {computeDirection} from '../algorithms/ruleEngine.js';
import {applyMoves} from './scheduler.js';

function occupancy(p,robots) {
  const count=robots.filter(r=>same(r,p)).length;
  return count>=2?2:count;
}
export function getDirectionToPair(r,points) {
  if (!r.pair) return -1;
  return points.findIndex(p=>same(p,r.pair));
}
export function moveRobots(robots) {
  const nextDirections=new Map();
  const beforePoints=new Map(robots.map(r=>[r,adjacent(r)]));
  for(const current of robots) {
    const points=beforePoints.get(current);
    const physicalStatus=points.map(p=>occupancy(p,robots));
    const physicalPairDirection=getDirectionToPair(current,points);
    const dir=computeDirection(physicalStatus,physicalPairDirection);
    if(dir!==-1) nextDirections.set(current,dir);
  }
  applyMoves(robots,nextDirections,beforePoints);
}
