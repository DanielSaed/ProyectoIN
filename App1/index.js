//Dependencias
const morgan = require('morgan');
const express = require('express');
const app = express();
//Rutas
const michoacan = require('./routes/michoacan');
const nayarit = require('./routes/nayarit');
const user = require('./routes/user');
//middleware
const auth =require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);


app.use("/user", user);
app.use("/michoacan", michoacan);
app.use("/nayarit", nayarit);
app.use(auth);


app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});