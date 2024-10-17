const express = require('express');
const pick = require('lodash/pick');
const TelegramMailing = require('../services/telegramMailing.service');

const router = express.Router();

router
    .route('/lead')
    .post(async (req, res) => {
        try {
            const leadData = pick(req.body, ['service', 'name', 'email', 'messengerId', 'messengerType', 'budget', 'description']);
            const message = `
                New Lead:
                Name: ${leadData.name}
                Email: ${leadData.email}
                Service: ${leadData.service}
                Messenger Type: ${leadData.messengerType}
                Messenger ID: ${leadData.messengerId}
                Budget: ${leadData.budget}
                Description: ${leadData.description}
            `;

            TelegramMailing.SendLead(message);

            res
                .header('Location', `${req.protocol}://${req.hostname}`)
                .status(201)
                .json({ message: 'Lead sent successfully!' });
        } catch (error) {
            console.error('Error sending lead:', error);
            res.status(500).json({ message: 'Failed to send lead' });
        }
    });

module.exports = router;