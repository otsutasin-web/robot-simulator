import {evaluateRules} from './rules.js';

export function rotatedStatus(physical,rotation) {
  const local=[physical[0]];
  for(let i=1;i<=6;i++) local[i]=physical[((i-1+rotation)%6)+1];
  return local;
}
export function physicalToLocal(direction,rotation) {
  if(direction<=0) return direction;
  return ((direction-1-rotation+6)%6)+1;
}
export function localToPhysical(direction,rotation) {
  if(direction===0) return 0;
  return ((direction-1+rotation)%6)+1;
}
export function computeDirection(physicalStatus, physicalPairDirection) {
  for(let rotation=0;rotation<6;rotation++) {
    const s=rotatedStatus(physicalStatus,rotation);
    const pairDir=physicalToLocal(physicalPairDirection,rotation);
    const localNext=evaluateRules(pairDir,s);
    if(localNext!==-1) return localToPhysical(localNext,rotation);
  }
  return -1;
}
