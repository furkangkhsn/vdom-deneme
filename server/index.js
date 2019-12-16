const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3600;

let data = [{
	uid: 1,
	title: 'Deneme title 1',
	content: 'Deneme içerik 1',
	createdAt: 'tarih'
},{
	uid: 2,
	title: 'Deneme title 2',
	content: 'Deneme içerik 2',
	createdAt: 'tarih'
},{
	uid: 3,
	title: 'Deneme title 2',
	content: 'Deneme içerik 2',
	createdAt: 'tarih'
},{
	uid: 4,
	title: 'Deneme title 2',
	content: 'Deneme içerik 2',
	createdAt: 'tarih'
},{
	uid: 5,
	title: 'Deneme title 2',
	content: 'Deneme içerik 2',
	createdAt: 'tarih'
}];

app.get('/json', (req, res) => {
    res.send(JSON.stringify(data));
})

app.post('/dondurduk', (req, res) => {
	console.log(req.body);
	res.send(JSON.stringify({sonuc: true}));
})

app.listen(port, () => {
    console.log('dinliyorum');
    
});