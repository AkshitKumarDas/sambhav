const dbsModel = require("../models/dbsModel");

exports.submitDBS = async (req, res) => {
  try {
    const userId = req.user.id;
    const { answers } = req.body;

    let totalScore = 50;

    answers.forEach((a) => {
      totalScore += a.score;
    });

    if (totalScore > 100) totalScore = 100;
    if (totalScore < 0) totalScore = 0;

    await dbsModel.saveScore(userId, totalScore);

    res.json({
      success: true,
      score: totalScore,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "DBS submission failed",
    });
  }
};

exports.getLatestDBS = async (req, res) => {
  try {
    const userId = req.user.id;

    const score = await dbsModel.getLatestScore(userId);

    if (!score) {
      return res.json({
        success: true,
        data: {
          score: 70,
          status: "not_assessed",
        },
      });
    }

    res.json({
      success: true,
      data: score,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch DBS",
    });
  }
};
