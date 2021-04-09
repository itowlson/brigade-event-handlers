import { logger } from "@brigadecore/brigadier";
import { WebClient } from '@slack/web-api';

export async function notifySlack(responseToken: string, channelId: string, message: string) {
    const slack = new WebClient(responseToken);
    const conversationId = channelId;
    logger.info('notifying Slack');
    await slack.chat.postMessage({ channel: conversationId, text: message });
    logger.info('notified Slack');
}
