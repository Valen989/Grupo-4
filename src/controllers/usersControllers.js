const fs = require('fs')
const path = require('path')
const { getData } = require('../data');
const { error } = require('console');

const usersFilePath = path.join(__dirname, '../data/users.json');

const getUsers = () => {
    return getData('users.json');
}

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
}

module.exports = {
    register : (req,res) => {
        return res.render('users/register')
    },
    processRegister : (req,res) => {

        const users = getUsers(); //Trae los usuarios 

            const { username, email, password } = req.body;

            const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password 
    };

    users.push(newUser);

    saveUsers(users);

    //redirige a login
    return res.redirect('/users/login');

    },
    login : (req,res) => {
        return res.render('users/login')

    },
    processLogin: (req, res) => {
        const users = getData('users.json');

        const {email, password} = req.body;

        const user = users.find(user => user.email == email);
        
        if(user && user.password == password) {
            console.log("Autenticación exitosa");
            req.session.userLogin = {
                id : user.id,
                username : user.username,
                email : user.email,
                rol : user.rol
                
            };

            return res.redirect('/')
        }else {
            console.log("Intento fallido");
            return res.render('users/login',{
                msg : "Credenciales inválidas"
            });
        }
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/');
        });
    },

    profile : (req,res) => {
        if (!req.session.userLogin) {
            return res.redirect('/users/login');
        }
        res.render('users/profile', { userLogin: req.session.userLogin });
    }
    }
    
