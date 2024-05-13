module.exports =  mongoose => {
    const userSchema = new mongoose.Schema({
        name:{type: String, required:true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    });

    userSchema.method("toJSON",function(){
        const{__v, _id, ...object} = this.toObject();
        return object;
    });

    const User = mongoose.model('User',userSchema);
    return User;
}