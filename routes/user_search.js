var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
require('dotenv').config();
const { authenticate } = require('../secretInfo/verifyToken');

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


const ArtCategories = sequelize.define('ArtCategories', {
    id: {
      type: Sequelize.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
    },
    Category: Sequelize.STRING,
  }, {
    timestamps: false, // Disable timestamps
    
  });
  



  const Posts = sequelize.define('Posts', {
    id: {
      type: Sequelize.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
    },
    UserId: {
      type: Sequelize.INTEGER, 
      allowNull: false, 
    },
    Title: Sequelize.STRING,
    Category: Sequelize.STRING,
    Body: Sequelize.TEXT,
    Image1: Sequelize.STRING,
    Image2: Sequelize.STRING,
    Image3: Sequelize.STRING,
    Video: Sequelize.STRING,
    
  }, {
    timestamps: false, // Disable timestamps
  });
  
  // Associations
  Posts.belongsTo(User, { foreignKey: 'UserId' }); 
  Posts.belongsTo(ArtCategories, { foreignKey: 'Category' }); 
 User.hasMany(Posts, { foreignKey: 'UserId' });
 ArtCategories.hasMany(Posts, {foreignKey: 'Category' });
  


// on postman http://localhost:5001/user_search/Art
// for Authorization (authenticate) use Bearer : with the user Token generated after login

// CALL TO ACTION Search for a word or phrase 
router.get('/:searched', authenticate, async (req, res) => {
  try {
    
    //is authenticated?
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const searched = req.params.searched;
    console.log('Search Term:', searched);

    if (!searched || searched.trim() === '') {
      return res.status(400).json({ message: 'Invalid search term' });
    }


    const phrasePattern = /"([^"]+)"/g;
    const phrases = searched.match(phrasePattern);
    const searchTermWithoutPhrases = searched.replace(phrasePattern, '').trim();

    // Searching for users
    const userInfo = await User.findAll({
      where: {
        [Op.or]: [
          { FullName: { [Op.like]: `%${searchTermWithoutPhrases}%` } },
          { UserCategory: { [Op.like]: `%${searchTermWithoutPhrases}%` } },
          { UserBio: { [Op.like]: `%${searchTermWithoutPhrases}%` } },
        ],
      },
      attributes: ['FullName', 'UserCategory', 'UserBio'],
    });

    // Searching for posts
    const postInfo = await Posts.findAll({
      where: {
        [Op.or]: [
          { Title: { [Op.like]: `%${searchTermWithoutPhrases}%` } },
          { Category: { [Op.like]: `%${searchTermWithoutPhrases}%` } },
          { Body: { [Op.like]: `%${searchTermWithoutPhrases}%` } },
        ],
      },
      attributes: ['id','Title', 'Category', 'Body', 'Image1'], // these info will be the only shown in the search result
    });

    // Pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    const offset = (page - 1) * limit;

    const paginatedUserInfo = userInfo.slice(offset, offset + limit);
    const totalUserInfoCount = userInfo.length;

    const paginatedPostInfo = postInfo.slice(offset, offset + limit);
    const totalPostInfoCount = postInfo.length;

    console.log('Paginated User Info:', paginatedUserInfo);
    console.log('Paginated Post Info:', paginatedPostInfo);

    // Checking if paginatedUserInfo or paginatedPostInfo contains search results
    if (paginatedUserInfo.length > 0 || paginatedPostInfo.length > 0) {
      res.json({
        message: 'Found it',
        userInfo: paginatedUserInfo,
        postInfo: paginatedPostInfo,
        pagination: {
          page,
          limit,
          totalUserInfoCount,
          totalPostInfoCount,
        },
      });
    } else {
      res.json({ message: 'Not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});









module.exports = router;




/*

Executing (default): SELECT `Title`, `Category`, `Body` FROM `Posts` AS `Posts` WHERE (`Posts`.`Title` LIKE '%Art%' OR `Posts`.`Category` LIKE '%Art%' OR `Posts`.`Body` LIKE '%Art%');
Paginated User Info: []
Paginated Post Info: [
  Posts {
    dataValues: {
      Title: 'We talk about Digital Art',
      Category: 'Digital Art',
      Body: 'In an age where technology continues to reshape our lives, art too has embraced the digital frontier, giving birth to an awe-inspiring realm of creativity known as digital art. This ever-evolving medium transcends the traditional confines of canvas and paint, inviting artists to explore endless possibilities and redefine the very essence of visual expression. In this post, we embark on a journey through the captivating world of digital art, where pixels become pigments and imagination knows no bounds.'
    },
    ....
GET /user_search/Art 200 33.277 ms - 709

*/