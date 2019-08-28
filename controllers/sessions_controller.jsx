import { User} from '../models/user';

const index = (req, res) => {
    User.find({})
        .select('username')
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(400).send(err.errors);
        })
}

export default {
    index
}
