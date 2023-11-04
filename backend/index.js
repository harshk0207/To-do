const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

mongoose.set('strictQuery', true);
// mongodb+srv://harsh0207:Harsh%40123@cluster0.e66ktme.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://harsh0207:Harsh%40123@cluster0.e66ktme.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>console.log('Connected to mongodb'))
    .catch(err=>console.log('error',err.message));

app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));
app.use('/api/works',require('./routes/works'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});