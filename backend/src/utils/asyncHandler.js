// const asyncHandler =(fun)=> async (req,res,next)=>{
//     try {
//         await fun(req, res, next);
//     } catch (error) {
//         res.status(error.code || 5000)
//         .json({
//             success : false,
//             message : error.message
//         })
//     }
// }

const asyncHandler =(fun)=> {
    return (req, res, next) =>{
    Promise.resolve( fun(req, res, next)).catch((err)=>next(err))
}
}

export  {asyncHandler}