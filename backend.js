const { urlencoded } = require('express');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const sesion = require('express-session');
const  PassportLocal = require('passport-local').Strategy;
const app = express();

//Auentificacion con passport sprint 1

app.use(express.urlencoded ({extended: true}));
app.use(cookieParser('mi secreto'));
app.use(sesion({
    secret: 'mi secreto',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(function(username, password, done){
    if(username === "adan" && password === "12345678")
    return done(null, { id: 1, name: "camacho"});

    done(null, false);
}));

// Guardamos el identificador con el id de cada usuario, este proceso de llama serialización

passport.serializeUser(function(user, done){
    done(null, user.id);
})

//Deserealización (buscar el usaurios por su id)

passport.deserializeUser(function(id,done){
    done(null, { id: 1, name: "camacho"});
});

app.set('view engine', 'ejs');

app.get("/", (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    else {
        res.redirect("/login");
    }
    }
 ,(req, res)=>{
    res.send("Estas logueado");
});

app.get("/login", (req,res)=>{
    //mostrar el formulario de login
    res.render("login");
});

app.post("/login", passport.authenticate('local',{
    // mandar datos e iniciar sesion
    successRedirect: "/",
    failureRedirect: "/login"
}));


//TODO: AUthentificacion de usuario por JWT en sprint 2 


app.listen(3000, ()=> {
    console.log("Server is running on port:" +  3000);
});


