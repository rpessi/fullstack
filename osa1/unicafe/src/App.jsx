import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticsLine = ({text, value}) => (
    <>
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    </>
)

const Statistics = ({good, neutral, bad}) => {
    console.log('good, neutral, bad', good, neutral, bad)
    const all = good + bad + neutral
    const average = (good-bad)/(good+neutral+bad)
    const fixedAve = average.toFixed(1)
    const positive = good/(good+neutral+bad)
    const fixedPosi = positive.toFixed(3)
    const posiPer = fixedPosi * 100 + ' %'
    if (good + neutral + bad === 0) {
        return (
            <>
                <h2>Statistics</h2>
                <p>No feedback given</p>
            </>
        )
    }
    return (
        <>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <StatisticsLine text="Good: " value ={good} />
                    <StatisticsLine text="Neutral: " value ={neutral} />
                    <StatisticsLine text="Bad: " value ={bad} />
                    <StatisticsLine text="All: " value ={all} />
                    <StatisticsLine text="Average: " value ={fixedAve} />
                    <StatisticsLine text="Positive: " value ={posiPer} />
                </tbody>
            </table>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    const handleGoodClick = () => {
        const updateGood = good + 1
        setGood(updateGood)
        setAll(updateGood + neutral + bad)
    }

    const handleNeutralClick = () => {
        const updateNeutral = neutral + 1
        setNeutral(updateNeutral)
        setAll(updateNeutral + good + bad)
    }

    const handleBadClick = () => {
        const updateBad = bad + 1
        setBad(updateBad)
        setAll(updateBad + good + neutral)
    }

    return (
    <div>
        <h2>Give feedback</h2>
        <div>
            <Button handleClick={handleGoodClick} text='Good' />
            <Button handleClick={handleNeutralClick} text='Neutral' />
            <Button handleClick={handleBadClick} text='Bad' />
        </div>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
    )
}

export default App
