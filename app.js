const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/thing.js');



mongoose.connect('mongodb+srv://haiballaelvarough:P4IDvxVjT41lHQC6@cluster0.d1ci8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
           .then(() => console.log('Connexion à MongoDB réussie !'))
          .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use((req, res , next ) =>{
    res.status(201);
    next();
});

app.post( '/api/stuff' ,(req,res,next)=>{
     delete req.body._id;//on supprime l id envoye par le front car Mongodb va le genere automatiquement
     const thing= new Thing({
      ...req.body
     });
     thing.save()//ici save()(methode dece model thing)  return un objet  promese( représente une opération asynchrone) en JS
         .then(()=> res.status(201).json(({'message':'ok'})))
         .catch(error=> res.status(401).json({error }));

});

app.get('/api/stuff', (req,res,next)=>{
    thing.find()
        .then(thing => res.status(200).json(thing))
        .catch(error=> res.status(401).json({error }));
});
module.exports=app;