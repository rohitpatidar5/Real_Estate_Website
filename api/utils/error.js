//custome error
export const errorHandler = (statusCode, message) =>{
    const error = new Error()  //javascript constructor Error()
    error.statusCode= statusCode
    error.message= message;
    return error;
}