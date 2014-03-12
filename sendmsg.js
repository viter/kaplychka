exports.sendm = function(app){
	app.io.route('ready', function(req) {
    req.io.join(req.data)
    app.io.room(req.data).broadcast('talk', {
        message: 'New client in the ' + req.data + ' room. '
    })
})
}