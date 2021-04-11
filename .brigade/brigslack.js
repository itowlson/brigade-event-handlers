const { Event, events } = require('@brigadecore/brigadier');
const slack = require('@slack/bolt');

class SlackEvents {
    onSlashCommand(action /*: (command: slack.SlashCommand, responseToken: string, event: Event) => Promise<void> */) {
        events.on('slack', 'slash_command', async (event) => {
            const payload = JSON.parse(event.payload || "");
            const command /*: slack.SlashCommand */ = payload.body;
            const responseToken /*: string */ = payload.responseToken;
            await action(command, responseToken, event);
        });
    }

    onShortcut(action) {
        events.on("slack", "shortcut", async (event) => {
            const payload = JSON.parse(event.payload || "");
            const shortcut /*: slack.GlobalShortcut */ = payload.body;
            const responseToken /*: string */ = payload.responseToken;
            await action(shortcut, responseToken, event);
        });
    }

    onMessageAction(action) {
        events.on("slack", "message_action", async (event) => {
            const payload = JSON.parse(event.payload || "");
            const shortcut /*: slack.MessageShortcut */ = payload.body;
            const responseToken /*: string */ = payload.responseToken;
            await action(shortcut, responseToken, event);
        });
    }
}

const slackEvents = new SlackEvents();

module.exports = { slackEvents, SlackEvents };
