const express = require('express');
const cors = require('cors');
const Blog = require('./models/blog');//ici Blog est devenue une classe manipulable(CRUD)

const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://haiballaelvarough:P4IDvxVjT41lHQC6@cluster0.d1ci8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(cors());

app.use(express.json()); // a middlewareto help Express undtnd Json data sent by the client


app.post( '/api/blog'  , async (req, res , next) => {

    try {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            tags: req.body.tags,
        });


        await blog.save() //une methode de mongose qui save et vérifie si les valeurs de blog respectent les contraintes définies dans le schéma (required, type, etc.).

        res.status(201).json({'message': 'Blog post was saved'});

    } catch (err) {
        res.status(500).json({'message': 'Blog post could not be created'});
    }

    next();
});

app.get('/api/blog/', ( req , res ) => {
    Blog.find() //return une prommesse de mongoose contenant tous les documment de la collections Blogs
        .then(blogs =>  res.status(200).json(blogs))
        .catch(err => console.log(err));
});

app.get('/api/blog/:id', ( req , res ) => {
    Blog.findById(req.params.id)
        .then(blog =>{
            if(!blog){
                return res.status(404).json({'message': 'Blog not found'});
            }
            res.status(200).json({"message" : 'ok'});
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({'message': 'Blog post could not be found '});
        })
})



app.listen(process.env.PORT||3000, () => {
    console.log("Server started on port 3000");
})

//679a83359c36c0864e05ad6a