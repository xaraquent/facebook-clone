const usersService = require('../services/usersService');

exports.getUsers = async (req, res) => {
  try {
    const users = await usersService.getUsers();
    res.json({ users });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
