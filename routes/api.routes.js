const express = require('express');
const pick = require('lodash/pick');
const TelegramMailing = require('../services/telegramMailing.service');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const institutionsData = require('../assets/json/institution_database.json');

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
            // const filePath = path.join(__dirname, '../assets/json/institution_database.json');

            // fs.readFile(filePath, 'utf8', (err, data) => {
            //     if (err) {
            //         console.error('Error reading JSON file:', err);
            //         return res.status(500).json({ message: 'Failed to retrieve institutions' });
            //     }
            //     const institutionsData = JSON.parse(data);
                
            // });
            res.status(200).json({ data: institutionsData });
        } catch (error) {
            console.error('Error retrieving institutions:', error);
            res.status(500).json({ message: 'Failed to retrieve institutions' });
        }
    });

router
    .post('/institutions/search', async (req, res) => {
        try {
            const { value, operator = 'contains' } = pick(req.body, ['value', 'operator']);
    
            if (value === undefined) {
                return res.status(400).json({
                    message: 'Missing required search parameters: field and value'
                });
            }
    
            const predicates = {
                equals: (val) => val === value,
                contains: (val) => typeof val === 'string' && val.toLowerCase().includes(value.toLowerCase()),
                greaterThan: (val) => typeof val === 'number' && val > value,
                lessThan: (val) => typeof val === 'number' && val < value,
                startsWith: (val) => typeof val === 'string' && val.toLowerCase().startsWith(value.toLowerCase()),
                endsWith: (val) => typeof val === 'string' && val.toLowerCase().endsWith(value.toLowerCase())
            };
    
            const predicate = predicates[operator] || predicates.contains;
    
            const results = findPathsByPredicate(institutionsData, predicate);
    
            res.status(200).json({
                success: true,
                count: results.length,
                data: results
            });
    
        } catch (error) {
            console.error('Error searching institutions:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to search institutions',
                error: error.message
            });
        }
    });
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


function findPathsByPredicate(obj, predicate) {
    const paths = [];
    
    function searchRecursively(current, currentPath = []) {
        if (Array.isArray(current)) {
            current.forEach((item, index) => {
                searchRecursively(item, [...currentPath, index]);
            });
            return;
        }
        
        if (current && typeof current === 'object') {
            Object.entries(current).forEach(([key, value]) => {
                if (predicate(value)) {
                    paths.push({
                        path: [...currentPath, key].join('.'),
                        value: value
                    });
                }
                
                searchRecursively(value, [...currentPath, key]);
            });
            return;
        }
    }
    
    searchRecursively(obj);
    return paths;
}

module.exports = router;