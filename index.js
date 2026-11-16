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

    if (text === 'hi' || text === 'hello' || text === 'salam' || text === 'assalam o alaikum' || text === 'السلام علیکم') {
        msg.reply(`وعلیکم السلام ${name}! 🤲\nمیں یوسف کا بوٹ ہوں۔\nMenu ke liye *menu* likho / مینیو کے لیے *menu* لکھو`);
    }
    else if (text === 'menu') {
        msg.reply(`*MENU* 📋 / *مینیو*\n\n1. *hi* - Salam karne ke liye / سلام کرنے کے لیے\n2. *time* - Time janne ke liye / ٹائم جاننے کے لیے\n3. *owner* - Owner ka naam / مالک کا نام\n4. *joke* - Ek joke sunne ke liye / ایک لطیفہ سننے کے لیے`);
    }
    else if (text === 'time') {
        msg.reply(`ابھی کا ٹائم ہے: ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}\nCurrent Time is above.`);
    }
    else if (text === 'owner') {
        msg.reply('میرے مالک کا نام یوسف ہے۔ ❤️\nMy Owner name is Yousaf.');
    }
    else if (text === 'joke') {
        msg.reply('استاد: بیٹا اگر تمہیں 1 کروڑ ملے تو کیا کرو گے؟\nبچہ: سر، پہلے تو اسکول چھوڑ دوں گا 😂\n\nTeacher: What will you do if you get 1 Crore?\nStudent: Sir, first I will leave school 😂');
    }
});

client.initialize();
