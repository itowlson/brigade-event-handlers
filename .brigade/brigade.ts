const { events, logger, Job } = require('@brigadecore/brigadier');
const { slackEvents } = require('brigade-slack-gateway-events');
import brig = require('@brigadecore/brigadier');
import slackapi = require('@slack/web-api');
import slack = require('@slack/bolt');

slackEvents.onSlashCommand(async (command: slack.SlashCommand, slackClient: slackapi.WebClient, event: brig.Event) => {

    await notifySlack(slackClient, command.channel_id,
        `Brigade has received your command regarding ${command.text} and will ${command.command.substr(1)} it immediately`
        );

    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = [JSON.stringify(command)];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = [`${command.command} ${command.text} (from ${command.channel_name})`];
    await barJob.run();
});

slackEvents.onShortcut(async (shortcut: slack.GlobalShortcut, slackClient: slackapi.WebClient, event: brig.Event) => {

    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = [JSON.stringify(shortcut)];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = [`A SHORTCUT (from nowhere)`];
    await barJob.run();
});

slackEvents.onMessageAction(async (shortcut: slack.MessageShortcut, slackClient: slackapi.WebClient, event: brig.Event) => {

    await notifySlack(slackClient, shortcut.channel.id,
        `Brigade has received your command regarding ${shortcut.message.text} and is springing into action pronto`
        );

    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = [JSON.stringify(shortcut)];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = [`${shortcut.message.text} (from ${shortcut.channel.name})`];
    await barJob.run();
});

events.process();

async function notifySlack(slackClient: slackapi.WebClient, channelId: string, message: string) {
    const conversationId = channelId;
    logger.info('notifying Slack');
    await slackClient.chat.postMessage({ channel: conversationId, text: message });
    logger.info('notified Slack');
}

