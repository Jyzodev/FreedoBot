const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js")

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {

        const { user, guild } = member;

        const Loger = new WebhookClient({
            //id: "973678925152653383",
            //token: "tZE0sjVTuyCCXWji3S2lQIoE6qrBjau0EZ2i0vsFYUqSZ2p84_6zodyYCa1K9zN4baUd"
            id: "974365909382725632",
            token: "qV9kv9TtARJ7eosF-ZJ0pKuF2cDb7SSUp67NvOJnMiPiCZ7EdUB0wRVB4zstJpJ3-Rnn"
        });

        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
         ${member} has left the server!\n
        Joined : <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter(`ID : ${user.id}`)

        Loger.send({embeds: [Welcome]})
    }
}