import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy'
  });

  const getQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    setError(false);
    try {
      const { data } = await axios.get(url);
      if (data.response_code === 1) {
        setError(true);
        setWaiting(true);
      }
      if (data.results.length > 0) {
        setQuestions(data.results);
        setWaiting(false);
        setError(false);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setWaiting(true);
      setError(true);
      console.log(e);
    }
  };
  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    getQuestions(url);
  };
  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex((index) => index + 1);
    } else {
      setIndex(0);
      setIsModalOpen(true);
    }
  };
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((correct) => correct + 1);
    }
    nextQuestion();
  };


  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
    setQuiz({
      amount: 10,
      category: 'sports',
      difficulty: 'easy'
    });
  };
  const value = {
    waiting,
    loading,
    questions,
    index,
    correct,
    error,
    isModalOpen,
    quiz,
    nextQuestion,
    checkAnswer,
    closeModal,
    handleChange,
    handleSubmit
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
