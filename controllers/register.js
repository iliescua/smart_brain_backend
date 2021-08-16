const handleRegister = (req, res, bcrypt, db) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password){
        return res.status(400).json("Incorrect form submission");
    }
    // Generate salt
    const salt = bcrypt.genSaltSync(10);
    // Generate Hash
    const hash = bcrypt.hashSync(password, salt);

    // Connect login and user databases 
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        }).into('login').returning('email')
        .then(loginEmail => {
            return trx('users')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .returning('*')
            .then(user => {
                res.json(user[0]);
            })
        }).then(trx.commit).catch(trx.rollback)
    }).catch(err => res.status(400).json("Unable to register"));
}

export default handleRegister;