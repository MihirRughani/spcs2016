// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('spcsApp', ['ionic', 'ngCordova','spcsApp.controllers', 'spcsApp.services', 'chart.js','base64' ])

.run(function($ionicPlatform, $cordovaDevice) {
  $ionicPlatform.ready(function() {

    //alert(window.localStorage['deviceUUID']);
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

    /*console.log($cordovaDevice.isAndroid());
    console.log($cordovaDevice.getUUID());*/
    /*var platform;
    var deviceType = 1;
    if( $ionicPlatform.isAndroid() || $ionicPlatform.isIOS() || $ionicPlatform.isIPad()){
        if($ionicPlatform.isIOS() || $ionicPlatform.isIPad()){
            deviceType = 2;
        }else if($ionicPlatform.isAndroid()) {
            deviceType = 1;
        }else {
            console.log("No such platform exists");
        }
    }else if($ionicPlatform.isWebView()){
        deviceType = 1;
    }

    window.localStorage['deviceType'] = deviceType;
    window.localStorage['deviceUUID'] = $cordovaDevice.getUUID();*/
})

    .directive('backColor', function(){
      return function(scope, element, attrs){
        var color = attrs.backColor;
        var content = element.find('a');
        content.css({
          'background-color': color
        });
      };
    })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    
    $stateProvider
        .state('signin',{
            cache:false,
            url:"/signin",
            templateUrl:"templates/tab-dash.html",
            controller: 'LoginCtrl'
        })

        .state('tabs', {
        cache:false,
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      .state('tabs.analytics', {
        cache:false,
        url: "/analytics",
        views: {
          'home-tab': {
            templateUrl: "templates/tab-analytics.html",
            controller: 'AnalyticsCtrl'
          }
        }
      })
        .state('tabs.mapview', {
          cache:false,
          url: "/mapview",
          views: {
            'sidemenu-tab': {
              templateUrl: "templates/mapview.html",
              controller: 'SearchCtrl'
            }
          }
        })
        .state('tabs.nearme', {
          cache:false,
          url: "/nearme",
          views: {
            'sidemenu-tab': {
              templateUrl: "templates/nearme.html",
              controller: 'SearchCtrl'
            }
          }
        })
        .state('tabs.events', {
          cache:false,
          url: "/events",
          views: {
            'sidemenu-tab': {
              templateUrl: "templates/events.html",
              controller: 'EventsCtrl'
            }
          }
        })
        .state('tabs.sponsors', {
          cache:false,
          url: "/sponsors",
          views: {
            'sidemenu-tab': {
              templateUrl: "templates/sponsors.html",
              controller: 'SponsorsCtrl'
            }
          }
        })
        .state('tabs.nec', {
          cache:false,
          url: "/nec",
          views: {
            'sidemenu-tab': {
              templateUrl: "templates/nec.html",
              controller: 'NecCtrl'
            }
          }
        })
        .state('tabs.lec', {
          cache:false,
          url: "/lec",
          views: {
            'sidemenu-tab': {
              templateUrl: "templates/lec.html",
              controller: 'LecCtrl'
            }
          }
        })
        .state('tabs.logout', {
            cache:false,
            url: "/logout",
            views: {
                'sidemenu-tab': {
                    controller: 'LogoutCtrl'
                }
            }
        })
        .state('tabs.socialShare', {
          cache:false,
          url: "/socialShare",
          views: {
            'sidemenu-tab': {
              templateUrl: "templates/socialShare.html"
            }
          }
        })
        .state('tabs.search', {
          cache:false,
          url: "/search",
          views: {
            'search-tab': {
              templateUrl: "templates/tab-search.html",
              controller: 'SearchCtrl'
            }
          }
        })
      .state('tabs.member', {
        cache:false,
        url: "/member",
        views: {
          'search-tab': {
            templateUrl: "templates/member-detail.html",
            controller: "MemberDetailCtrl"
          }
        }
      })
      .state('tabs.familyMember', {
        cache:false,
        url: "/familyMember/:fid",
        views: {
          'search-tab': {
            templateUrl: "templates/facts2.html",
            controller: "FamilyMemberDetailCtrl"
          }
        }
      })
      .state('tabs.about', {
        cache:false,
        url: "/about",
        views: {
          'about-tab': {
            templateUrl: "templates/about.html"
          }
        }
      })
      .state('tabs.navstack', {
        cache:false,
        url: "/navstack",
        views: {
          'about-tab': {
            templateUrl: "templates/nav-stack.html"
          }
        }
      })
      .state('tabs.contact', {
        cache:false,
        url: "/contact",
        views: {
          'contact-tab': {
            templateUrl: "templates/contact.html",
            controller: 'AccountCtrl'
          }
        }
      })
    .state('tabs.editmember', {
        cache:false,
        url: "/member/:id",
        views: {
            'contact-tab': {
                templateUrl: "templates/edit-member-detail.html",
                controller: "EditMemberDetailCtrl"
            }
        }
    })
      .state('tabs.addfmember', {
          cache:false,
          url: "/member/fmember",
          views: {
              'contact-tab': {
                  templateUrl: "templates/addfamilymember.html",
                  controller: "EditMemberDetailCtrl"
              }
          }
      });

    $urlRouterProvider.otherwise('/signin');

  })
;