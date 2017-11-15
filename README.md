# morning-bot

朝にチェックする情報をSlackで一度に見るためのBot

## 機能

- [x] Slack への投稿
- [x] 様々な情報の取得
  - [x] [Yahoo!路線情報](https://transit.yahoo.co.jp/traininfo/area/4/)
  - [x] 1分単位の電車の遅延情報
    - [ ] JR東日本
    - [ ] 東京メトロ
    - [x] 東京急行電鉄
    - [x] 京王電鉄
  - [x] [WeatherNews](https://weathernews.jp/onebox/35.64/139.70/temp=c)

## 使い方

```
# リポジトリをクローンする
$ git clone https://github.com/takonomura/morning-bot.git
$ cd morning-bot
# Docker イメージをプルする
$ docker pull takonomura/morning-bot:latest
# 設定ファイルを書く
$ cp config.example.json config.json
$ $EDITOR config.json
# 環境変数を指定して実行する
$ MORNING_BOT_CONFIG="$(cat config.json)" SLACK_INCOMING_WEBHOOK_URL="YOUR SLACK INCOMING WEBHOOK" make run
```

## Chrome がエラーを吐く場合

以下の環境変数をつけると動くかも

```
CHROME_ARGS="--no-sandbox --disable-setuid-sandbox"
```

## スクリーンショット

| Mac | iPhone |
| --- | ------ |
![mac_screenshot](https://user-images.githubusercontent.com/22152877/32360656-68d5ef8c-c09b-11e7-8d09-a9eb0cbd2376.png) | ![iPhone screenshot](https://user-images.githubusercontent.com/22152877/32360907-89c55564-c09d-11e7-93c2-79621c88c6fb.png)
