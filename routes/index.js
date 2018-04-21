module.exports = app => {
    /**
     * @api {get} / API Status
     * @apiGroup Status
     * @apiSuccess {String} status API Status' message
     * @apiSuccessExample {json} success
     *  HTTP/1.1 200 OK
     *  {"status": "NTask API"}
     */
    app.get("/", (req, res) => res.json({ status: "NTASK API"}));
    
}