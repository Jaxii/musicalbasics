import discord from 'discord.js'
import express from 'express'
import chalk from 'chalk'

import vE from './src/util/someVars.js'
import config from './src/config/config.js'
import CH from './src/util/handler.js'

let app = express()

app.listen(config.port, () => {
    console.log(
        chalk.magenta('server started')
    )
})

vE.bot.commands = new Discord.Collection()
CH(vE.bot)

vE.bot.login(config.token)
    .them(
        console.log(
            chalk.green('bot logged in.')
        )
    )