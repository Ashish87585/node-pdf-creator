const express = require('express')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const homeRoute = require('./routes/homeRoutes')

const app = express();

app.use(expressLayout);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
app.use('/docs', express.static(path.join(__dirname, 'docs')))
app.use(homeRoute)

app.listen(3000, () => console.log(`App is up on 3000`))