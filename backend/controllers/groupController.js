const groupService = require('../services/groupServices');

exports.createGroup = async (req, res) => {
  try {
    const { group_name } = req.body;
    const group = await groupService.createGroup({ group_name });
    res.status(201).json(group);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await groupService.getAllGroups();
    res.json({ groups });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
