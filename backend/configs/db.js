import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected') )

    // Use local MongoDB in Docker
    await mongoose.connect('mongodb://mongodb:27017/tree-plantation')

  } catch (error) {
    console.log(error.message);
  }
}

export default connectDB;