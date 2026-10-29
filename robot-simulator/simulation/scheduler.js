// FSYNC: 移動可否と移動先はすべて Look 時点の配置から確定する。
// Short (同一点にいるペア): 両方に移動ルールがあっても先頭の1台だけ動かす。
// Long (隣接点にいるペア): 両方に移動ルールがあれば両方動かす。
// 相方への移動を両方が選択した場合は、同じステップ内で位置を交換する。
import {same} from './grid.js';

export function applyMoves(robots, nextDirections, beforePoints) {
  // 位置を更新する前に、すべての移動を確定させる。
  const moves = [];
  const processed = new Set();

  for (const r of robots) {
    if (processed.has(r)) continue;
    processed.add(r);

    const partner = r.pair;
    if (partner) processed.add(partner);

    const short = partner && same(r, partner);
    const dirR = nextDirections.get(r) ?? -1;
    const dirP = partner ? (nextDirections.get(partner) ?? -1) : -1;

    if (short) {
      // Java版と同じ優先順位: robots 配列で先に登場するロボットを優先。
      // 先頭が停止する場合は相方の移動を許す。
      if (dirR !== -1) {
        moves.push({robot:r, target:beforePoints.get(r)[dirR]});
      } else if (partner && dirP !== -1) {
        moves.push({robot:partner, target:beforePoints.get(partner)[dirP]});
      }
    } else {
      if (dirR !== -1) moves.push({robot:r, target:beforePoints.get(r)[dirR]});
      if (partner && dirP !== -1) {
        moves.push({robot:partner, target:beforePoints.get(partner)[dirP]});
      }
    }
  }

  // 全移動先は移動前の座標から求めてあるため、入れ替わりも正しく反映される。
  for (const {robot, target} of moves) {
    robot.x = target.x;
    robot.y = target.y;
  }
}
