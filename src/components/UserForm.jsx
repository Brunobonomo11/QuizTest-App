import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function UserForm () {
    const [inputName, setInputName] = useState('');
    const { setName } = useContext(UserContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setName(inputName);
        navigate("/quiz")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Escribí tu nombre"
            />
            <button type="submit">Empezar</button>
        </form>
    )
}