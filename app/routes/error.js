module.exports = function(app) {
  // Route not found (404)
app.use(function(req, res, next) {
  return res.status(404).send({ message: 'Route '+req.url+' Not found.' });
});
  // Server error
  app.use(function(err, req, res, next) {
     console.error(err.stack);
     res.status(500).send('Something broke!');
  });
};
