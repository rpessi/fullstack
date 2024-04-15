import { useState, useEffect } from 'react'
import personService from './services/persons'

const Number = ({ person }) => {
  const name = person.name
  const number = person.number

  return (
    <>
      <li>{person.name} {person.number}
      <button onClick={() => RemovePerson({person})}>Delete</button>
      </li>
    </>
  )
}

const Persons = ({ newFiltered }) => {
  return (
    <>
      <ul style={{ listStyle:'none', marginLeft: '0px', display: 'inline' }} >
        {newFiltered.map(person => <Number key={person.name} person={person} />)}
      </ul>
    </>
  )
}

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange} />
      </div>
    </>
  )
}

const PersonForm = ({ checkPerson, newName, handlePersonChange,
                    newNumber, handleNumberChange }) => {
  return (
    <>
      <form onSubmit={checkPerson}>
      <AddName newName={newName} handlePersonChange={handlePersonChange} />
      <AddNumber newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <div>
        <button type='submit'>add</button>
      </div>
      </form>
    </>
  )
}

const AddName = ({ newName, handlePersonChange }) => {
  return (
    <div>
      name: <input value={newName} onChange={handlePersonChange} required/>
    </div>
  )
}

const AddNumber = ({ newNumber, handleNumberChange }) => {
  return (
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} required/>
    </div>
  )
}

const RemovePerson = ({ person }) => {
  window.confirm(`Delete ${person.name}?`)
    ? personService
      .remove(person.id)
      .then(returnedPerson => {
        console.log('deleted response', returnedPerson.name)
      })
      .catch(error => {
        console.log('delete failed')
        alert(
          `${person.name} has already been deleted.`
        )
      })
    : console.log('painettiin canceliä')
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newFiltered, setFiltered] = useState(persons)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  
  const addPerson = ({ newName, newNumber }) => {
    console.log('@ addPerson, newName: ', newName)
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
        .then(returnedPerson => {
        console.log('response', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        console.log('@addPerson axios, returnedPerson: ', returnedPerson)
        setNewName('')
        setNewNumber('')
        setNewFilter('')
        })
  }

  const updatePerson = ({ person, newNumber }) => {
    console.log('@updatePerson, person, newNumber', person, newNumber)
    const personObject = {
      name: person.name,
      number: newNumber
    }
    const id = person.id
    personService
      .update(id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id
          ? person
          : returnedPerson))
      })
      setNewName('')
      setNewNumber('')
      setNewFilter('')
  }

  const checkPerson = (event) => {
    console.log('event, newName, newNumber: ', newName, newNumber )
    event.preventDefault()
    const names = persons.map(person => person.name)
    console.log('mapped names: ', names)
    const person = persons.filter(person => person.name === newName)[0]
    console.log('filtered person: ', person)
    console.log('@checkPerson, newName: ', newName)
    names.includes(newName)
      ? updatePerson({person, newNumber})
      : addPerson({newName, newNumber})
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const formfield = event.target.value
    console.log('@handleFilterChange, field', formfield)
    setNewFilter(formfield)
    console.log('updated newFilter', newFilter)
    const newFiltered = persons.filter((person) =>
      person.name.toLowerCase().includes(formfield.toLowerCase()))
    setFiltered(newFiltered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm
        checkPerson={checkPerson}
        newName={newName} 
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons key={newFiltered.name} newFiltered={newFiltered} />
    </div>
  )
}

export default App
