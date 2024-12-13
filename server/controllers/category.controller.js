import CategoryModel from '../models/category.model.js';

export const AddCategoryController = async (req, res) => {
    try {
        const {name, image} = req.body;
        if (!name || !image) {
            return res.status(400).json({
                message: 'Please fill all fields',
                error: true,
                success: false
            })
        }
        const addCategory = CategoryModel({
            name,
            image
        })
        // Save category
        const saveCategory = await addCategory.save();

        if (!saveCategory) {
            return res.status(400).json({
                message: 'Category not added',
                error: true,
                success: false
            })
        }
        return res.status(201).json({
            message: 'Category added successfully',
            data: saveCategory,
            error: false,
            success: true
        })
       


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
};

export const getCategoryController = async(request,response)=>{
    try {
        
        const data = await CategoryModel.find().sort({ createdAt : -1 })

        return response.json({
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.messsage || error,
            error : true,
            success : false
        })
    }
}

export const updateCategoryController = async(request,response)=>{
    try {
        const { _id ,name, image } = request.body 

        const update = await CategoryModel.updateOne({
            _id : _id
        },{
           name, 
           image 
        })

        return response.json({
            message : "Updated Category",
            success : true,
            error : false,
            data : update
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
