import BlogModels from "../Models/postModels";

import { Request, Response } from "express";
import { BlogData } from "../AllInterfaces/AllInterfaces";

// Get all blog posts:
export const AllBlogPost = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const blogposts = await BlogModels.find();

        if (blogposts) {
            return res.status(200).json({
                message: "Successfully got all blog posts",
                data: blogposts
            })
        } else {
            return res.status(404).json({
                message: "There are no blog posts"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: "Couldn't get all blog posts",
            data: error
        })
    }
}

// Get a single post:
export const SingleBlogPost = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const blogpost = await BlogModels.findById(req.params.blogID);

        if (blogpost) {
            return res.status(200).json({
                message: "Successfully got this blog post",
                data: blogpost
            })
        } else {
            return res.status(404).json({
                message: "Blog Posts doesn't exist"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: "Couldn't get this blog post",
            data: error
        })
    }
}

// Search for a blog post:

// Upload a blog post:
export const UploadBlogPost = async(req: Request<{}, {}, BlogData>, res: Response): Promise<Response> =>{
    try {
        const { blogname, blogcategory, blogdescription, blogimage, bloglinks, views } = req.body;
    } catch (error) {
        return res.status(400).json({
            message: "An error occured in uploading blog post",
            data: error
        })
    }
}

// views of each blog post:

// update a blog post:

// Delete a blog post: