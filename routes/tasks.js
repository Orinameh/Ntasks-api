module.exports = app => {
    const Tasks = app.db.models.Tasks;


    app.route("/tasks")
        // Middleware for pre-execution of routes
        // .all((req, res, next) => {
        //     delete req.body.id;  // ensures the exclusion of the id attr within the request's body
        //     next();
        // })
        
        .get((req, res) => {
            Tasks.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message});
                });
        })

        .post((req, res) => {
            Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message});
                });

        });
    
// single task
    app.route("/tasks/:id")
        // .all((req, res, next) => {
        //     delete req.body.id;
        //     next();
        // })

        .get((req, res) => {
            Tasks.findOne({where: req.params})
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
            Tasks.update(req.body, {where: req.params})
            .then(result => res.sendStatus(204))  //204 means successful but no response
            .catch(error => {
                res.status(412).json({ msg: error.message});
            });
        })

        .delete((req, res) => {
            Tasks.destroy({ where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message})
            })
        });
}