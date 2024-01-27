import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';
import Modal from './Modal';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editContactId, setEditContactId] = useState(null);

  const refreshContactList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/contacts/');
      setContacts(response.data.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    refreshContactList();
  }, []);

  const handleAddContactSuccess = () => {
    refreshContactList();
    setIsAddFormVisible(false);
  };

  const handleEditContact = (contactId) => {
    setEditContactId(contactId);
  };

  const handleEditContactSuccess = () => {
    refreshContactList();
    setEditContactId(null);
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/contacts/delete?_id=${contactId}`);

      if (response.status === 200) {
        refreshContactList();
      } else {
        console.error('Error deleting contact:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div>
      <h2>Contact List</h2>
      <button onClick={() => setIsAddFormVisible(true)}>Add Contact</button>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.phone}
            <button onClick={() => handleEditContact(contact._id)}>Edit</button>
            <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {isAddFormVisible && (
        <Modal onClose={() => setIsAddFormVisible(false)}>
          <ContactForm onSuccess={handleAddContactSuccess} />
        </Modal>
      )}
      {editContactId && (
        <Modal onClose={() => setEditContactId(null)}>
          <ContactForm onSuccess={handleEditContactSuccess} contactId={editContactId} />
        </Modal>
      )}
    </div>
  );
};

export default ContactList;
