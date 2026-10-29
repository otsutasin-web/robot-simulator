// Ver.2 の動作を記録した設定。第1段階では切り替え機能は未実装です。
export const modelConfig = Object.freeze({
  chirality: true, compass: false, visibilityRange: 1,
  multiplicity: 'weak', scheduler: 'FSYNC',
  suppressSamePairSimultaneousMove: true, intervalMs: 150
});
