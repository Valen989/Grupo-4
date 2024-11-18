const fs = require('fs')
const path = require('path')
const { getData } = require('../data');
const { error } = require('console');
const User = require('../models/User.js');
const { hashSync, compareSync } = require('bcryptjs');
const Radio = require('../models/Radio.js');
const Record = require('../models/Record.js');


const usersFilePath = path.join(__dirname, '../data/users.json');

const getUsers = () => {
    return getData('users.json');
}

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
}

module.exports = {
    register: (req, res) => {
        return res.render('users/register')
    },
    processRegister: async (req, res) => {

        try {
            const { username, email, password } = req.body;

            const newUser = new User({
                username: username.trim(),
                email: email.trim(),
                password: hashSync(password, 12),
                role: "user"
            })

            await newUser.save();

            return res.redirect('/admin')

        } catch (error) {
            console.log(error)
            return res.redirect('/error')
        }
    },
    login: (req, res) => {
        return res.render('users/login')

    },
    processLogin: async (req, res) => {

        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                email: email.trim()
            });

            if (user && compareSync(password, user.password)) {
                console.log("Autenticación exitosa");
                req.session.userLogin = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    rol: user.role

                };

                return res.redirect('/admin')
            } else {
                console.log("Intento fallido");
                return res.render('users/login', {
                    msg: "Credenciales inválidas"
                });
            }

        } catch (error) {
            console.log(error)
            return res.redirect('/error')
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

    profile: async (req, res) => {
        try {
            let user;
    
            if (req.params.id) {
                user = await User.findById(req.params.id).populate('radio');
                if (!user) {
                    return res.status(404).send("Usuario no encontrado");
                }
            } else {
                if (!req.session.userLogin) {
                    return res.redirect('/users/login');
                }
                user = await User.findById(req.session.userLogin.id).populate('radio'); 
            }
    
            res.render('users/profile', { userLogin: user });
        } catch (error) {
            console.log(error);
            return res.redirect('/error');
        }
    }


,
    destroy: async (req, res) => {
        try {

            const userDeleted = await User.findByIdAndDelete(req.params.id)

            if (!userDeleted) throw new Error('USER NOT FOUND');

            const radios = await Radio.find()

            radios.forEach(async (r) => {
                await Record.deleteMany({
                    radio: r.id
                })
            })
            await Radio.deleteMany({
                user: req.params.id
            })

            return res.redirect('/admin')

        } catch (error) {
            console.log(error)
            return res.redirect('/error')
        }
    },
    changeUsernameAndResetPassword: async (req, res) => {
        const { newUsername, newEmail, newPassword } = req.body;
        const { id } = req.params;
    
        try {
            // Cambiar nombre de usuario
            if (newUsername) {
                await User.findByIdAndUpdate(id, { username: newUsername }, { new: true });
            }
    
            // Cambiar correo electrónico
            if (newEmail) {
                const existingUser  = await User.findOne({ email: newEmail });
                if (existingUser ) {
                    return res.status(400).send("El correo electrónico ya está en uso.");
                }
                await User.findByIdAndUpdate(id, { email: newEmail }, { new: true });
            }
    
            // Cambiar contraseña
            if (newPassword) {
                const hashedPassword = hashSync(newPassword, 10); // Aquí se usa hashSync
                await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
            }
    
            res.redirect("/users/profile");
        } catch (error) {
            console.log(error);
            res.redirect("/error");
        }
    }

}

