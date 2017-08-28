var express = require('express');
var app = express();
var mongojs=require('mongojs');
var db = mongojs('contactList',['contactList']);

var bodyParser=require('body-parser');

app.use(express.static(__dirname+'/public'));

//used to get the details from db as Json object
app.get('/contactList',function(req,res){
	console.log('I received a get request');
		db.contactList.find(function(err,docs){
			console.log(docs);
			res.json(docs);
		});
});

app.use(bodyParser.json());


//below is used to add the details
app.post('/contactList',function(req,res){
	console.log("is it here" + req.body);
	db.contactList.insert(req.body, function(err,doc){

		res.json(db);
	})
});

app.delete('/contactList/:id',function(req,res){
	var id=req.params.id;
	console.log("id to delete in server"+id);
	

	db.contactList.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	})

});


app.get('/contactList/:id',function(req,res){
var id=req.params.id;
	console.log("id to edit in server"+id);
	db.contactList.findOne({_id:mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});

app.put('/contactList/:id',function(req,res){
	var id= req.params.id;
	console.log(req.body.name);
	db.contactList.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update:{$set:{name: req.body.name, email:req.body.email,number:req.body.number}},
		new:true},function(err,doc){

			res.json(doc);
		});
});
app.listen(3000);
console.log('server is running on 3000');