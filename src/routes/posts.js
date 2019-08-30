import { Router } from 'express';
import controller from 'controllers/posts_controller';
var router = Router();

router.get('/posts', function(req, res, next) {
  res.render('posts_index', { title: 'Post' });
});
router.post('/posts', controller.create);
router.get('/posts/:id', controller.show);

export default router;
