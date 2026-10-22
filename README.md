# Selfbot — Telegram Serverless Management Shell

**Status:** Phase 0 management UI shell, not a Telethon port.

Original: `siasoltoon/selfbot`

## Critical distinction
Telegram Serverless handlers use the Bot API. They do not replace the Telethon user-account runtime, QR/2FA login, user-account sessions, or long-running workers. This project only proposes a separate Bot API management interface and audit/request metadata.

## Setup
Node.js 18+; run `npm install`, enable Serverless for a dedicated management bot in @BotFather, then `npx tgcloud login`. Run `npm run check` and test the handler with `npx tgcloud run handlers/message '{ chat: { id: 123 }, from: { id: 123 }, text: "/whoami" }'`. Review changes before pushing code; review schema migrations separately.

## Security
Before any privileged action, configure the explicit numeric Telegram admin IDs in `tgcloud/handlers/message.js`. Until then, privileged commands are denied. This starter executes no Telethon actions and stores no session strings, passwords, QR payloads, or 2FA data.
