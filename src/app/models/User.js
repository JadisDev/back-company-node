import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      required: true,
    },
    login: {
      type: String,
      min: 3,
      required: true,
    },
    password: {
      type: String,
      min: 3,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Antes de persistir, criptografa o hah
UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },

  generateToken() {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  },
};

export default mongoose.model('User', UserSchema);
