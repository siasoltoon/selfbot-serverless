import { api, db } from 'sdk';
import { admins, adminRequests } from '../schema.js';

// Add approved numeric Telegram user IDs before enabling any management operation.
// Leave empty to deny all privileged commands by default.
const ALLOWED_ADMIN_IDS = [];

export default async function (message) {
  if (!message?.chat?.id || !message.from?.id) return;
  const chatId = message.chat.id;
  const userId = message.from.id;
  const input = (message.text ?? '').trim();

  // Safe identity helper; it grants no privileges.
  if (input === '/whoami') {
    await api.sendMessage({ chat_id: chatId, text: `Your Telegram user ID is ${userId}. This command does not grant admin access.` });
    return;
  }

  if (!ALLOWED_ADMIN_IDS.includes(userId)) {
    await api.sendMessage({ chat_id: chatId, text: 'Access denied. This management shell has no administrator IDs configured and performs no privileged actions.' });
    return;
  }

  await db.insert(admins).values({ telegramUserId: userId })
    .onConflictDoUpdate({ target: admins.telegramUserId, set: { role: 'operator' } }).run();

  if (input === '/start' || input === '/help') {
    await api.sendMessage({ chat_id: chatId, text: 'Selfbot management shell. It records requests only; no Telethon action or account-session operation is connected.' });
    return;
  }

  await db.insert(adminRequests).values({
    telegramUserId: userId,
    action: input.slice(0, 200),
    status: 'recorded',
  }).run();

  await api.sendMessage({ chat_id: chatId, text: 'Management request recorded only. No Telethon action was executed.' });
}
