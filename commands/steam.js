const axios = require('axios')

const embed = async (banPlayer, infoPlayer) => {
    let { CommunityBanned, VACBanned, NumberOfGameBans, DaysSinceLastBan } = banPlayer
    let { personaname, profileurl, avatarmedium, steamid, realname, timecreated, loccountrycode, level } = infoPlayer
    return await {
        "title": "STEAM PROFILE",
        "description": personaname,
        "url": profileurl,
        "color": "ff7675",
        "footer": {
            "text": "Made by Hịp with ❤"
        },
        "thumbnail": {
            "url": avatarmedium
        },
        "fields": [
            {
                "name": "SteamId",
                "value": steamid
            },
            {
                "name": "Created At",
                "value": new Date(timecreated * 1000)
            },
            {
                "name": "Level",
                "value": level
            },
            {
                "name": "Real Name",
                "value": realname
            },
            {
                "name": "Location Code",
                "value": loccountrycode
            },
            {
                "name": " Community Banned ",
                "value": `${CommunityBanned}`,
                "inline": true
            },
            {
                "name": " VAC Banned ",
                "value": `${VACBanned}`,
                "inline": true
            },
            {
                "name": "Number Of Game Bans ",
                "value": `${NumberOfGameBans}`,
                "inline": true
            },
            {
                "name": "Days Since Last Ban ",
                "value": `${DaysSinceLastBan}`,
                "inline": true
            }
        ]
    }
}

const fetchData = async (content) => {
    let json = await axios.get(`http://bunre4l-bot.herokuapp.com/steam/${encodeURIComponent(content)}`)
    let { data } = await json
    if (data.status) {
        let { banPlayer, infoPlayer } = data.data
        let embedSend = await embed(banPlayer, infoPlayer)
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
        if (content.startsWith('.steam')) {
            let result = await fetchData(content.split('.steam ')[1])
            await message.channel.send({ embed: result })
        }
    })
}