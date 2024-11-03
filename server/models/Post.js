import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: String,
  picturePath: String,
  location: String,
  likes: { type: Map, of: Boolean }, // Storing likes with userId as keys
  comments: [{ text: String, userId: mongoose.Schema.Types.ObjectId }]
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
