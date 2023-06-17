'use strict';

import FastifyHelmet from '@fastify/helmet';
import FastifyWebsocket from '@fastify/websocket';
import Fastify from 'fastify';

import { FastifyDiscord } from './discord.js';
import { FastifyEnv } from './env.js';

const fastify = Fastify({
  logger: true,
});

await fastify
  .register(FastifyEnv)
  .register(FastifyDiscord)
  .register(FastifyWebsocket)
  .register(FastifyHelmet);

fastify.get('/', async (request, reply) => {
  reply.redirect(301, fastify.env.DISCORD_SVELTEVIETNAM_INVITE_URL);
});

fastify.get('/websocket', { websocket: true }, (connection, request) => {
  request.discord.connect(connection);
});

/**
 * Run the server!
 */
try {
  await fastify.ready();
  await fastify.listen({ port: 5006 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
