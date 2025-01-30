const express = require('express');
const cors = require('cors');
userRouter = require('./routes/blog');

const app = express();

app.use(cors());

app.use(express.json()); // a middlewareto help Express undtnd Json data sent by the client


app.use( '/api/blog'  , userRouter);


app.listen(process.env.PORT||3000, () => {
    console.log("Server started on port 3000");
})

