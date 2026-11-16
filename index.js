const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('QR CODE NECHE HAI, SCAN KARO:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot Ready Hai!');
});

client.on('message', async (msg) => {
    const text = msg.body.toLowerCase();
    const name = msg._data.notifyName || 'Dost';

    if (text === 'hi' || text === 'hello' || text === 'salam' || text === 'assalam o alaikum') {
        msg.reply(`Walaikum Salam ${name}! 🤲\nMain Yousaf ka Bot hoon.\n\nMenu ke liye *menu* likho`);
    }
    else if (text === 'menu') {
        msg.reply(`*MENU* 📋\n\n1. *hi* - Salam karne ke liye\n2. *time* - Time janne ke liye\n3. *owner* - Owner ka naam\n4. *joke* - Ek joke sunne ke liye`);
    }
    else if (text === 'time') {
        msg.reply(`Abhi ka time hai: ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}`);
    }
    else if (text === 'owner') {
        msg.reply('Mere Owner ka naam Yousaf hai. ❤️');
    }
    else if (text === 'joke') {
        msg.reply('Teacher: Beta agar tumhe 1 crore mile to kya karoge?\nBacha: Sir, pehle to school chor dunga 😂');
    }
});

client.initialize();
