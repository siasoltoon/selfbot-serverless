import { table, integer, text, index, sql } from 'sdk/db';

export const admins = table('admins', {
  telegramUserId: integer('telegram_user_id').primaryKey(),
  role: text('role').notNull().default('operator'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const adminRequests = table('admin_requests', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  telegramUserId: integer('telegram_user_id').notNull(),
  action: text('action').notNull(),
  status: text('status').notNull().default('recorded'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
}, (t) => ({
  userIdx: index('idx_admin_requests_user').on(t.telegramUserId),
}));
