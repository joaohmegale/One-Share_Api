import Post from "../models/Post";
import User from "../models/User";
import * as Yup from 'yup';

class PostController {
  async store(req, res) {

    const { title, post_text } = req.body;

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      post_text: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha ao criar post' });
    }

    const posts = await Post.create({
      user_id: req.userId,
      title: title,
      post_text: post_text,
    })

    return res.json({
      data: posts
    });
  }

  async listPosts(req, res) {
    const listOfPosts = await Post.findAll({
      include: [{ model: User, as: 'user', attributes: ['username'] }]
    });
    res.json(listOfPosts)
  }

  async postById(req, res) {
    const postId = req.params.id;
    const post = await Post.findByPk(postId,
      {
        include: [{ model: User, as: 'user', attributes: ['username'] }]
      });

    return res.json(post);
  }

  async postDelete(req, res) {
    const postId = req.params.id;
    await Post.destroy({
      where: {
        id: postId,
      }
    })
    return res.json({ success: true });
  }

  async postUpdate(req, res) {
    const id = req.params.id;
    const updatePost = req.body;
    await Post.update(updatePost, {
      where: { id: id }
    });
    res.json(updatePost);
  }

}

export default new PostController();