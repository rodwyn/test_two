var app = angular.module('expensesApp', ['ngRoute']);

//define routes for the app, each route defines a template and a controller
app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'RepositoriesController'
                })
                .when('/repositories', {
                    templateUrl: 'views/main.html',
                    controller: 'RepositoriesController'
                })
                .when('/repositories/rep/:name', {
                    templateUrl: 'views/rep.html',
                    controller: 'RepositoryController'
                })
                .when('/comments/issue/:number/title/:title/name/:name', {
                    templateUrl: 'views/comment.html',
                    controller: 'CommentController'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);

app.controller('RepositoriesController', ['$scope', 'Repositories', 'User', function($scope, Repositories, User) {
        $scope.repositories = Repositories.entries;
        $scope.userdata = User.entries;

        $scope.$watch(function() {
            return Repositories.entries;
        }, function(entries) {
            $scope.repositories = entries;
        });
        $scope.$watch(function() {
            return User.entries;
        }, function(entries) {
            $scope.userdata = entries;
        });
    }]);

app.controller('RepositoryController', ['$scope', '$routeParams', '$http', 'Submenus', function($scope, $routeParams, $http, Submenus) {
        $scope.someText = $routeParams.name;
        
        var api = 'https://api.github.com/repos/rodwyn/%rep%/issues';

        api = api.replace('%rep%', $routeParams.name);
        console.log(api);

        $http.get(api).success(function(response) {
            console.log(response);
            $scope.issues = response;
        });
    }]);
app.controller('CommentController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
        $scope.someText = $routeParams.title;
        var api = 'https://api.github.com/repos/rodwyn/%rep%/issues/%num%/comments';

        api = api.replace('%num%', $routeParams.number);
        api = api.replace('%rep%', $routeParams.name);
        console.log(api);

        $http.get(api).success(function(response) {
            console.log(response);
            $scope.comments = response;
        });
    }]);
app.factory('Repositories', function($http) {
    var service = {};
    service.entries = [];
    $http.get("https://api.github.com/users/rodwyn/repos?page=1&per_page=25")
            .success(function(response) {
                service.entries = response;
                console.log(response);
            });
    service.getById = function(id) {
        //find retrieves the first entry that passes the condition.
        //documentation for _.find() http://underscorejs.org/#find
        return _.find(service.entries, function(entry) {
            return entry.id === id;
        });
    };
    return service;

});
app.factory('User', function($http) {
    var service = {};
    service.entries = [];
    $http.get("https://api.github.com/users/rodwyn")
            .success(function(response) {
                service.entries = response;
                console.log(response);
            });
    service.getById = function(id) {
        //find retrieves the first entry that passes the condition.
        //documentation for _.find() http://underscorejs.org/#find
        return _.find(service.entries, function(entry) {
            return entry.id === id;
        });
    };
    return service;

});
app.factory('Issues', function($http) {
    var api = 'https://api.instagram.com/v1/tags/%tag%/media/recent?access_token=257058201.9af4692.6cf2c3b617d74a07848b198b3227ed05&callback=JSON_CALLBACK';
    console.log(api);
    api.replace('%tag%', $scope.tag);
    var service = {};
    service.entries = [];
    $http.get("https://api.github.com/users/rodwyn")
            .success(function(response) {
                service.entries = response;
                console.log(response);
            });
    service.getById = function(id) {
        //find retrieves the first entry that passes the condition.
        //documentation for _.find() http://underscorejs.org/#find
        return _.find(service.entries, function(entry) {
            return entry.id === id;
        });
    };
    return service;

});
app.factory('Submenus', function() {
    var service = {};
    service.entries = [];
    return service;
});