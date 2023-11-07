import Comment from '../models/Comment';
import Post from '../models/Post';
import User from '../models/User';
import * as Yup from 'yup';

class CommentController {

  async commentByPost(req, res) {

    const postId = req.params.postId;

    const comment = await Comment.findAll({
      where: {
        post_id: postId,
      },
      include: [{
        model: User,
        as: 'User',
        attributes: ['username']
      }]
    })

    return res.json(comment);
  }

  async createComment(req, res) {

    const schema = Yup.object().shape({
      post_id: Yup.string().required(),
      comment_body: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'falha ao criar comentario' });
    }


    const { comment_body, post_id } = req.body;

    const findPostId = await Post.findOne({
      where: {
        id: req.body.post_id
      }
    })

    if (findPostId) {
      const user = await User.findOne({
        where: {
          id: req.userId
        }
      });
      const newComment = await Comment.create({
        comment_body: comment_body,
        post_id: post_id,
        user_id: req.userId,
      });

      return res.json({
        comment: newComment, username: user.username
      }
      )
    } else {
      return res.json({
        type: "error",
        message: "post inexistente."
      })
    }
  }

  async deleteComment(req, res) {
    const commentId = req.params.commentId;

    await Comment.destroy({
      where: {
        id: commentId,
      }
    })

    return res.json({
      type: 'sucess',
      message: 'comentario apagado com sucesso.',
    });
  }

}


export default new CommentController();