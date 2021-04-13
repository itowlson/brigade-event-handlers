const { events, logger, Job } = require('@brigadecore/brigadier');

const { slackEvents } = require('./brigslack');
const utils = require('./utils');

slackEvents.onSlashCommand(async (command, responseToken, event) => {

    await utils.notifySlack(responseToken, command.channel_id,
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

slackEvents.onShortcut(async (shortcut, responseToken, event) => {

    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = [JSON.stringify(shortcut)];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = [`A SHORTCUT (from nowhere)`];
    await barJob.run();
});

slackEvents.onMessageAction(async (shortcut, responseToken, event) => {

    await utils.notifySlack(responseToken, shortcut.channel.id,
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
