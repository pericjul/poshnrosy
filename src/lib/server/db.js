import { MongoClient } from 'mongodb';
import { DB_URI } from '$env/static/private';

// Verbindung zur MongoDB aufbauen
const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db('poshnrosy');

// Hilfsfunktion zur Generierung einer neuen numerischen ID
async function generateNextId(collectionName) {
  const collection = db.collection(collectionName);
  const last = await collection.find().sort({ _id: -1 }).limit(1).toArray();
  return last.length && typeof last[0]._id === 'number' ? last[0]._id + 1 : 1;
}

// Boxen
async function getBoxes() {
  try {
    const boxes = await db.collection('boxes').find({}).toArray();
    return boxes.map(box => ({
      ...box,
      _id: box._id.toString(),
      tags: box.tags ?? []
    }));
  } catch (error) {
    console.error('getBoxes error:', error.message);
    return [];
  }
}

async function getBox(id) {
  try {
    const parsedId = parseInt(id);
    const query = isNaN(parsedId) ? { _id: id } : { _id: parsedId };
    const box = await db.collection('boxes').findOne(query);
    return box ? { ...box, _id: box._id.toString() } : null;
  } catch (error) {
    console.error('getBox error:', error.message);
    return null;
  }
}

async function createBox(box) {
  try {
    const newId = await generateNextId('boxes');
    const newBox = { _id: newId, ...box };
    await db.collection('boxes').insertOne(newBox);
    return newId.toString();
  } catch (error) {
    console.error('createBox error:', error.message);
    return null;
  }
}

async function deleteBox(id) {
  try {
    const parsedId = parseInt(id);
    const result = await db.collection('boxes').deleteOne({ _id: parsedId });
    return result.deletedCount === 1;
  } catch (error) {
    console.error('deleteBox error:', error.message);
    return false;
  }
}

async function updateBox(id, updatedFields) {
  try {
    const parsedId = parseInt(id);
    const result = await db.collection('boxes').updateOne(
      { _id: parsedId },
      { $set: updatedFields }
    );
    return result.modifiedCount === 1;
  } catch (error) {
    console.error('updateBox error:', error.message);
    return false;
  }
}

// Bestellungen
async function getOrders() {
  try {
    const orders = await db.collection('orders').find({}).toArray();
    return orders.map(order => ({
      ...order,
      _id: order._id.toString()
    }));
  } catch (error) {
    console.error('getOrders error:', error.message);
    return [];
  }
}

async function createOrder(order) {
  try {
    const newId = await generateNextId('orders');
    const newOrder = { _id: newId, ...order };
    await db.collection('orders').insertOne(newOrder);
    return newId.toString();
  } catch (error) {
    console.error('createOrder error:', error.message);
    return null;
  }
}

async function getOrdersByUser(userId) {
  try {
    const parsedUserId = parseInt(userId);
    const orders = await db.collection('orders')
      .find({ userId: parsedUserId })
      .sort({ date: -1 })
      .toArray();
    return orders.map(order => ({
      ...order,
      _id: order._id.toString()
    }));
  } catch (error) {
    console.error('getOrdersByUser error:', error.message);
    return [];
  }
}

// Tags
async function getTags() {
  try {
    const tags = await db.collection('tags').find({}).toArray();
    return tags.map(tag => ({
      ...tag,
      _id: tag._id.toString()
    }));
  } catch (error) {
    console.error('getTags error:', error.message);
    return [];
  }
}

// Benutzer
async function getUsers() {
  try {
    const users = await db.collection('users').find({}).toArray();
    return users.map(user => ({
      ...user,
      _id: user._id.toString()
    }));
  } catch (error) {
    console.error('getUsers error:', error.message);
    return [];
  }
}

async function createUser(user) {
  try {
    const existing = await db.collection('users').findOne({ username: user.username });
    if (existing) {
      console.warn(`Benutzer "${user.username}" existiert bereits.`);
      return null;
    }

    const newId = await generateNextId('users');
    const userWithId = { _id: newId, ...user };
    await db.collection('users').insertOne(userWithId);
    console.log('Neuer Benutzer erstellt:', user.username);
    return newId.toString();
  } catch (error) {
    console.error('createUser error:', error.message);
    return null;
  }
}

async function deleteUser(id) {
  try {
    const parsedId = parseInt(id);
    const result = await db.collection('users').deleteOne({ _id: parsedId });
    return result.deletedCount === 1;
  } catch (error) {
    console.error('deleteUser error:', error.message);
    return false;
  }
}

// Exportiere alle Funktionen als Objekt
export default {
  getBoxes,
  getBox,
  createBox,
  deleteBox,
  updateBox,
  getOrders,
  createOrder,
  getOrdersByUser,
  getTags,
  getUsers,
  createUser,
  deleteUser
};