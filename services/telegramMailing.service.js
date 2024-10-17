require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

class TelegramMailing {
    constructor() {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        this.bot = new TelegramBot(token);
    }

    SendLead(data) {
        const userId = process.env.TELEGRAM_USER_ID;

        if (userId) {
            this.bot.sendMessage(userId, data);
        } else {
            console.error('User ID is not set.');
        }
    }
}

module.exports = new TelegramMailing();
