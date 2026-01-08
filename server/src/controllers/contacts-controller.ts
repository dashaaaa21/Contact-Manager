import { Response } from 'express';
import Contact from '../models/Contact';
import { AuthRequest } from '../middleware/auth';

export const getContacts = async (req: AuthRequest, res: Response) => {
  try {
    const contacts = await Contact.find({ userId: req.userId });
    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Get contacts error', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createContact = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, phone, email, avatar, gender, status, favorite } = req.body;

    const contact = await Contact.create({
      userId: req.userId,
      firstName,
      lastName,
      phone,
      email,
      avatar,
      gender,
      status,
      favorite,
    });

    return res.status(201).json(contact);
  } catch (error) {
    console.error('Create contact error', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateContact = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, email, avatar, gender, status, favorite } = req.body;

    const contact = await Contact.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { firstName, lastName, phone, email, avatar, gender, status, favorite },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.status(200).json(contact);
  } catch (error) {
    console.error('Update contact error', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteContact = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findOneAndDelete({ _id: id, userId: req.userId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    console.error('Delete contact error', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
