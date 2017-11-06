tag = takonomura/morning-bot:latest

.PHONY: build
build:
	docker build --no-cache --pull -t $(tag) .

.PHONY: run
run:
	docker run --name morning-bot --rm -e MORNING_BOT_CONFIG -e SLACK_INCOMING_WEBHOOK_URL -e SLACK_CHANNEL --cap-add SYS_ADMIN $(tag)
