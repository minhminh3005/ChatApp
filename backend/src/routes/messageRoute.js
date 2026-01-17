import express from 'express';

import {sentGroupMessage, sentDirectMessage} from "../controllers/messageController.js";
import {checkFriendship, checkGroupMemberShip} from "../middlewares/friendMiddleware.js";

const router = express.Router();

router.post('/direct',checkFriendship, sentDirectMessage);

router.post('/group', checkGroupMemberShip, sentGroupMessage);

export default router;