var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
require('dotenv').config();
const {DB_NAME, DB_HOST, DB_PASS} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_HOST, DB_PASS, {
  host: 'localhost',
  dialect: 'mysql', 
});


const User = sequelize.define('User', {
  Email: Sequelize.STRING,
  Password: Sequelize.STRING,
  FullName: Sequelize.STRING,
 
});


/*
mysql> Show tables;
+-------------------+
| Tables_in_artimdb |
+-------------------+
| Users  |
| ArtistProfiles            |
| ArtCategory  |
| Posts             |
+-------------------+
git push https://github.com/CodeOp-tech/fspt18-team-2.git database
npm install -g next
npm install tailwindcss
npm install typeface-inter
postman http://localhost:5001/api/auth


*/


//('users/register')

router.post('/register', async (req, res) => {

  try {

    // Input info from Register Form
    const {Email, Password, FullName} = req.body;

    // The times we encript the password
    const saltRounds = 10; 
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(Password, salt);


    const newUser = await User.create({
      Email,
      Password: hashedPassword,
      FullName,
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


  res.json({FullName: FullName, Email: Email, })

});




/* GET users listing. */
router.get('/list', async (req, res, next) => {
  try {
   
    const usersList = await User.findAll();
    
    const formattedUsers = usersList.map(user => ({
      Email: user.Email,
      FullName: user.FullName,
      
    }));

    res.json(formattedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});








module.exports = router;
