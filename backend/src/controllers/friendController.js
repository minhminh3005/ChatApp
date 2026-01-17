import Friend from "../models/Friend.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export const sendFriendRequest = async (req, res) => {
    try {
        const {to, message} = req.body;
        const from = req.user._id;

        if (from === to) {
            return res.status(400).json({error: 'You cannot send a friend request to yourself'});
        }

        const userExists = await User.exists({_id: to});

        if (!userExists) {
            return res.status(404).json({error: 'The user you are trying to send a friend request to does not exist'});
        }

        let userA = from.toString();
        let userB = to.toString();

        if (userA > userB) {
            [userA, userB] = [userB, userA];
        }

        const [alreadyFriends, existingRequest] = await Promise.all([
            Friend.findOne({userA, userB}),
            FriendRequest.findOne({
                $or: [
                    {from, to},
                    {from: to, to: from}
                ]
            })
        ])

        if (alreadyFriends) {
            return res.status(400).json({error: 'You are already friends with this user'});
        }

        if (existingRequest) {
            return res.status(400).json({error: 'A friend request already exists between you and this user'});
        }

        const request = await FriendRequest.create({
            from,
            to,
            message
        })

        return res.status(201).json({message: 'Friend request sent successfully', request});

    } catch (error) {
        console.error('Error sending friend request:', error);
    }
}

export const acceptFriendRequest = async (req, res) => {
    try {
        const {requestId} = req.params;
        const userId = req.user._id;

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({error: 'Friend request not found'});
        }

        if (friendRequest.to.toString() !== userId.toString()) {
            return res.status(403).json({error: 'You are not authorized to accept this friend request'});
        }

        const friendship = await Friend.create({
            userA: friendRequest.from,
            userB: friendRequest.to
        });


        await FriendRequest.findByIdAndDelete(requestId);

        const from = await User
            .findById(friendRequest.from)
            .select('_id displayName avatarUrl').lean();

        return res.status(200).json({
            message: 'Friend request accepted successfully',
            newFriend: {
                _id: from?._id,
                displayName: from?.displayName,
                avatarUr: from?.avatarUrl
            }
        });
    } catch (error) {
        console.error('Error accepting friend request:', error);
    }
}

export const rejectFriendRequest = async (req, res) => {
    try {
        const {requestId} = req.params;
        const userId = req.user._id;

        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
            return res.status(404).json({error: 'Friend request not found'});
        }

        if (friendRequest.to.toString() !== userId.toString()) {
            return res.status(403).json({error: 'You are not authorized to reject this friend request'});
        }

        await FriendRequest.findByIdAndDelete(requestId);

        return res.status(200).json({message: 'Friend request rejected successfully'});
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

export const getAllFriends = async (req, res) => {
    try {
        const userId = req.user._id;

        const friendships = await Friend.find({
            $or: [
                {userA: userId},
                {userB: userId}
            ]
        })
            .populate('userA', '_id displayName avatarUrl')
            .populate('userB', '_id displayName avatarUrl')
            .lean();

        const friends = friendships.map(friendship => {
            if (friendship.userA._id.toString() === userId.toString()) {
                return friendship.userB;
            } else {
                return friendship.userA;
            }
        });

        return res.status(200).json({friends});
    } catch (error) {
        console.error('Error fetching friends:', error);
    }
}

export const getFriendRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const populateFields = '_id username displayName avatarUrl'
        const [sentRequests, receivedRequests] = await Promise.all([
            FriendRequest.find({from: userId}).populate('to', populateFields).lean(),
            FriendRequest.find({to: userId}).populate('from', populateFields).lean()
        ]);
        return res.status(200).json({sentRequests, receivedRequests});
    } catch (error) {
        console.error('Error fetching friend requests:', error);
    }
}