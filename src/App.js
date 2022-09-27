import { useState } from "react";
import classes from "./App.module.css";
import Button from "./components/Button";
import CountBar from "./components/CountBar";

function App() {
  const [question, setQuestion] = useState("");
  const [renderAnswers, setRenderAnswers] = useState([]);
  const [isShowingAnswer, setIsShowingAnswer] = useState(false);

  let tg = window.Telegram.WebApp;
  tg.expand();
  tg.MainButton.isVisible = true;
  tg.MainButton.text = "CONFIRM";

  tg.onEvent("mainButtonClicked", function () {
    setIsShowingAnswer(true);
    // setTimeout(function () {
    //   tg.close();
    // }, 2000);
  });

  const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const altfunc = () => {
    setIsShowingAnswer(true);
  };

  const setOptionClasses = (showingresult, questionstatus, questiontype) => {
    if (showingresult) {
      if (questiontype === "correct") {
        return "container correct-container";
      }
      if (questionstatus && questiontype === "incorrect") {
        return "container wrong-container";
      } else {
        return "container";
      }
    } else {
      if (questionstatus) {
        return "container active-container";
      } else {
        return "container";
      }
    }
  };

  const clickAnswer = (active_answer) => {
    setRenderAnswers((current_render) => {
      let new_render = [];
      console.log(current_render);
      current_render.forEach((answer) => {
        if (answer.name === active_answer) {
          answer.active = true;
        } else {
          answer.active = false;
        }
        new_render.push(answer);
      });
      return new_render;
    });
  };

  function fetchQuestion() {
    fetch(
      "https://the-trivia-api.com/api/questions?categories=sport_and_leisure,film_and_tv&limit=1&region=IT&difficulty=easy"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let answers = data[0].incorrectAnswers.map((single_answer) => {
          return {
            name: single_answer,
            value: "incorrect",
            active: false,
          };
        });

        answers.push({
          name: data[0].correctAnswer,
          value: "correct",
          active: false,
        });

        const trivia = {
          question: data[0].question,
          answers: shuffle(answers),
        };
        setQuestion(trivia.question);
        setRenderAnswers(trivia.answers);
      });
  }

  return (
    <div className={classes.container}>
      <div onClick={fetchQuestion} style={{ fontSize: "15pt" }}>
        The trivia game
      </div>

      <CountBar />

      <div className={classes["quiz-container"]}>
        <div onClick={altfunc} className={classes.question}>
          {question}
        </div>
        <div className={classes.answers}>
          {renderAnswers.map((answer_obj) => {
            if (!isShowingAnswer) {
              return (
                <Button
                  customclass={setOptionClasses(
                    isShowingAnswer,
                    answer_obj.active,
                    answer_obj.value
                  )}
                  onClick={clickAnswer}
                  key={answer_obj.name}
                  type={answer_obj.value}
                >
                  {answer_obj.name}
                </Button>
              );
            } else {
              return (
                <Button
                  customclass={setOptionClasses(
                    isShowingAnswer,
                    answer_obj.active,
                    answer_obj.value
                  )}
                  key={answer_obj.name}
                  type={answer_obj.value}
                >
                  {answer_obj.name}
                </Button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
