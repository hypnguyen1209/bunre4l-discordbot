const app = require('express')()
const Discord = require('discord.js')
const client = new Discord.Client()
const steam = require('./commands/steam')
const faceit = require('./commands/faceit')

steam(client)
faceit(client)

client.on('ready', () => {
    console.log('Ready!')
    client.user.setPresence({
        activity: {
            name: 'Counter-Strike: Global Offensive',
            type: 0
        }
    })
})
app.get('/', (req, res) => {
    res.send('Running...')
})
const PORT = process.env.PORT || 3500
app.listen(3500, () => {
    console.log('Running...')
})
client.login('token')