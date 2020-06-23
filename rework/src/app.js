import discord from 'discord.js'
import express from 'express'
import chalk from 'chalk'

import config from './src/config/config.js'

import CH from './src/util/handler.js'

let app = express()

app.listen(config.port, () => {
    console.log(
        chalk.magenta('server started')
    )
})

let bot = new discord.Client({
    fetchAllMembers: true,
    disableEveryone: true,
    autorun: true
})

bot.commands = new Discord.Collection()
CH(bot)

bot.login(config.token)
    .them(
        console.log(
            chalk.green('bot logged in.')
        )
    )