const Blog = require('../models/blog');
const router = require('express').Router();
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://haiballaelvarough:P4IDvxVjT41lHQC6@cluster0.d1ci8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

router.post( '/'  , async (req, res , next) => {

    try {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            tags: req.body.tags,
        });
        await blog.save() ;

        res.status(201).json({'message': 'Blog post was saved'});

    } catch (err) {
        res.status(500).json({'message': 'Blog post could not be created'});
    }

});

router.get('/', ( req , res ) => {
    Blog.find() //return une prommesse de mongoose contenant tous les documment de la collections Blogs
        .then(blogs =>  res.status(200).json(blogs))
        .catch(err => console.log(err));
});

router.get('/:id', ( req , res ) => {
    Blog.findById(req.params.id)
        .then(blog =>{
            res.status(200).json({"message" : 'ok'});
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({'message': 'Blog post could not be found '});
        })
})

router.delete('/:id', ( req , res ) => {
    Blog.deleteOne({_id: req.params.id})
        .then(blog => {
            if(!blog){
                return res.status(404).json({'message': 'Blog not found'});
            }
            res.status(200).json({"message" : 'ok'});
        })
        .catch(err =>{
            console.log(err);
        })
});

router.put('/:id', ( req , res ) => {
    Blog.updateOne({_id: req.params.id} , { ...req.body , _id: req.params.id })
        .then(blog => {
            if(!blog){
                return res.status(404).json({'message': 'Blog not found'});
            }
            res.satatus('200').json({"message" : "blog deleted !"})
        })
        .catch(err => {
            res.status(404).json({'message': 'Blog post could not be found '});
        })
});


module.exports = router;
