import { Hono } from 'hono';
import type { MiddlewareVariables } from '..';
import { generateId } from 'lucia';
import { db } from '$lib/db';
import { todoTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { ensureLoggedIn } from '../helpers';
import { HTTPException } from 'hono/http-exception';

const users = new Hono<{
	Variables: MiddlewareVariables;
}>()
	.get('/', async (c) => {
		// fetch all the todos for a user
		const { user } = ensureLoggedIn(c);

		const todos = await db.select().from(todoTable).where(eq(todoTable.userId, user.id));

		return c.json({ todos });
	})
	.post(
		'/complete',
		zValidator(
			'form',
			z.object({
				todoId: z.string()
			})
		),
		async (c) => {
			const { user } = ensureLoggedIn(c);

			const body = c.req.valid('form');

			const todo = await db.query.todoTable.findFirst({
				where: eq(todoTable.id, body.todoId)
			});

			if (!todo) {
				throw new HTTPException(404, { message: 'Todo does not exist...' });
			}

			if (todo.userId !== user.id) {
				throw new HTTPException(401, { message: 'This is not your todo!' });
			}

			await db
				.update(todoTable)
				.set({
					completed: !todo.completed
				})
				.where(eq(todoTable.id, body.todoId));

			return c.json({ updated: true });
		}
	)
	.post(
		'/',
		zValidator(
			'form',
			z.object({
				name: z.string()
			})
		),
		async (c) => {
			const { user } = ensureLoggedIn(c);

			const body = c.req.valid('form');

			const nId = generateId(100);
			await db.insert(todoTable).values({
				name: body.name,
				completed: false,
				userId: user.id,
				createdAt: new Date(),
				id: nId
			});

			return c.json({ nId });
		}
	);

export default users;
export type UsersType = typeof users;
