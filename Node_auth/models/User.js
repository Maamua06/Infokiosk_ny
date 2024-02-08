const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

// model på hvordan user skal se ut i databasen
const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [4, 'Minimum password lenght is 4 characters']
    },
});

// Function som blir utført før brukeren blir lagret i databasen
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });

    if(user) {
       const auth = await bcrypt.compare(password, user.password);
       if (auth) {
        return user;
       }throw Error ('Incorrect password');

    } throw Error ('Incorrect email');
}

// viktig at 'user' blir skrevet i entall i forhold til hva collection heter i databasen
const User = mongoose.model('user', userSchema);

module.exports = User;