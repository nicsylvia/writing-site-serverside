import BlogModels from "../Models/postModels";
import cloudinary from "../Config/cloudinary"
import { Request, Response } from "express";
import { BlogData } from "../AllInterfaces/AllInterfaces";
import { environmentVariables } from "../Config/environmentVariables";
import AdminModels from "../Models/adminModels";

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
export const UploadBlogPost = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const cloud_Img = await cloudinary.uploader.Upload(req?.file?.path);

        const admin = await AdminModels.findById(req.params.adminID)

        const { blogname, blogcategory, blogdescription, blogimage, bloglinks, views } = req.body;

        const newBlogPost = await BlogModels.create({
            blogger: admin?.name,
            blogname,
            blogcategory,
            blogdescription,
            blogimage: cloud_Img.secure_url,
            bloglinks,
            views
        })
        if (newBlogPost) {
            return res.status(201).json({
                message: "Successfully created blog post",
                data: newBlogPost
            })
        } else {
            return res.status(404).json({
                message: "Couldn't create new blog post",
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: "An error occured in uploading blog post",
            data: error
        })
    }
}

// views of each blog post:

// update a blog post:
export const UpdateBlogPost = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const { blogname, blogcategory, blogdescription, bloglinks, blogimage } = req.body;

        const updatedblogpost = await BlogModels.findByIdAndUpdate(
            req.params.blogID,
            {
                blogname, blogcategory, blogdescription, bloglinks, blogimage
            },
            {new: true}
        )
        return res.status(200).json({
            message: "Successfully updated this blog post",
            data: updatedblogpost
        })
    } catch (error) {
        return res.status(400).json({
            message: "An error occured in updating this blog post",
            data: error
        })
    }
}

// Delete a blog post: