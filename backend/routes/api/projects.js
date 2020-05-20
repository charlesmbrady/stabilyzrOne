const router = require('express').Router();
const projectsController = require('../../controllers/projectsController');
const withAuth = require('../../middleware.js');

// Matches with "/api/..."

// CRUD
router.post('/projects', projectsController.create);
router.get('/projects/:id', withAuth, projectsController.getById);
router.put('/projects/:id', withAuth, projectsController.updateById);
// router.delete('/project/:id', withAuth, projectsController.deleteById);

router.get('/projects', withAuth, projectsController.getAllByUserId);

module.exports = router;
