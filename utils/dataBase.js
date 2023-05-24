import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const res = await mongoose.connect(process.env.LOCAL_DB,
        {
      dbName: "promptia",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    )

    isConnected = true;

    console.log({a: 'MongoDB connected', res: res})
  } catch (error) {
    console.log(error);
  }
}