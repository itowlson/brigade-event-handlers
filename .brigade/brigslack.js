const { Event, events } = require('@brigadecore/brigadier');
const slack = require('@slack/bolt');

export class SlackEvents {
    onSlashCommand(action /*: (command: slack.SlashCommand, event: Event) => Promise<void> */) {
        events.on('slack', 'slash_command', async (event) => {
            const command /*: slack.SlashCommand */ = JSON.parse(event.payload || "");
            await action(command, event);
        })
    }
}

export const slackEvents = new SlackEvents();
