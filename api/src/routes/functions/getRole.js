const {User} = require("../../db");

const getRole = async (req, res) => {
    const id = req.params.id;
        const user = await User.findByPk(id);
        if (user) {
            res.send(user.typeUser);
        }else{
            res.send('not user');
        }
}

module.exports =getRole;