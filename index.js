const { program } = require('commander');
const contactsOperations = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contactsOperations.listContacts();
      console.log(allContacts);
      break;

    case 'get':
      const getContactById = await contactsOperations.getContactById(id);
      if (!getContactById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(getContactById);
      break;

    case 'add':
      const addContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(addContact);
      break;

    case 'update':
      const updateContacts = await contactsOperations.updateContact(
        id,
        name,
        email,
        phone
      );
      if (!updateContacts) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(updateContacts);
      break;

    case 'remove':
      const removeContacts = await contactsOperations.removeContact(id);
      if (!removeContacts) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(removeContacts);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
