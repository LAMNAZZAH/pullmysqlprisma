const accountModel = require('../models/account');

const selectUserByUsername = async (req, res) => {
    const { selectByUsername } = accountModel;
    const username = req.params['username']

    await selectByUsername(username).then( data => {
        if (!data.ok)  return res.status(400).json(data);
        return res.status(200).json(data);
    })
}

const editAbout = async (req, res) => {
    const { updateAbout } = accountModel;
    const { userId, about } = req.body

    await updateAbout(userId, about).then(data => {
        if (!data.ok) return res.status(400).json(data)
        return res.status(200).json(data);
    });
}

module.exports = {
    selectUserByUsername,
    editAbout
}