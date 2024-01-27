import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = ({ onSuccess, contactId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (contactId) {
      console.log("contactId", contactId);
      axios.get(`http://localhost:3000/contacts/contact?_id=${contactId}`)
        .then(response => {
          const contactData = response.data.data[0];
          if (contactData) {
            setName(contactData.name);
            setEmail(contactData.email);
            setPhone(contactData.phone);
          }
        })
        .catch(error => console.error('Error fetching contact details:', error));
    }
  }, [contactId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (contactId) {
        // If contactId is present, it's an update operation (PATCH)
        response = await axios.patch('http://localhost:3000/contacts/update', {
          _id: contactId,
          name,
          email,
          phone,
        });
      } else {
        // If contactId is null, it's an add operation (POST)
        response = await axios.post('http://localhost:3000/contacts/save', {
          name,
          email,
          phone,
        });
      }

      if (response.status === 200) {
        onSuccess();
      } else {
        console.error('Error submitting contact form:', response.data.message);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Phone:
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <br />
      <button type="submit">{contactId ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default ContactForm;
