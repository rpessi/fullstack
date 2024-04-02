const App = () => {
    const course = 'Half Stack application development'
        const parts = [
            { content: 'Fundamentals of React' },
            { content: 'Using props to pass data' },
            { content: 'State of a component'},
        ]
        const exercises = [
            { total: 10},
            { total: 7},
            { total: 14},
        ]

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} exercises={exercises} />
            <Total exercises={exercises} />
        </div>

  )
}

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]} exercise={props.exercises[0]} />
            <Part part={props.parts[1]} exercise={props.exercises[1]} />
            <Part part={props.parts[2]} exercise={props.exercises[2]} />
        </div>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.part.content} {props.exercise.total}</p>
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.exercises[0].total + props.exercises[1].total + props.exercises[2].total}</p>
        </>
    )
}

export default App
