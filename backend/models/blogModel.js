import mongoose from 'mongoose'

const blogSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
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
    },
    {
        timestamps: true,
    }
)

const Blog = mongoose.model('Blog', blogSchema)

export default Blog