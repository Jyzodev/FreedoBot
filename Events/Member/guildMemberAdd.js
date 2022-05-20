const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js")

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {

        const { user, guild } = member;

        member.roles.add("974359118959759441");
        const Welcomer = new WebhookClient({
            id: "974362089768513627",
            token: "AcMaSzB1M3hrqngVfnbUexorlHpcNGeMAWp16QzVL98Su2gh5Dl_IfJ38W1IRXzmqbK0"
        });

        const Welcome = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome ${member} to the **${guild.name}**!\n
        Account created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter(`ID : ${user.id}`)

        Welcomer.send({embeds: [Welcome]})
    }
}