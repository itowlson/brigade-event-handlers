import { events, logger, Job } from "@brigadecore/brigadier";

import { slackEvents } from './brigslack';
import * as utils from './utils';

slackEvents.onSlashCommand(async (command, event) => {

    await utils.notifySlack(command.responseToken, command.body.channel_id,
        `Brigade has received your command regarding ${command.body.text} and will ${command.body.command.substr(1)} it immediately`
        );
    // const slack = new WebClient(command.responseToken);
    // const conversationId = command.body.channel_id;
    // logger.info('notifying Slack');
    // await slack.chat.postMessage({ channel: conversationId, text: `Brigade has received your command regarding ${command.body.text} and will ${command.body.command.substr(1)} it immediately` });
    // logger.info('notified Slack');

    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = [JSON.stringify(command)];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = [`${command.body.command} ${command.body.text} (from ${command.body.channel_name})`];
    await barJob.run();
});

events.on("slack", "shortcut", async event => {

    const shortcut = JSON.parse(event.payload || "");

    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = [JSON.stringify(shortcut)];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = [`A SHORTCUT (from nowhere)`];
    await barJob.run();
});

events.on("slack", "message_action", async event => {

    const shortcut = JSON.parse(event.payload || "");

    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = [JSON.stringify(shortcut)];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = [`${shortcut.body.message.text} (from ${shortcut.body.channel.name})`];
    await barJob.run();
});

events.process();
