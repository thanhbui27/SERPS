const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcryptjs')


const UserSchema = new Schema({
    _id : Schema.Types.ObjectId,
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    role: { type: String, enum: ['student', 'teacher', 'admin', 'superadmin'], required: true },
    status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
    dateOfBirth: { type: Date, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    address: { type: String, required: true, trim: true },
    permissions: [{ type: String }] 
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  try {
    if(this.authType !== 'local') next()

    // Generate a salt
    const salt = await bcrypt.genSalt(10)

    // Generate a password hash (salt + hash)
    const passwordHashed = await bcrypt.hash(this.password, salt)

    // Re-assign password hashed
    this.password = passwordHashed

    next()
  } catch (error) {
    next(error)
  }
})


UserSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return newPassword === this.password
    //return await bcrypt.compare(newPassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

const User = mongoose.model('User', UserSchema)
module.exports = User