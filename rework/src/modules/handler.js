// to re-evaluate to full ES6 at a later point. 

import fs from 'fs'
import util from 'util'
import chalk from 'chalk'
import config from '../config/config.js'

// not entirely needed

import Discord from 'discord.js'

// define some stuff

let promisify = util.promisify
let readdir = promisify(fs.readdir)


const CH = (bot) => {

    fs.readdir(__dirname + `/../commands`, (err, files) => {
        if (err) console.log(chalk.red(err))
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
        if (jsfile.length <= 0) {
            console.log(chalk.blue('nothing to load'))
            return
        }

        jsfile.forEach((files, i) => {
            let props = require(`../commands/${files}`)
            console.log(chalk.green('[Console] ') + chalk.yellow(files) + ' has been loaded')
            bot.commands.set(props.help.name, props)
        })


    })

    bot.on('message', (m) => {
        if (m.author.bot) return
        if (m.channel.type === 'dm') return

        let pref = config.prefix
        let mA = m.content.split(' ')
        let cmd = mA[0]
        let args = mA.slice(0)

        if (!cmd.startsWith(pref)) return
        let cmdF = bot.commands.get(cmd.slice(pref.length))
        if (cmdF) cmdF.run(bot, m, args)

    })

}

export default CH