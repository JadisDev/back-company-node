import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    //conexão usando mongodb
    // this.mongo = mongoose.connect(process.env.MONGO_URL, {
    //   useNewUrlParser: true,
    //   useFindAndModify: true,
    //   useUnifiedTopology: true,
    // });

    // this.mongo = mongoose.connect(process.env.MONGO_URL, {
    //   useNewUrlParser: true,
    //   useFindAndModify: true,
    //   useUnifiedTopology: true
    // }).then(() => console.log( 'Database Connected' ))
    // .catch(err => console.log( err ));

    this.mongo = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      user: 'admin',
      pass: 'admin'
    }).then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));

  }
}

export default new Database();
