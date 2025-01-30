const mongoose = require('mongoose');


// definir mon shema (ma structure ) MongodB de mes blogs
const blogSchema = new mongoose.Schema({
    title:{type:String,required: true},
    content:{type:String,required: true},
    category:{type:String,required: true},
    tags:{type:[String],required: true},
});

const Blog = mongoose.model("Blog",blogSchema); // ici Blog devient une class en JS qu'on peut manimuler (operation CRUD) , lie a la collection blogs ( (MongoDB met automatiquement le nom au pluriel et en minuscule).
module.exports = Blog; //pour rendre le model utilisable dans d'autre fichiers.