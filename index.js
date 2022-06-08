const contactsOptions = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await contactsOptions.listContacts();
      console.log(contacts);
      break;
  }
};

invokeAction({ action: 'list' });
