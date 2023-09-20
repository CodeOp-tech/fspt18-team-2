var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
require('dotenv').config();
const { DB_NAME, DB_HOST, DB_PASS } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_HOST, DB_PASS, {
  host: 'localhost',
  dialect: 'mysql', 
});


const User = sequelize.define('User', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  PasswordHash: Sequelize.STRING,
  salt: Sequelize.STRING,
  FirstName: Sequelize.STRING,
  LastName: Sequelize.STRING,
});


/*
mysql> Show tables;
+-------------------+
| Tables_in_artimdb |
+-------------------+
| artist_profiles   |
| posts             |
| process_category  |
| users             |
+-------------------+
git push https://github.com/CodeOp-tech/fspt18-team-2.git database
npm install -g next
npm install tailwindcss
npm install typeface-inter



*/


//('users/register')

router.post('/register', async (req, res) => {

  try {

    // Input info from Register Form
    const {username, email, password, FirstName, LastName } = req.body;

    // The times we encript the password
    const saltRounds = 10; 
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = await User.create({
      username,
      email,
      PasswordHash: hashedPassword,
      salt,
      FirstName,
      LastName,
    });
 
  res.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});





//('users/login')

router.post('/login', (req, res) => {



  res.json({ message: 'User logged in successfully' });
});





//('users/profile')

router.get('/profile', (req, res) => { 


  res.json({username: username, email: email})

});




/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
   
    const usersList = await User.findAll();
    
    const formattedUsers = usersList.map(user => ({
      username: user.username,
      email: user.email,
      FirstName: user.FirstName,
      LastName: user.LastName,
    }));

    res.json(formattedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

module.exports = router;







module.exports = router;
