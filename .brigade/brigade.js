const { events, logger, Job } = require("@brigadecore/brigadier");
// const { WebClient } = require('@slack/web-api');

events.on("slack", "slash_command", async event => {

    const command = JSON.parse(event.payload);
    // logger.info(`payload=${event.payload}`);
    // logger.info(`native=${command.native}`);

    // TODO: package.json doesn't work at the moment
    // const slack = new WebClient(command.token);
    // const conversationId = command.channelId;
    // logger.info('notifying Slack');
    // await slack.chat.postMessage({ channel: conversationId, text: `Brigade has received your command regarding ${command.text} and will ${command.command.substr(1)} it immediately` });
    // logger.info('notified Slack');

    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = [JSON.stringify(command.native)];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = [`${command.command} ${command.text} (from ${command.channel})`];
    await barJob.run();
});

events.on("slack", "shortcut", async event => {

    const shortcut = JSON.parse(event.payload);
    // logger.info(`payload=${event.payload}`);
    // logger.info(`native=${command.native}`);

    // TODO: package.json doesn't work at the moment
    // const slack = new WebClient(command.token);
    // const conversationId = command.channelId;
    // logger.info('notifying Slack');
    // await slack.chat.postMessage({ channel: conversationId, text: `Brigade has received your command regarding ${command.text} and will ${command.command.substr(1)} it immediately` });
    // logger.info('notified Slack');

    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = [JSON.stringify(shortcut.native)];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = [`A SHORTCUT (from nowhere)`];
    await barJob.run();
});

events.on("slack", "message_action", async event => {

    const shortcut = JSON.parse(event.payload);
    // logger.info(`payload=${event.payload}`);
    // logger.info(`native=${command.native}`);

    // TODO: package.json doesn't work at the moment
    // const slack = new WebClient(command.token);
    // const conversationId = command.channelId;
    // logger.info('notifying Slack');
    // await slack.chat.postMessage({ channel: conversationId, text: `Brigade has received your command regarding ${command.text} and will ${command.command.substr(1)} it immediately` });
    // logger.info('notified Slack');

    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = [JSON.stringify(shortcut.native)];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = [`${shortcut.text} (from ${shortcut.channel})`];
    await barJob.run();
});
