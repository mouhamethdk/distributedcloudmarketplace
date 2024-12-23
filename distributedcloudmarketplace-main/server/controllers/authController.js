import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/userModel.js';


const userDb = mongoose.connection.useDb('users');

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await userDb.model('User', User.schema).findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (!['provider', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new (userDb.model('User', User.schema))({ name, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ result: user, token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userDb.model('User', User.schema).findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ result: user, token });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};