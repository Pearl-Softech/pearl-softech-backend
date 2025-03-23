import Blog from "../models/blog.mjs";

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find(); // Fetch all blogs from the database
        return res.status(200).json({ type: "success", blogs });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ type: "error", message: 'Server error: Please try again later or contact devrajeshthapa@gmail.com to resolve this issue' });
    }
};

const getBlog = async (req, res) => {
    const { id } = await req.params;

    try {
        let blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ type: "error", message: 'Blog not found' });
        }
        return res.status(200).json({ type: "success", blog });
    } catch (err) {
        return res.status(500).json({ type: "error", message: 'Server error: Please try again later or contact devrajeshthapa@gmail.com to resolve this issue' });
    }
}


const addBlog = async (req, res) => {
    const { title, thumbnail, body } = await req.body;
    try {
        let blog = new Blog({
            title,
            thumbnail,
            body
        });
        console.log(blog);
        await blog.save();
        return res.status(200).json({ type: "success", message: 'Blog added successfully' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ type: "error", message: 'Server error: Please try again later or contact devrajeshthapa@gmail.com to resolve this issue' });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = await req.params; // No need for await here

    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ type: "error", message: 'Blog not found' });
        }
        return res.status(200).json({ type: "success", message: 'Blog deleted successfully' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ type: "error", message: 'Server error: Please try again later or contact devrajeshthapa@gmail.com to resolve this issue' });
    }
};

const updateBlog = async (req, res) => {
    try {
        // Extract blog ID from URL parameters
        const { id } = req.params;

        // Extract the updated data from the request body
        const { title, body, thumbnail } = req.body;

        // Validate incoming data (Basic validation)
        if (!title || !body || !thumbnail) {
            return res.status(400).json({ message: "Title, Body, and Thumbnail are required." });
        }

        // Find the blog by its ID and update it
        const updatedBlog = await Blog.findByIdAndUpdate(
            id, // ID to find the blog
            { title, body, thumbnail }, // Updated data
            { new: true } // Option to return the updated document
        );

        // If the blog is not found, send an error response
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        // Send success response with updated blog
        return res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });

    } catch (error) {
        console.error("Error updating blog:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const incrementViews = async (req, res) => {
    const { id } = await req.params;

    try {
        let blog = await Blog.findById(id);
        await Blog.findByIdAndUpdate(id, { views: blog.view + 1 });
    } catch (err) {
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export { getBlogs, getBlog, addBlog, deleteBlog, updateBlog, incrementViews };
