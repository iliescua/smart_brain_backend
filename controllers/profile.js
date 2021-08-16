const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        (user.length) ? res.json(user[0]) : res.status(400).json("No user data");
    }).catch(err => res.status(400).json("Error getting user"));
}

export default handleProfile;