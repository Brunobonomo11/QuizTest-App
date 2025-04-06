import { Link } from "react-router-dom"

export const QuizAnswer = () => {
    return (
        <div>
            <h1>Que elemento sos?</h1> 
            <h3>(Basado en un cuestionario completamente aleatorio)</h3>
            <Link to="/">Home</Link>
            <br />
            <Link to="/quiz">Quiz</Link>
        </div>
    )
}