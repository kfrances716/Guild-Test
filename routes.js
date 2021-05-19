const { Router } = require('express');
const mongoose = require('mongoose');
const User = require('./model/User');
const router = Router();

router.put('/user/:username', async function (req, res, next) {
    try {
        const { username } = req.params;
        const user = new User({
            user: username
        });

        await user.save().catch(() => {
            throw new Error('Unable to create user');
        });
        res.json({
            result: `User: ${username} created`
        });
    } catch (error) {
        return next(error);
    }
});

router.get('/messages/:receiver', async function (req, res, next) {
    try {
        const { receiver } = req.params;
        let today = new Date();
        today.setDate(today.getDate() - 30);

        const result = await User.findOne(
            {
                user: receiver,
                'messages.created_at': { $gte: today }
            }, { messages: { $slice: -100 } });


        const message = result.messages.reverse();

        res.json({
            result: message
        });
    } catch (error) {
        return next(error);
    }
});

router.get('/messages/:receiver/:sender', async function (req, res, next) {
    try {
        const { sender, receiver } = req.params;
        const today = new Date();
        today.setDate(today.getDate() - 30);

        const result = await User.find(
            {
                user: receiver,
                'messages.created_at': { $gte: today },
            });
        if (result[0].messages) {
            const unorderedMessages = [];
            result[0].messages.forEach((message) => {
                if (message.author === sender) {
                    unorderedMessages.push(message)
                }
            });

            const orderedMessages = unorderedMessages.reverse().slice(0, 100);
            res.json({
                result: orderedMessages
            });
        } else {
            res.json({
                result: "No messages"
            });
        }
    } catch (error) {
        return next(error);
    }
});

router.put('/messages/:receiver/:sender', async function (req, res, next) {
    try {
        const { receiver, sender } = req.params;
        const { message } = req.body;
        console.log(message);

        if (!message) {
            throw new Error("No message received")
        }

        const filter = { user: receiver };

        let user = await User.findOne({ user: receiver }).exec();
        if (!user) {
            user = new User({
                user: receiver
            });

            await user.save().catch(() => {
                throw new Error('Unable to create user');
            });
        }

        user.messages.push({
            content: message,
            author: sender,
            created_at: new Date(),
        });

        await User.findOneAndUpdate(filter, user, { new: true })
            .exec()
            .catch(() => {
                throw new Error('Unable to send message');
            });;
        res.json({
            result: "Message Sent!"
        });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;