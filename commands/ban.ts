import { Command } from '@discord-ts-app/class-decorator'
import Roles from 'App/Configurations/Roles'
import { Message } from 'discord.js'

@Command({ name: 'Ban', description: 'Ban the targeted user', tag: 'ban', roles: [Roles.ADMINISTRATOR] })
export default class Ban {
	public async run(message: Message, args: string[]): Promise<void> {
		const target = message.mentions.users.first()
		const duration = parseInt(args[0])
		const reason = args.slice(1).join(' ')

		if (!target) return await message.reply('Please target a member to ban')
		if (!duration) return await message.reply('Please define a duration')

		try {
			const member = message.guild?.members.cache.get(target.id)
			await member?.ban({ days: duration, reason })
		} catch (error) {
			await message.reply('An error has occurred, please contact an administrator.')
		}
	}
}
