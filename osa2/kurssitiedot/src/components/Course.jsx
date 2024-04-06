const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    )
}

const Header = ({ name }) => {
  console.log('Header, name', name)
  return (
    <div>
      <h1>{name}</h1>
    </div>
    )
}
  
const Content = ({ parts }) => {
  console.log('Content, parts[0]: ', parts[0])
  return (
    <div>
      <ul>
        {parts.map(part => <Part part={part}/>)}
      </ul>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )
}
  
const Total = ({ parts }) => {
  console.log('Total, parts: ', parts)
  const exercises = parts.map(part => part.exercises)
  console.log('Total, exercises: ', exercises)
  const total = exercises.reduce((totalSum, currentSum) => {
    return totalSum + currentSum
  }, 0)
  console.log('laskettu total: ', total)
  return (
    <div>
      <b>Total of {total} exercises</b>
    </div>
  )
}

export default Course