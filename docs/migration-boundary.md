# Migration boundary

## Serverless
Bot API management UI, administrator allowlist metadata, and audit/request records.

## Existing Telethon runtime
User-account sessions, QR/2FA authentication, session encryption/storage, and user-account operations remain external and unchanged.

## Before production
- Use a dedicated management bot.
- Configure the exact numeric admin allowlist and review it carefully.
- Add rate limits, audit retention, and alerting for denied access.
- Authenticate/sign all external API requests and use a narrow action allowlist.
- Never relay arbitrary shell/code execution or store account session secrets in this project.
