/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
  });
  var config = {
    map: map,
    packages: packages
  }
  System.config(config);
})(this);


/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
	'@angular2-material': 'node_modules/@angular2-material',
	'rxjs': 'node_modules/rxjs'
};

/** User packages configuration. */
const packages: any = {
	'@angular2-material/core': { format: 'cjs', defaultExtension: 'js', main: 'core.js' },
	'@angular2-material/button': { format: 'cjs', defaultExtension: 'js', main: 'button.js' },
	'@angular2-material/card': { format: 'cjs', defaultExtension: 'js', main: 'card.js' },
	'@angular2-material/checkbox': { format: 'cjs', defaultExtension: 'js', main: 'checkbox.js' },
	'@angular2-material/input': { format: 'cjs', defaultExtension: 'js', main: 'input.js' },
	'@angular2-material/list': { format: 'cjs', defaultExtension: 'js', main: 'list.js' },
	'@angular2-material/progress-bar': { format: 'cjs', defaultExtension: 'js', main: 'progress-bar.js' },
	'@angular2-material/progress-circle': { format: 'cjs', defaultExtension: 'js', main: 'progress-circle.js' },
	'@angular2-material/radio': { format: 'cjs', defaultExtension: 'js', main: 'radio.js' },
	'@angular2-material/sidenav':{ format: 'cjs', defaultExtension: 'js', main: 'sidenav.js' },
	'@angular2-material/toolbar': { format: 'cjs', defaultExtension: 'js', main: 'toolbar.js' }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/router-deprecated',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'node_modules/@angular',
    'rxjs': 'node_modules/rxjs',
    'boot': 'boot.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
