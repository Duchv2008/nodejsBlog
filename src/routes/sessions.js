import express, { Router } from 'express';
import controller from 'controllers/sessions_controller';
var router = Router();

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', controller.create);

export default router;
