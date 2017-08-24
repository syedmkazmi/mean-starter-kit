/**
 * Created by syedkazmi on 21/08/2017.
 */

// route controller for home page
let getHomePage = (req, res) => {
    res.render('index', { title: 'Mean Starter App' });
};

module.exports = {
    getHomePage
};