module.exports = {
  devServer: {
    allowedHosts: ['localhost'], // ou remplacez par votre domaine si nécessaire
    setupMiddlewares: function (middlewares, devServer) {
      // Exemple de middleware avant la configuration
      devServer.app.use((req, res, next) => {
        console.log('Middleware avant la configuration');
        next();
      });

      // Exemple de middleware après la configuration
      devServer.app.use((req, res, next) => {
        console.log('Middleware après la configuration');
        next();
      });

      return middlewares;
    },
  },
};