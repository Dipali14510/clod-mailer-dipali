import file from "../model/file.model.js"
import cloudinary from "../config/cloud.config.js"
export const uploadfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "file is required"
            })
        }

        const { fileName } = req.body
        if (!fileName) {
            return res.status(400).json({
                success: false,
                message: "file name is required"
            })
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "files",
                    resource_type: "auto"
                },
                (error, uploadResult) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(uploadResult)
                }
            )
            stream.end(req.file.buffer)
        })

        const uploadedFile = await file.create({
            fileName,
            fileURL: result.secure_url,
            createdBy: req.user._id
        })

        return res.status(201).json({
            success: true,
            msg: "file uploaded successfully",
            file: uploadedFile
        })
    } catch (error) {
        console.log("file uplode error",error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}