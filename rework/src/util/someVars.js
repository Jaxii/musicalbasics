import Discord from 'discord.js'

let vE = {
    bot: new Discord.Client({
        autoReconnect: true,
        fetchAllMembers: true,
        disableEveryone: true,
        autorun: true
    })

}

export default vE