# Repository instructions

Keep `siasoltoon/selfbot` unchanged. This project is a Bot API management interface only, not a Telethon userbot port. Never store session strings, QR login data, passwords, 2FA codes, or API hashes here. Privileged actions must require a configured allowlist and later an authenticated external API contract. Runtime modules use only the Serverless SDK and relative imports ending in `.js`.
