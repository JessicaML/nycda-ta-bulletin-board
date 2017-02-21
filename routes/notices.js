//requiring npm modules
const express = require('express'),
      Sequelize = require('Sequelize');

//initiating the router - setting express as the router
const router = express.Router();

//connecting to the bulletinboard database through sequelize,  process.env.POSTGRES_USER finds username from .bash_profile
const sequelize = new Sequelize('bulletinboard', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, { dialect: 'postgres' });

var notice = sequelize.define('notice', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

//get request to render the index.pug file - to add a new notice
//why do we use 'router.get' and not 'app.get'?
router.get('/', (request, response) => {
    response.render('notices/index');
});

//gets the unique id,
router.get('/:id', (request, response) => {
  //find the full row of data in 'notices' table from the id
  notice.findById(request.params.id).then((notice) => {
    //renders the show.pug file
    response.render('notices/show', { notice: notice });
  });
});

module.exports = router;
