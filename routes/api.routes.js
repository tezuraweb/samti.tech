const express = require('express');
const pick = require('lodash/pick');
const TelegramMailing = require('../services/telegramMailing.service');
const fs = require('fs');
const path = require('path');

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

router
    .route('/institutions')
    .get((req, res) => {
        try {
            const filePath = path.join(__dirname, '../assets/json/institution_database.json');

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading JSON file:', err);
                    return res.status(500).json({ message: 'Failed to retrieve institutions' });
                }
                const institutionsData = JSON.parse(data);
                res.status(200).json({ data: institutionsData });
            });
        } catch (error) {
            console.error('Error retrieving institutions:', error);
            res.status(500).json({ message: 'Failed to retrieve institutions' });
        }
    })
    // .post((req, res) => {
    //     try {
    //         const filePath = path.resolve(__dirname, '../assets/json/institution_database.json');
    //         console.log('File path:', filePath);


    //         const newInstitution = {
    //             name: req.body.name,
    //             region: req.body.region,
    //             city_id: req.body.city_id,
    //             institution_type: req.body.institution_type,
    //             description: req.body.description,
    //         };

    //         fs.readFile(filePath, 'utf8', (err, data) => {
    //             if (err) {
    //                 console.error('Error reading JSON file:', err);
    //                 return res.status(500).json({ message: 'Failed to save institution' });
    //             }

    //             const institutionsData = JSON.parse(data);
    //             institutionsData.push(newInstitution);

    //             fs.writeFile(filePath, JSON.stringify(institutionsData, null, 2), (writeErr) => {
    //                 if (writeErr) {
    //                     console.error('Error writing JSON file:', writeErr);
    //                     return res.status(500).json({ message: 'Failed to save institution' });
    //                 }

    //                 res.status(201).json({
    //                     message: 'Institution added successfully!',
    //                     institution: newInstitution,
    //                 });
    //             });
    //         });
    //     } catch (error) {
    //         console.error('Error saving institution:', error);
    //         res.status(500).json({ message: 'Failed to save institution' });
    //     }
    // });

module.exports = router;