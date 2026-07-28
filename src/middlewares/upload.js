import multer from "multer";

const storage = multer.diskStorage({
    destination:function(req, res, cb){
        cb(null, "uploads/")
    },
    filename:function(req, file, cb){
        const id = req.params.id
        const fileExt = file.mimetype.slice(6)
        cb(null, id+"."+fileExt)
    }
})

export default function uploadMiddleware(fieldName){
    const upload = multer({
        storage: storage,
        limits:{fileSize: 2 * 1024 * 1024},
        fileFilter:function(req, file, cb){
            const fileExt = file.mimetype.slice(6)
            if(fileExt !== 'png' && fileExt !== 'jpg' && fileExt !== 'jpeg'){
                cb(new Error("Wrong type"))
            } else {
                cb(null, true)
            }
        }
    }).single(fieldName)
    return function(req, res, next){
        upload(req, res, function(err){
            if(err){
                res.status(400).json({
                    success:false,
                    messsage:err
                })
                return
            } else {
                next()
            }
        })
    }
}