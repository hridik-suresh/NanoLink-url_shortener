import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Prevents duplicate accounts
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: false, // Not required for Google users
    minlength: 6,
    select: false, // This hides the password by default when we fetch user data
  },
  resetPasswordToken: String, // Token that will recieve by the user to reset password
  resetPasswordExpires: Date,
  isVerified: {
    // To check if the user's email is verified
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  googleId: {
    type: String,
    unique: true,
    sparse: true, // sparse allows multiple users to have 'null' (for non-google users)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// --- ENCRYPTION LOGIC ---
// This runs automatically every time a user is saved
userSchema.pre("save", async function (next) {
  // If there is no password (like a Google user), skip hashing!
  if (!this.password || !this.isModified("password")) {
    return next();
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- HELPER METHOD ---
// Added a method to the user object to check if a password is correct later
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
