import React, { Component, useContext, useState, useEffect } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Topbar from "../components/Topbar";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import API from "../utils/API";
import ToolTip from "@material-ui/core/Tooltip";
import { Questionlist, Answerlist } from "../components/QuestionAnswerList";
import { LoginContext } from "./../components/LoginContext";
const backgroundShape = require("../images/Liquid-Cheese.svg");

const styles = theme => ({
  root: {
    marginTop: "2em",
    padding: theme.spacing(3, 2),
    flexGrow: 1,
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200,
    height: "100vh"
  },
  questionList: {
    // color: "red"
  },
  avatar: {
    fontSize: "14px",
    fontWeight: "bold"
  },
  button: {
    margin: theme.spacing(1)
  }
});

const Answer = props => {
  const [answerstate, setanswerstate] = useState({
    questions: [],
    answers: []
  });

  const [userStatus, setUserStatus] = useContext(LoginContext);
  const questionID = props.match.params.id;
  useEffect(() => {
    // Just accessing the id passed in order to query once component mounts
    // sets state to the question and answers for that question
    console.log(questionID);
    API.getQuestionAnswers(questionID).then(res => {
      console.log(res.data);
      setanswerstate({
        questions: res.data.question_description,
        answers: res.data.answer_id
      });
      console.log(res.data);
    });
  }, []);

  // On click of the answer button, submit an answer.
  // This will update answer collection, as well as question collection
  const submitAnswer = () => {
    const answer = document.getElementById("answertext").value;
    console.log(userStatus.userId);
    const answerObj = {
      question_id: questionID,
      answer,
      user_id: userStatus.userId
    };
    console.log(answerObj);
    API.postAnswer(answerObj).then(res => {
      setanswerstate(prevState => ({
        ...prevState,
        answers: res.data.answer_id
      }));
    });
  };

  return (
    <div>
      <Questionlist question={answerstate.questions} />
      <li>
        {answerstate.answers.map(answer => {
          console.log(answer);
          return (
            <Answerlist key={answer.answer_id}>{answer.answer}</Answerlist>
          );
        })}
      </li>
      <textarea id="answertext" rows="4" cols="50">
        HUH
      </textarea>
      <button onClick={submitAnswer}>Answer</button>
    </div>
  );
};

export default withRouter(withStyles(styles)(Answer));
