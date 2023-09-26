var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
require('dotenv').config();
const { DB_USER, DB_NAME, DB_HOST, DB_PASS } = process.env;



const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql', 
});

console.log(sequelize);

const User = sequelize.define('User', {
  UserID: {
    type: Sequelize.INTEGER, // Assuming UserID is an integer
    primaryKey: true, // Specify UserID as the primary key
    autoIncrement: true, // Specify auto-increment
  },
  Email: Sequelize.STRING,
  Password: Sequelize.STRING,
  FullName: Sequelize.STRING,
}, {
  timestamps: false, // Disable timestamps
});

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





/*
mysql> Show tables;
+-------------------+
| Tables_in_artimdb |
+-------------------+
| Users  |
| ArtCategories  |
| Posts             |
+-------------------+
git push https://github.com/CodeOp-tech/fspt18-team-2.git database2
npm install -g next
npm install tailwindcss
npm install typeface-inter
postman http://localhost:5001/auth


*/


//('users/register')

router.post('/register', async (req, res) => {
  try {
    // Input info from Register Form
    const { Email, Password, FullName } = req.body;

    const registerEmail = Email;
    const registerPassword = Password;

    // Check if a user with the same email already exists
    const userRegistered = await User.findOne({
      where: {
        Email: registerEmail,
      },
    });

    if (userRegistered) {
      return res.json({ message: 'You already have an account, please login' });
    }

    // Hash the password
    const saltRounds = 10;
    const Salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(registerPassword, Salt);

    // Create a new user with the hashed password
    const newUser = await User.create({
      Email: registerEmail,
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

router.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;
    
    const loginEmail = Email;
    const loginPassword = Password;

    const user = await User.findOne({
      where: {
        Email: loginEmail,
      },
    });

    

    if (user) {
      
      const isPasswordValid = await bcrypt.compare(loginPassword, user.Password);
      console.log(user.Password); 
      console.log(isPasswordValid); 

      if (isPasswordValid) {
        console.log('User found:');
        console.log(user.toJSON());
        return res.json({ message: 'User logged in successfully' });
      }
    }

    console.log('User not found or password is incorrect.');
    res.status(401).json({ message: 'Authentication failed' });

  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



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






module.exports = router;







