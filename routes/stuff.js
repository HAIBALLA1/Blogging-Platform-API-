const express = require('express');
const Thing = require("../models/thing");
const router = express.Router();
const mongoose = require('mongoose');




mongoose.connect('mongodb+srv://haiballaelvarough:P4IDvxVjT41lHQC6@cluster0.d1ci8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

router.post( '/' ,(req,res,next)=>{
    delete req.body._id;//on supprime l id envoye par le front car Mongodb va le genere automatiquement
    const thing= new Thing({
        ...req.body
    });
    thing.save()//ici save()(methode dece model thing)  return un objet  promese( représente une opération asynchrone) en JS
        .then(()=> res.status(201).json(({'message':'ok'})))
        .catch(error=> res.status(401).json({error }));

});

router.get('/', (req,res,next)=>{
    thing.find()
        .then(thing => res.status(200).json(thing))
        .catch(error=> res.status(401).json({error }));
});

module.exports = router;