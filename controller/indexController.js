const fs = require('fs')

module.exports = {
    get: function (req, res) {
        console.log("register")
        userSession = req.session;
        if (userSession.email) {
            return res.redirect('/api/');
        }
        res.json({ status:"success", email:userSession.email})
    },
    login: function(req,res){
        if(req.session){
            userSession = req.session;
            userSession.email = req.body.email;
            res.status(200).json({status:'success',message:'User logged'});
        }else{
            res.status(500).json({status:'failed','error':'Something wrong!!'})
        }
    },
    getAPI: function(req, res){
        if(userSession.email){
            userSession.email = userSession.email;
            res.status(200).json({status:'success',message:`Hello ${userSession.email}`});
        }else{
            res.status(500).json({status:'failed','error':'Something wrong!!'})
        }
    },
    getPUB: function(req, res){
        if(userSession.email){
            userSession.email = userSession.email;
            res.status(200).json({status:'success',message:`Hello ${userSession.email}`});
        }else{
            res.status(500).json({status:'failed','error':'Something wrong!!'})
        }
    },
    save: function(req, res){
        if (!fs.existsSync(`${__dirname}/data`)) {
            fs.mkdirSync(`${__dirname}/data`);
        }
        fs.writeFile(`${__dirname}/data/${req.params.id}.json`, JSON.stringify(req.body), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            res.status(201).json('The file has been saved!');
        });
    },
    getSaved: function(req, res){
        if(req.params.id){
            let data = fs.readFileSync(`${__dirname}/data/${req.params.id}.json`);
            res.status(200).json(JSON.parse(data));
        }else{
            res.status(404).json({status:'failed','error':'Not found'})
        }
    },
    logout: function(req, res){
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/');
        });
    }
};
