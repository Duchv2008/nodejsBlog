import Post from 'models/post';

const create = (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  }

  let { title, content } = req.body;
  if (!(title && content)) {
    return res.render('posts_index');
  }

  let post = new Post({
    title: title,
    content: content,
  });

  post.save(function(error, post) {
    if (error) {
      return res.render('error');
    }
    res.send('create post ok');
  });
};

const show = (req, res) => {
  let postId = req.params.id;
  Post.findOne({ _id: postId }, function(err, post) {
    if (err) {
      return res.render('error', { message: 'post not found1' });
    }

    if (!post) {
      return res.render('error', { message: 'post not found2' });
    }
    console.log(post);
    return res.render('posts_show', { post: post });
  });
};

export default {
  create,
  show,
};
