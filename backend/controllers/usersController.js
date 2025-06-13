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
  const { user_id } = req.params;
  try {
    const user = await usersService.getUser(user_id);
    res.json({ user });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Skapar ett konto
exports.createUser = async (req, res) => {
  const { user_name, user_password, user_email, user_created_date } = req.body;
  try {
    const newUser = await usersService.createUser({
      user_name,
      user_password,
      user_email,
      user_created_date,
    });
    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Ta bort ett konto
exports.deleteUser = async (req, res) => {
  try {
    const userID = req.params.ID;
    await usersService.deleteUser(userID);
    res.json({ message: 'Your accont has bin deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Uppdatera sit konto
exports.updateUser = async (req, res) => {
  try {
    const userID = req.params.ID;
    const { user_name, user_password, user_emil } = req.body;
    const updated = await usersService.updateUser(userID, {
      user_name,
      user_password,
      user_emil,
    });
    res.json({ message: updated });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await usersService.loginUser(user_email, user_password);
    if (!user || user.length === 0) {
      return res.status(401).json({ message: 'Fel email eller lösenord' });
    }

    console.log('user', user);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user_id: user.user_id,
      user_name: user.user_name,
      user_group_id: user.user_group_id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
