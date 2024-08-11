
exports.sucessResponse =(res,message,data) =>{
    res.status(200).json({
        success:true,
        message,
        data,
})
};

exports.errorResponse = (res,message,error) =>{
res.status(500).json({
    sucess:false,
    message,
    error,
})
};
