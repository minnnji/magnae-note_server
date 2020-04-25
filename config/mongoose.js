const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => console.log('✔️  MongoDB Connected'));
db.on('error', () => console.error('❌  MongoDB Connection Error '));
