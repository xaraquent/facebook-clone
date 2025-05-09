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

exports.updateGroup = (req, res) => {
  const { group_id } = req.params;
  const { group_name } = req.body;

  groupService
    .updateGroup(group_id, group_name)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.deleteGroup = (req, res) => {
  const { group_id } = req.params;

  groupService
    .deleteGroup(group_id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
};
