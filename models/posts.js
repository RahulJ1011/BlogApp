const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
  userId:{
    type:String,

    required:true
  },
  userName:{
    type:String,
    required:true
  },
  picture:{
    type:String,
    required:true
  },
  description:
  {
    type:String,
    required:true,
    max:100
  }
},
{timestamps:true}
)

const Post = mongoose.model("Post",postSchema)
module.exports = Post