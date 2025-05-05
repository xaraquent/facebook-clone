const friendsService = require('../services/friendsService');

exports.getFriends = async (req, res) => {
  try {
    const friends = await friendsService.getFriends();
    res.json({ friends });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.friendsAndUsers = async (req, res) => {
  try {
    const friendsAndUsers = await friendsService.friendsAndUsers();
    res.json({ friendsAndUsers });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
