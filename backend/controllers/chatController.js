const Message = require("../models/Message");

// Send a message
const sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;

        const message = new Message({ sender: req.user.id, receiver: receiverId, content });
        await message.save();

        res.status(201).json({ message: "Message sent", message });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get messages between two users
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user.id }
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { sendMessage, getMessages };
