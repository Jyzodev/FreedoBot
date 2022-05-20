const { Events } = require("../Validation/EventNames");

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Events Loaded");

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            Table.addRow(event.name || "MISSING", `⛔ Event name is either invalid or missing: ${L[L.length - 2]}/${L[L.length - 1]}`);
            return;
        }

        if(event.once){
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.name, "✔️ SUCCESFUL")

    });

    console.log(Table.toString());

}