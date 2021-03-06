const { CommandInteraction, MessageEmbed, Client } = require('discord.js');

module.exports = {
    name: "music",
    description: "Jyzo's music system.",
    options: [
        {
            name: "play",
            description: "Play a song.",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "Provide a Song's name or url!", type: "STRING", required:true}]
        },
        {
            name: "volume",
            description: "Change bot's volume",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "1 = 1 % | 20 = 20%", type: "NUMBER", required: true}]
        },
        {
            name: "settings",
            description: "Select an option.",
            type: "SUB_COMMAND",
            options: [{ name: "options", description: "Select an option!", type: "STRING", required: true,
            choices: [
                {name: "π£ Show Queue", value: "queue"},
                {name: "β­οΈ Skip Song", value: "skip"},
                {name: "βΈοΈ Pause song", value: "pause"},
                {name: "β―οΈ Resume song", value: "resume"},
                {name: "βΉοΈ Stop song", value: "stop"},
                {name: "π Shuffle Queue", value: "shuffle"},
                {name: "π Toggle Autoplay Modes", value: "AutoPlay"},
                {name: "π Add a Related Song", value: "RelatedSong"},
                {name: "π Toggle Repeat Mode", value: "RepeatMode"}
            ]}]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
        return interaction.reply({content: "You must be in a voice channel.", ephemeral: true});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `Im already playing a music in <#${guild.me.voice.channelId}>`, ephemeral: true});

        try {
            switch(options.getSubcommand()) {
                case "play" : {
                    client.distube.playVoiceChannel( VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                    return interaction.reply({content: "π request received."});
                }
                case "volume" : {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({content: "Specify a number between 1 and 100."})

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `π Volume has been set to : \`${Volume}%\``});
                }
                case "settings" : {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue)
                    return interaction.reply({content: "β There is no queue!"})

                    switch(options.getString("options")) {
                        case "skip" : 
                        await queue.skip(VoiceChannel);
                        return interaction.reply({content: "β­οΈ Song has been skipped."});

                        case "stop" : 
                        await queue.stop(VoiceChannel);
                        return interaction.reply({content: "βΉοΈ Song has been stopped."});

                        case "pause" : 
                        await queue.pause(VoiceChannel);
                        return interaction.reply({content: "βΈοΈ Song has been paused."});

                        case "resume" : 
                        await queue.resume(VoiceChannel);
                        return interaction.reply({content: "β―οΈ Song has been resumed."});

                        case "RelatedSong" : 
                        await queue.addRelatedsong(VoiceChannel);
                        return interaction.reply({content: "π A related song has been added to Queue."});

                        case "AutoPlay" : 
                        let Mode = await queue.toggleAutoplay(VoiceChannel);
                        return interaction.reply({content: `π AutoPlay Mode is set to: ${Mode ? "On" : "Off"}`});

                        case "shuffle" : 
                        await queue.shuffle(VoiceChannel);
                        return interaction.reply({content: "π The queue has been shuffled."});

                        case "RepeatMode" : 
                        let Mode2 = await client.distube.setRepeatMode(queue);
                        return interaction.reply({content: `π Repeat Mode is set to: ${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}`});

                        case "queue" : 
                        return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("PURPLE")
                        .setDescription(`${queue.songs.map(
                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
                        )]});
                    }
                    return;
                }
            }
        } catch(e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`β Alert: ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}