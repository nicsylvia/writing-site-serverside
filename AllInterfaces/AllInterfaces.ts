export interface BlogData {
    blogname: string;
    blogimage: string;
    blogcategory: string;
    blogdescription: string;
    bloglinks: string;
    views: [];
}

export interface AdminData {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    // _id: string
    blogpost: {}[];
}