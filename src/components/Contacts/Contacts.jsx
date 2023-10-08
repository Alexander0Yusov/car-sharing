import css from './Contacts.module.css';
import ListItem from 'components/ListItem/ListItem';

const Contacts = ({ contactList, deleteContact }) => {
  return (
    <div className={css.container}>
      <ul className={css.contactList}>
        {contactList.map(({ id, name, number, url }) => (
          <ListItem
            key={id}
            id={id}
            name={name}
            number={number}
            url={url}
            deleteContact={deleteContact}
          />
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
