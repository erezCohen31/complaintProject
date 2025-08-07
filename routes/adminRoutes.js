import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('admin.html', { root: 'public' });
});

router.post('/admin', (req, res) => {
  const { password } = req.body; 
  if (password === process.env.ADMIN_PASSWORD) {
    res.redirect('/admin-panel'); 
  } else {
    res.status(403).send('Incorrect password'); 
  }
});


export default router;
