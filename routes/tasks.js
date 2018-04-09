module.exports = app => {
    const Tasks = app.db.models.Tasks;


    app.route("/tasks")
        // Middleware for pre-execution of routes
        .all(app.auth.authenticate())
        
        .get((req, res) => {
            Tasks.findAll({ where: {user_id: req.user.id}})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message});
                });
        })

        .post((req, res) => {
            req.body.user_id = req.user.id // req.user.id is data sent by done callback in auth.js
            Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message});
                });

        });
    
// single task
    app.route("/tasks/:id")
        .all(app.auth.authenticate())
        
        .get((req, res) => {
            Tasks.findOne({where:{ id: req.params.id, user_id: req.user.id }})
                .then(result => {
                    if (result) {
                        res.json(result)
                    } else {
                        res.sendStatus(404);
                    }
                })

                .catch(error => {
                    res.status(412).json({ msg: error.message});
                });
        })

        .put((req, res) => {
            Tasks.update(req.body, {where: {id: req.params.id, user_id: req.user.id}})
            .then(result => res.sendStatus(204))  //204 means successful but no response
            .catch(error => {
                res.status(412).json({ msg: error.message});
            });
        })

        .delete((req, res) => {
            Tasks.destroy({ where: {id: req.params.id, user_id: req.user.id}})
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message})
            })
        });
}