var knex = require('./knex');
var bcrypt = require('bcrypt');


function Users() {
  return knex('users');
}

function Posts() {
  return knex('posts');
}

function Comments() {
  return knex('comments');
}

function CreateUser(username, password) {
  return knex('users').insert({

  })
}


module.exports = {
  getAllUsers: () => {
    return Users();
  },
  getAllPosts: () => {
    return Posts();
  },
  getAllComments: () => {
    return Comments();
  },
  getSinglePost: (id) => {
    return Posts().where('id', id);
  },
  getNumberOfPosts: () => {
    return knex.raw('select count(*) from posts')
  },
  getAllUserInteraction: (user_id) => {
    return Users().where('id', user_id)
    .then(function(userData) {
      userData = userData[0];
      return Posts().where('user_id', user_id)
      .then(function(postData) {
        userData.posts = postData;
        return Comments().where('user_id', user_id)
        .then(function(commentData) {
          userData.comments = commentData;
          return userData;
        })
      })
    })
  }
}
