# Robot Simulator — Ver.2 modular

元の `robot_simulator_v2.html` をファイル分割したものです。ルール16個・画面・配置変更・ステップ実行・移動順序を維持しています。

## 起動

ES modules を使うため、`index.html` を直接ダブルクリックせずローカルサーバーで開いてください。

Pythonが使える場合、`robot-simulator` フォルダ内で `python -m http.server 8000` を実行し、`http://localhost:8000/` にアクセスします。VS Code の Live Server でも起動できます。

## 主な編集箇所

- `algorithms/rules.js` : Java版の16ルール（上から順に判定）
- `algorithms/ruleEngine.js` : キラリティ合意を前提とした6回転照合
- `models/modelConfig.js` : 現行モデルの仕様を記録（切替機能は未実装）
- `simulation/simulator.js` : 全ロボットの Look/Compute
- `simulation/scheduler.js` : Move、同一ペアの同時移動抑制
- `simulation/grid.js` : 格子・隣接点
- `models/robot.js` : ペア生成
- `ui/renderer.js` : 描画
- `ui/controls.js` : 操作・配置変更・タイマー

## 注意

今回の作業は機能追加ではなくファイル分割です。`modelConfig.js` の値を書き換えても、観測方式や同期方式はまだ切り替わりません。
