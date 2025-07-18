import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected') )

    //await mongoose.connect(`${process.env.MONGODB_URI}/tree-plantation`)
    await mongoose.connect('mongodb+srv://fayaz7333:fayaz7333@cluster0.ih3z25p.mongodb.net')

  } catch (error) {
    console.log(error.message);
  }
}

export default connectDB;