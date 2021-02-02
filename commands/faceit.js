const axios = require('axios')

const embed = (faceIt) => {
    let {nickname, country, avatar, created_at, csgo_name, skill_level, elo, region, game_id} = faceIt
    return {
        "title": "FACEIT PROFILE",
        "description": nickname,
        "url": `https://www.faceit.com/en/players/${nickname}`,
        "color": "ff7675",
        "footer": {
            "text": "Made by Hịp with ❤"
        },
        "thumbnail": {
            "url": avatar
        },
        "fields": [
            {
                "name": "steamID",
                "value": game_id
            },
            {
                "name": "Steam name",
                "value": csgo_name
            },
            {
                "name": "Created At",
                "value": created_at
            },
            {
                "name": "Level",
                "value": skill_level,
                "inline": true
            },
            {
                "name": "Elo",
                "value": elo,
                "inline": true
            },
            {
                "name": "Country",
                "value": country,
                "inline": true
            },
            {
                "name": "region",
                "value": region,
                "inline": true
            }
        ]
    }
}
const fetchData = async (content) => {
    let json = await axios.get(`http://bunre4l-bot.herokuapp.com/faceit/${encodeURIComponent(content)}`)
    let { data } = await json
    if (data.status) {
        let faceIt = await data.data
        let embedSend = embed(faceIt)
        return await embedSend
    } else {
        let { message } = await data
        return await {
            "title": "ERROR",
            "description": message,
            "url": "https://fb.com/hypnguyen1209",
            "color": "ff7675",
            "footer": {
                "text": "Made by Hịp with ❤"
            },
            "thumbnail": {
                "url": "https://lazi.vn/uploads/users/avatar/1566348532_error-thinkstock-100655502-primary.idge_.jpg"
            }
        }
    }
}

module.exports = (client) => {
    client.on('message', async message => {
        const { content } = message
        if (content.startsWith('.faceit')) {
            let result = await fetchData(content.split('.faceit ')[1])
            await message.channel.send({ embed: result })
        }
    })
}