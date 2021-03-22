const { events, Job } = require("@brigadecore/brigadier");

events.on("slack", "slash_command", async event => {

    const command = JSON.parse(event.payload);

    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = [command.native];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = [`${command.command} ${command.text} (from ${command.channel})`];
    await barJob.run();
});
