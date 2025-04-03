import { useState, useEffect } from "react";
import axios from "axios";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/quiz/questions") // Ensure correct API endpoint
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  const handleOptionChange = (e, questionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    try {
      const response = await axios.post("http://127.0.0.1:5000/student/submit", { answers });
      alert("Quiz submitted successfully! Your Score: " + response.data.score);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Error submitting quiz: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div>
      <h2>Quiz</h2>
      {loading ? <p>Loading questions...</p> : null}

      {!loading && questions.length === 0 ? <p>No questions available.</p> : null}

      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q._id.toString()}>
            <p>{q.question}</p>
            {q.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={q._id.toString()}
                  value={option}
                  checked={answers[q._id] === option}
                  onChange={(e) => handleOptionChange(e, q._id)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" disabled={Object.keys(answers).length !== questions.length}>
          Submit Quiz
        </button>
      </form>
    </div>
  );
}

export default Quiz;
