import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    //conexão usando mongodb
    this.mongo = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
