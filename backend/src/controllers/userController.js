export const authMe= async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({user});
    } catch (error) {
        console.error('Error in authMe controller:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

export const test= async (req, res) => {
    return res.sendStatus(204);
}