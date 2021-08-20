const express           = require('express');
const router            = express.Router();
const indexController    = require('../controller/indexController');
const authMiddleware   = require('../middleware/authMiddleware');

router.get('/',  indexController.get);
router.post('/login',  indexController.login);
router.get('/api/*', [authMiddleware.authenticateUser, authMiddleware.isValidEndPoint], indexController.getAPI);
router.get('/pub/*', authMiddleware.authenticateUser, indexController.getPUB);
router.post('/save/:id', authMiddleware.authenticateUser, indexController.save);
router.get('/save/:id', authMiddleware.authenticateUser, indexController.getSaved);
router.get('/logout', indexController.logout);

module.exports = router;