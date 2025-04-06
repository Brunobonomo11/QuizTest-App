import './App.css'
import { Route , Routes, Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { QuizAnswer } from './components/Header.jsx'
import UserForm from './components/UserForm.jsx'
import { UserContext } from './components/UserContext.jsx'
import Question from './components/Question.jsx'
import Results from './components/Results.jsx'

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAsnwers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArwork] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const questions = [
    {
      question: "Cual es tu color favorito ?",
      options: ["Rojo 🔴", "Azul 🔵", "Verde 🟢", "Amarillo 🟡"],
    },
    {
      question: "Cual es tu marca de autos favorito?",
      options: ["Volvo", "BMW", "Audi", "Mercedes Benz", "Volskwagen"],
    },
    {
        question: "Cual es tu plato de comida favorito?",
        options: ["Carne al Horno", "Milanesa Napolita", "Sopa", "Empanadas"],
    }
  ]

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  }

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Volvo": "Earth",
    "BMW": "Fire",
    "Audi": "Water",
    "Mercedes Benz": "Air",
    "Carne al Horno": "Fire",
    "Milanesa Napolita": "Air",
    "Sopa": "Water",
    "Empanadas": "Earth",
  };

  const elementImages = {
    Fire: "https://st4.depositphotos.com/18556724/24669/v/450/depositphotos_246699216-stock-illustration-modern-flame-fire-red-design.jpg",  // reemplazá con las URLs que quieras
    Water: "https://st2.depositphotos.com/8684932/47683/v/450/depositphotos_476837254-stock-illustration-mascot-water-drop-sceptical-face.jpg",
    Earth: "https://img.freepik.com/vector-gratis/mundo-vegetal_24911-115710.jpg",
    Air: "https://img.freepik.com/vector-gratis/ilustracion-dibujos-animados-viento-dibujado-mano_23-2150558444.jpg",
  };
  

  function handleAnswer(answer) {
    setAsnwers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  function handleUserFormSubmit(name) {
    setUserName(name)
  };

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    })
  }

  async function fetchArtwork(keywords) {
    try {
      const url = "https://st.depositphotos.com/3250055/4332/v/450/depositphotos_43327289-stock-illustration-illustration-of-isolated-camp-fire.jpg"
      setArwork(url);
    } catch {
      console.log("Hubo un error al cargar la imagen", error)
    }
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        console.log("Respuestas que llegaron:", answers);
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        
        setArwork(elementImages[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <UserContext.Provider value={{ name: userName, setName: setUserName }}>
      <div>
        <Routes>
          <Route
            path="/"
            element={<UserForm onSubmit={handleUserFormSubmit} />}
          />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results element={element} artwork={artwork} userName={userName} />
              )
            }
          />
        </Routes>
  
        <QuizAnswer />
      </div>
    </UserContext.Provider>
  );
}

export default App
