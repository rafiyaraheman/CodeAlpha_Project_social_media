import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ - Get all posts */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* READ - Get posts by a specific user */
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE - Like/Unlike a post */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; // `id` is the post ID
    const { userId } = req.body; // `userId` is the ID of the user liking the post

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* ADD COMMENT - Add comment to a post */
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params; // Get the post ID from the URL
    const { userId, text } = req.body; // Get the userId and text from the request body

    const post = await Post.findById(postId); // Find the post by ID
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      userId,
      text,
      timestamp: new Date(),
    };

    post.comments.push(comment); // Add the comment to the post's comments array
    await post.save(); // Save the updated post

    res.status(200).json(post); // Return the updated post with the new comment
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
