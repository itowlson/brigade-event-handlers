const { logger } = require('@brigadecore/brigadier');
const { WebClient } = require('@slack/web-api');

async function notifySlack(responseToken /*: string */, channelId /*: string */, message /*: string */) {
    const slack = new WebClient(responseToken);
    const conversationId = channelId;
    logger.info('notifying Slack');
    await slack.chat.postMessage({ channel: conversationId, text: message });
    logger.info('notified Slack');
}

module.exports = { notifySlack };
