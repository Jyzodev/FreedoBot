const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     * 
     * @param {Message} message 
     */
    execute(message) {
        if(message.author.bot) return;
        
        const Log = new MessageEmbed()
        .setColor("RED")
        .setDescription(`📕 A [message](${message.url}) by ${message.author.tag} was **deleted**.\n
            **Deleted Message:**\n ${message.content ? message.content : "None"}`.slice(0, 4096))

        if(message.attachments.size >= 1){
            Log.addField(`Attachements:`, `${message.attachments.map(a => a.url)}`, true)
        }

        new WebhookClient({url: "https://discord.com/api/webhooks/974732653809008640/j7_CDSWNUjiavEjlMhXrUeCjqPMl-Rtoks9yAi5VthLPkguU5X6nUsG4vRPhCpK6v9cw"}).send({embeds: [Log]}).catch((err) => { console.log(err)});
    }
}