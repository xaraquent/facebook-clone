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

exports.getFriend = async (req, res) => {
  const { friend_name } = req.params;
  try {
    const friend = await friendsService.getFriend(friend_name);
    res.json({ friend });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.createFriend = async (req, res) => {
  const { friend_name, friend_created_date } = req.body;
  try {
    await friendsService.createFriend(friend_name, friend_created_date);
    return res.status(201).json({
      sucess: true,
      error: '',
      message: 'Du har nu lagt till en ny vän',
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      error: error.message,
    });
  }
};

exports.deleteFriend = async (req, res) => {
  const { friend_name } = req.params;
  try {
    await friendsService.deleteFriend(friend_name);
    return res.status(201).json({
      sucess: true,
      error: '',
      message: 'Du har tagit bort en vän från din vänlista',
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      error: error.message,
    });
  }
};
