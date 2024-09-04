const express = require('express');
const path = require('path');


const app = express();

app.use('*/scripts', express.static(path.resolve(__dirname, 'public', 'scripts')))
app.use('*/assets', express.static(path.resolve(__dirname, 'public', 'assets')))
app.use('*/styles', express.static(path.resolve(__dirname, 'public', 'styles')))
app.use('*/translate', express.static(path.resolve(__dirname, 'public', 'translate')))
app.use('*/docs', express.static(path.resolve(__dirname, 'public', 'docs')))
// app.use('/components', express.static(path.resolve(__dirname, 'public', 'scripts', 'components')))
// app.use('/vendors', express.static(path.resolve(__dirname, 'public', 'scripts', 'vendors')))


app.get('/*', (req, res)=>{
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

app.listen(process.env.Port || 3000, ()=> {console.log('builder serve is running');})