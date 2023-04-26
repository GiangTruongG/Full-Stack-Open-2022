import { useEffect, useState } from 'react';
import './App.css';
import PersonForm from './PersonForm/PersonForm';
import PersonsRendered from './PersonsRendered/PersonsRendered';
import SearchFilter from './SearchFilter/SearchFilter';
import personsModule from './modules/persons';
import Notification from './Notification/Notification';

function App() {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  useEffect(() => {
    personsModule.getPersons()
      .then(response => {
        setPersons(response.data)
      });
  }, []);

  const [searchResult, setSearchResult] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumbers, setNewNumbers] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [isAnError, setIsAnError] = useState(false);

  const handleSearchField = (event) => {
    setSearchTerm(event.target.value);

    let filteredResults = persons.filter(person => person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
    setSearchResult(filteredResults);
  };

  const handleInputName = (event) => {
    setNewName(event.target.value);
  };

  const handleInputNumbers = (event) => {
    setNewNumbers(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = { name: newName, number: newNumbers };

    const isPersonExsisted = persons.find(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase());

    if (isPersonExsisted) {
      if (window.confirm(`${isPersonExsisted.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personsModule.updatePerson(isPersonExsisted.id, {...newPerson, id: isPersonExsisted.id})
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== isPersonExsisted.id ? person : updatedPerson.data));
            setNewName('');
            setNewNumbers('');
            setMessage(`Phone number for ${updatedPerson.data.name} has been updated!`);
            setTimeout(() => {
              setMessage('');
            }, 3000);
          })
          .catch(error => {
            setMessage(`${isPersonExsisted.name} had already been removed from the list!`);
            setPersons(persons.filter(person => person.id !== isPersonExsisted.id));
            setIsAnError(true);
            setNewName('');
            setNewNumbers('');
            setTimeout(() => {
              setMessage('');
            }, 3000);
          });
      };
      return
    }

    personsModule.addPerson(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumbers('');
        setMessage(`${response.data.name} has been added to the list!`);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      })
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this person from your list?')) {
      const deletedPerson = persons.find(person => person.id === id);
      personsModule.deletePerson(id)
      .then(response => {
        setMessage(`${deletedPerson.name} has been removed from the list!`);
        setTimeout(() => {
          setMessage('');
        }, 3000);
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        setMessage(`${deletedPerson.name} had already been removed from the list!`);
        setPersons(persons.filter(person => person.id !== id));
        setIsAnError(true);
        setNewName('');
        setNewNumbers('');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isAnError={isAnError} />
      <SearchFilter searchTerm={searchTerm} handleSearchField={handleSearchField} />
      <h2>Add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit} 
        newName={newName} 
        handleInputName={handleInputName}
        newNumbers={newNumbers}
        handleInputNumbers={handleInputNumbers}
      />
      <h2>Numbers</h2>
      <PersonsRendered 
        searchTerm={searchTerm} 
        searchResult={searchResult} 
        persons={persons} 
        handleDelete={handleDelete} 
      />
    </div>
  )
}

export default App;
