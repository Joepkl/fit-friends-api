const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Example route to get user profile
router.get('/:userId', async (req, res) => {
  // try {
  //   const userId = req.params.userId;
  //   const userProfile = await userController.getUserProfile(userId);
  //   res.json(userProfile);
  // } catch (error) {
  //   res.status(500).json({ message: 'Internal Server Error' });
  // }

  res.send('Accessed profile route')
});

module.exports = router;
