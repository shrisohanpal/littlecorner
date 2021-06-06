import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: 'Blog',
        },
        title: {
            type: String,
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        likes: {
            type: Number,
            default: 21
        },
        comments: [{ type: String }]
    },
    {
        timestamps: true,
    }
)

const Post = mongoose.model('Post', postSchema)

export default Post