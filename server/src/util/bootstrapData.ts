import axios from 'axios';
import { User } from '../routes/users';
import { DB } from '../service/DB';
import { generateDateTime } from './generateDateTime';

export async function bootstrapData() {
  console.info('Bootstrapping data');
  const db = await DB.getDB();
  const usersResponse = await axios('https://fakerapi.it/api/v1/custom?_quantity=300&_id=uuid&firstName=firstName&lastName=lastName&email=email');
  const userCollection = db.collection<User>('user');
  const data = <Array<Omit<User, 'createDateTime'>>>usersResponse.data.data;
  const users = data
    .map((user) => ({...user, createDateTime: generateDateTime()}))
    .sort((a, b) => a.createDateTime - b.createDateTime);

  await userCollection.insertMany(users);
  console.info('Data bootstrapped');
}
