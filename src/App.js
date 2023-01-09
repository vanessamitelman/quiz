import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    isModalOpen,
    nextQuestion,
    checkAnswer,

    closeModal
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  const { correct_answer, incorrect_answers, question } = questions[index];

  const answers = incorrect_answers;
  const randomIndex = Math.floor(Math.random() * (answers.length+1));
  answers.splice(randomIndex, 0, correct_answer);

  return (
    <main>
      <Modal />
      {!isModalOpen && (
        <section className='quiz'>
          <p className='correct-answers'>
            correct answers : {correct}/{index}
          </p>
          <article className='container'>
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
            <div className='btn-container'>
              {answers.map((answer, index) => {
                return (
                  <button
                    className='answer-btn'
                    key={index}
                    dangerouslySetInnerHTML={{ __html: answer }}
                    onClick={() => checkAnswer(answer === correct_answer)}
                  />
                );
              })}
            </div>
          </article>
          <button className='next-question' onClick={nextQuestion}>
            next question
          </button>
        </section>
      )}
    </main>
  );
}

export default App;
