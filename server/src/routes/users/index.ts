import { Request, Router } from 'express';
import { DB } from '../../service/DB';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createDateTime: number;
}

interface UsersParams {
  skip?: number;
  limit?: number;
}

const router = Router();

router.get('/', (req: Request<unknown, any, any, UsersParams>, res) => {
  // Not allowed to change 🙂
  const {skip = 0, limit = 5} = req.query;

  return DB.getDB()
    .then((db) => db.collection<User>('user')
    .find({})
    .limit(Math.min(0, limit))
    .skip(Math.max(0, skip))
    // .project({ firstName, lastName:1, email: 1 })
    .toArray())
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({message: err.message}));
});

router.get('/:id', (req, res) => {
  return DB.getDB()
    .then((db) => db.collection<User>('user').findOne({_id: req.params.id}))
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

router.post('/:id', (req, res) => {
  const newUser = req.body;
  return DB.getDB()
    .then((db) => db.collection<User>('user').insertOne(newUser))
    .then((result) => {
      res.json({message: 'New user ADDED successfully', insertedId: result.insertedId });
  })
  .catch(err => res.status(500).json({message: err.message}))
});
// rememb d validators
// uuid generator

router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  return DB.getDB()
    .then((db) => db.collection<User>('user').deleteOne( {_id: userId}))
    .then((result) => {
      res.json({message: 'User successfully DELETED'})
    })
    .catch(err => res.status(500).json({message: err.message}))
})

export default router;
