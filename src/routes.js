const UserController = require('./controllers/UseController');


module.exports = [
  {
    enpoint: '/users',
    method: 'GET',
    handler: UserController.listUsers,
  },
  {
    enpoint: '/users/:id',
    method: 'GET',
    handler: UserController.getUserById,
  },
  {
    enpoint: '/users',
    method: 'POST',
    handler: UserController.createUser,
  },
  {
    enpoint: '/users/:id',
    method: 'PUT',
    handler: UserController.updateUser,
  },
  {
    enpoint: '/users/:id',
    method: 'DELETE',
    handler: UserController.deleteUser,
  },
]