require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: 'app/ts',

  paths: {
      // set paths to requirejs modules so they can be loaded by requirejs
      'angular': '../bower_components/angular/angular',
      'angular-route': '../bower_components/angular-route/angular-route',
      'angular-resource': '../bower_components/angular-resource/angular-resource',
      'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
      'jquery': '../bower_components/jquery/jquery',
      'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap'
  },

  shim: {
      'angular': {
          exports: 'angular'
      },
      'angular-route': {
          deps: ['angular']
      },
      'angular-resource': {
          deps: ['angular']
      },
      // 'angular-mocks': {
      //     deps: ['angular']
      // },
      'bootstrap': ['jquery']
  }
});
