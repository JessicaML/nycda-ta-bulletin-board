const express = require('express'),
      Sequelize = require('Sequelize'),
      router = express.Router();

const sequelize = new Sequelize('bulletinboard', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, { dialect: 'postgres' });


var notice = sequelize.define('notice', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

router.get('/', (request, response) => {
  notice.findAll({ order: 'id ASC' }).then((notices) => {
    response.render('notices/index', { notices: notices });
  });
});


router.get('/:id', (request, response) => {
  notice.findById(request.params.id).then((notice) => {
    response.render('notices/show', { notice: notice });
  });
});


module.exports = router;
