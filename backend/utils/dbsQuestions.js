const DBS_QUESTIONS = [
  {
    id: 1,
    question: "Do you share OTP with anyone?",
    options: [
      { text: "Never", score: 5 },
      { text: "Sometimes", score: 0 },
      { text: "Often", score: -5 },
    ],
  },
  {
    id: 2,
    question: "Do you click unknown links?",
    options: [
      { text: "Never", score: 5 },
      { text: "Rarely", score: 2 },
      { text: "Often", score: -5 },
    ],
  },
];

module.exports = DBS_QUESTIONS;
