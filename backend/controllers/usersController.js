const usersService = require('../services/usersService');

// Hämta alla konton
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

// Hämta ett konton
exports.getUser = async (req, res) => {
  try {
    const user = await usersService.getUser();
    res.json({ user });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Skapar ett konto
exports.createUser = async (req, res) => {
  try {
    const { user_id, user_name, user_password, user_emil, user_created_date} = req.body;
    const newUser = await usersService.createUser({
      user_id,
      user_name,
      user_password,
      user_emil,
      user_created_date,
    });
    res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error:error.message});
  }
};

//Ta bort ett konto
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await usersService.deleteUser(userId);
    res.json({ message: 'Your accont has bin deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Uppdatera sit konto
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { user_id, user_name, user_password, user_emil } = req.body;
    const updated = await usersService.updateUser(userId, {
      user_id, 
      user_name, 
      user_password, 
      user_emil
    });
    res.json({ message: updated });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
