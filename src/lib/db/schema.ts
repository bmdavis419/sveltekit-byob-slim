import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
	id: text('id').primaryKey(),
	provider: text('provider', { enum: ['google', 'github'] }).notNull(),
	providerId: text('provider_id', { length: 255 }).notNull(),
	firstName: text('first_name', { length: 100 }).notNull(),
	lastName: text('last_name', { length: 100 }).notNull(),
	email: text('email', { length: 100 }).notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const userRelations = relations(userTable, ({ many }) => ({
	sessions: many(sessionTable),
	todos: many(todoTable)
}));

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});

export const sessionRelations = relations(sessionTable, ({ one }) => ({
	user: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.id]
	})
}));

export const todoTable = sqliteTable('todo', {
	id: text('id', { length: 100 }).primaryKey(),
	name: text('name').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	completed: integer('completed', { mode: 'boolean' }).notNull(),
	userId: text('user_id', { length: 100 })
		.references(() => userTable.id)
		.notNull()
});

export const todoRelations = relations(todoTable, ({ one }) => ({
	user: one(userTable, {
		fields: [todoTable.userId],
		references: [userTable.id]
	})
}));
