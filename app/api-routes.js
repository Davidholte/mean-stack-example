var Item = require('./models/item');

function getItems(res) {
    Item.find(function (err, items) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(items); // return all items in JSON format
    });
};

// Exports to server.js
module.exports = function (app) {

// API ROUTES
//=======================================================================

    // HTTP GET
    // get all items
    app.get('/api/items', function (req, res) {
        // use mongoose to get all items in the database
        getItems(res);
    });

    // HTTP POST
    // create item and send back all items after creation
    app.post('/api/items', function (req, res) {

        // create an item, information comes from AJAX request from Angular
        Item.create({
            text: req.body.text,
            done: false
        }, function (err, item) {
            if (err)
                res.send(err);

            // get and return all the items after you create another
            getItems(res);
        });
    });

    // HTTP DELETE
    // delete an item
    app.delete('/api/items/:item_id', function (req, res) {
        Item.remove({
            _id: req.params.item_id
        }, function (err, item) {
            if (err)
                res.send(err);

            getItems(res);
        });
    });

    // APPLICATION
    //=======================================================================
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};

