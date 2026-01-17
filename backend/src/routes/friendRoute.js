import express from 'express';

import {
    acceptFriendRequest,
    sendFriendRequest,
    rejectFriendRequest,
    getAllFriends,
    getFriendRequests
} from "../controllers/friendController.js";

const router = express.Router();

router.post("/requests", sendFriendRequest);

router.post("/requests/:requestId/accept", acceptFriendRequest);

router.post("/requests/:requestId/reject", rejectFriendRequest);

router.get("/", getAllFriends);

router.get("/requests", getFriendRequests);

export default router;
