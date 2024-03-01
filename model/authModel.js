const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

// userSchema.pre('save', async (next) => {
//     try {
//         console.log(this.password);
//         const salt = await bcrypt.genSalt();
        
//         const hashedPassword = await bcrypt.hash(this.password, salt);
//         this.password = hashedPassword;
//         next(); 
//     } catch (err) {
//         next(err);
//     }
// })


const usermodel = mongoose.model('User', userSchema);

module.exports = { usermodel };