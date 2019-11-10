var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    answer: {type: String, required: true},
    rating: {type: Number},
    isRejected: {type: Boolean, required: true, default: false},
    rejection_reason: {type: String},
    user_id: {type: Schema.Types.ObjectId, ref: "User"}
},
{timestamps: true}
);

var Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;