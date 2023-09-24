var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
require('dotenv').config();
const { DB_USER, DB_NAME, DB_HOST, DB_PASS} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql', 
});

console.log(sequelize);

const User = sequelize.define('User', {
  Email: Sequelize.STRING,
  Password: Sequelize.STRING,
  FullName: Sequelize.STRING,
}, {
  timestamps: false, // Disable timestamps
}
);

/*

Add Timestamp Columns to the Model: 
If you want to use Sequelize's built-in timestamp functionality 
(which automatically manages createdAt and updatedAt columns), 
you need to add these columns to your model definition:

createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },



*/



const ArtCategories = sequelize.define('ArtCategories', {
  Category: Sequelize.STRING,
}, {
  timestamps: false, // Disable timestamps
});

console.log(ArtCategories);

/*
mysql> Show tables;
+-------------------+
| Tables_in_artimdb |
+-------------------+
| Users  |
| ArtistProfiles            |
| ArtCategories  |
| Posts             |
+-------------------+
git push https://github.com/CodeOp-tech/fspt18-team-2.git database
npm install -g next
npm install tailwindcss
npm install typeface-inter
postman http://localhost:5001/auth


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



/*

//('users/login')

router.post('/api/auth/login', (req, res) => {



  res.json({ message: 'User logged in successfully' });
});





//('users/profile')


router.get('/api/auth/profile', (req, res) => { 


  res.json({FullName: FullName, Email: Email, })

});

*/


/* GET users listing. */
router.get('/user_list', async (req, res, next) => {
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


/* GET ART CATEGORIES listing is working*/
router.get('/art_categories', async (req, res, next) => {
  try {
   
    const Categories = await ArtCategories.findAll();

    console.log(Categories);
    
    const formattedCategories = Categories.map(ArtCategories => ({
      Category: ArtCategories.Category,
      
      
    }));

    res.json(formattedCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve Art Categories' });
  }
});








module.exports = router;
