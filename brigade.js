const { events, Job } = require("@brigadecore/brigadier");

events.on("slack", "slash_command", async event => {
    let fooJob = new Job("foo", "debian:latest", event);
    fooJob.primaryContainer.command = ["echo"];
    fooJob.primaryContainer.arguments = ["fooooooooooooooooo"];
    await fooJob.run();

    let barJob = new Job("bar", "debian:latest", event);
    barJob.primaryContainer.command = ["echo"];
    barJob.primaryContainer.arguments = ["barrrrrrrrrrrrrr"];
    await barJob.run();
});
