var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
require('dotenv').config();
const { DB_USER, DB_NAME, DB_HOST, DB_PASS } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql', 
});

const User = sequelize.define('User', {
  UserID: {
    type: Sequelize.INTEGER, // Assuming UserID is an integer
    primaryKey: true, // Specify UserID as the primary key
    autoIncrement: true, // Specify auto-increment
  },
  Email: Sequelize.STRING,
  Password: Sequelize.STRING,
  FullName: Sequelize.STRING,
  Pronouns: Sequelize.STRING,
  UserCategory: Sequelize.STRING,
  UserAvatar: Sequelize.STRING,
  UserBio: Sequelize.STRING,
  UserWeb: Sequelize.STRING,
}, {
  timestamps: false, // Disable timestamps
});




router.put('/profile', async (req, res) => {
  try {
    /* Input from Profile Form to update the following values inside the table User: 
    FullName
    Pronouns
    UserCategory 
    UserAvatar
    UserBio
    UserWeb

    input from admin code:
    isLogged / UserID / Email
    (boolean: when it's true the profile can be updated, 
    if the UserId and the Email are found)
    


    */
    const {isLogged, UserID, Email, FullName, Pronouns, UserCategory, UserAvatar, UserBio, UserWeb} = req.body;
      
    if (!isLogged) {
      console.log('Not Authenticated');
      res.status(401).json({ message: 'Authentication failed' });
      return; 
    }

    // UserID exists ?
    const user = await User.findOne({
      where: {
            UserID: UserID,
            Email: Email,
      },
    });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const NewFullName = FullName;  
      
    // Update profile
      await user.update({
      FullName: NewFullName || user.FullName,
      Pronouns: Pronouns || null,
      UserCategory: UserCategory || null,
      UserAvatar: UserAvatar || null,
      UserBio: UserBio || null,
      UserWeb: UserWeb || null,
    });

    res.json({ message: 'Profile Updated', user: user.toJSON() }); 
  } catch (error) {
      console.error(error);
      console.log(error);
    res.status(500).json({ error: 'Profile Update failed' });
  }
});

module.exports = router;
