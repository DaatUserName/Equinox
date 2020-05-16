const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "removerole",
        description: "remove a role to a member of the guild!",
        usage: "!removerole",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["rr", "roleremove"]
    },
    run: async (bot, message, args) => {
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!Member) {
            return message.reply("No user?");
        }

        const roles = message.guild.roles.cache.find(r => r.name === args[1]) || message.mentions.roles.first();

        if (!roles) {
            return message.reply("roles not found!");
        }

        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
            return message.channel.send("I don't have permission to perform this command.");
        }

        if (Member) {
            Member.roles.remove(roles.id)
            message.channel.send(`The roles, ${roles.name}, has been removed from ${Member.displayName}.`)
        }
    }
}