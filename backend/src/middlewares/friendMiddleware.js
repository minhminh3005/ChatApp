import Friend from "../models/Friend.js";
import Conversation from "../models/Conversation.js";

const pair = (a, b) => (a < b ? [a, b] : [b, a]);

export const checkFriendship = async (req, res, next) => {
    try {
        const me = req.user._id.toString();
        const {recipientId} = req.body;
        const memberIds = req?.body?.memberIds ?? [];

        if(!recipientId && memberIds.length === 0) {
            return res.status(400).send({error: "Invalid recipient id"});
        }

        if (recipientId) {
            const [userA, userB] = pair(me, recipientId);
            const isFriend = await Friend.findOne({userA, userB});

            if (!isFriend) {
                return res.status(403).json({error: 'You can only message your friends'});
            }

            return next();
        }

        const friendCheck = memberIds.map(async memberId => {
            const [userA, userB] = pair(me, memberId);
            const isFriend = await Friend.findOne({userA, userB});
            return isFriend ? null : memberId;
        })


        const result = await Promise.all(friendCheck);
        const notFriends = result.filter(Boolean);


        if(notFriends.length > 0) {
            return res.status(403).send({message: "You can only message your friends", notFriend: notFriends});
        }

        next();

    } catch (error) {
        console.error('Error in friendship middleware:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

export const checkGroupMemberShip = async (req, res, next) => {
    try {
        const me = req.user._id.toString();
        const {conversationId} = req.body;
        const conversation =  await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({error: 'Conversation not found'});
        }

        const isMember = conversation.participants.some(participant => participant.userId.toString() === me);

        if (!isMember) {
            return res.status(403).json({error: 'You are not a member of this conversation'});
        }
        req.conversation = conversation;

        next();
    } catch (error) {
        console.error('Error in group membership middleware:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
}