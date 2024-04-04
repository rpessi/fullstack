import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
   </button>
)

const MostVotes = ({ votes, anecdotes }) => {
  if (Math.max(...votes) === 0) {
    return (
      <>
        <h2>Anecdote with most votes</h2>
        <p>No votes have been given</p>
      </>
    )
  }
  const maxvotes = Math.max(...votes)
  const maxindex = votes.indexOf(maxvotes)
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxindex]}</p>
      <p>This anecdote has {maxvotes} votes.</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const max = anecdotes.length - 1
  const initialVotes = Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(initialVotes)

  const handleNextClick = () => {
    const updateSelected = Math.floor(Math.random() * max)
    setSelected(updateSelected)
  }

  const handleVoteClick = () => {
    const copy = [ ...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes.</p>
      <div>
        <Button handleClick={handleVoteClick} text='Vote' />
        <Button handleClick={handleNextClick} text='Next anecdote' />
      </div>
      <MostVotes votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
