const { Answer, Question } = require("../models");

// Will get all answered questions for a particular user
// We will store this user info in the cookie and can access
// it in requests
const getAnsweredQuestions = (req, res, next) => {
  // allows you to get user id from the cookie
  let user_id = req.params.user_id;
  console.log("@ getAnsweredQuestions, uid: ", user_id);

  Answer.find({ user_id })
    .populate("question_id")
    .exec((err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        throw err;
      }
    });
};

// Posts an answer with that specific user id which will be accessed from context
const postAnswer = (req, res, next) => {
  console.log("Request being send via postAnswer");
  console.log("REQ BODY IN POST ANSWER", req.body);
  //let question = "5dd03a4de89b62aed0e3080d";
  let questionID = req.body.question_id;
  Answer.create(req.body)
    .then(dbAnswer => {
      // When a new answer is posted successfully, use the question id
      // from the request, to push answer id into its array
      return Question.findOneAndUpdate(
        { _id: questionID },
        { $push: { answer_id: dbAnswer._id } },
        { new: true }
      );
    })
    .then(dbQuestion => {
      Question.findOne({ _id: questionID })
        .populate("answer_id")
        .exec((err, docs) => {
          if (!err) {
            console.log(docs);
            res.json(docs);
          } else {
            throw err;
          }
        });
    })
    .catch(err => {
      console.log("ERR!");
      console.log(err);
      res.json(err);
    });
};

const upVoteAnswer = (req, res, next) => {
  // the answer_id will be stored on the front end
  const answerId = "5dcc8a8e83827fd798783b2c";
  // will come from the front end
  const rating = 5;
  Answer.findByIdAndUpdate(answerId, { $set: { rating } }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      throw err;
    }
  });
};

module.exports = {
  getAnsweredQuestions,
  postAnswer,
  upVoteAnswer
};
