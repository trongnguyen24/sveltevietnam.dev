import { Events } from 'discord.js';

/**
 * @typedef {import('discord.js').ClientEvents} ClientEvents
 * @typedef {import('discord.js').Client} Client
 */

/**
 * @template {keyof ClientEvents} K
 * @typedef {(...args: ClientEvents[K]) => import('discord.js').Awaitable<void>} ClientEventHandler
 */

/**
 * Listen for events from Svelte Vietnam discord guild
 * and send messages as a bot
 */
export class DiscordBot {
  static HELLO_CHANNEL_ID = '1080302429729456148';
  static DISCORD_TESTING_CHANNEL_ID = '1104409592047358113';

  /** @param {Client} client */
  #client;

  /** @type {ClientEventHandler<Events.GuildMemberAdd>} */
  #onGuildMemberAdd;

  /** @param {Client} client */
  constructor(client) {
    this.#client = client;
    this.#onGuildMemberAdd = (member) => {
      const helloChannel = this.#client.channels.cache.get(DiscordBot.DISCORD_TESTING_CHANNEL_ID);
      if (!helloChannel || !helloChannel.isTextBased()) return;
      helloChannel.send(
        `Chào mừng thành viên mới <@${member.user.id}>. Welcome new member <@${member.user.id}> to Svelte Vietnam.`,
      );
    };
    this.#mountEvents();
  }

  #mountEvents() {
    this.#client.on(Events.GuildMemberAdd, this.#onGuildMemberAdd.bind(this));
  }
}
