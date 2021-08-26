import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./App.module.css";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = (contactFormState) => {
    const { name, number } = contactFormState;
    const newContact = {
      id: uuidv4(),
      name: name,
      number: number,
    };

    const repeatName = this.state.contacts.find(
      ({ name }) => name === contactFormState.name
    );

    if (repeatName !== undefined) {
      alert(`${newContact.name} is already in contact`);
      return;
    }

    this.setState((prevState) => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  filterContacts = (e) => {
    const { value } = e.currentTarget;
    this.setState({
      filter: value,
    });
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div>
        <h1 className={style.title}>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2 className={style.title}>Contacts</h2>
        <Filter filter={filter} filterContacts={this.filterContacts} />
        <ContactList
          contacts={visibleContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
