// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    ionic.Platform.fullScreen();
    if (window.StatusBar) {
      return StatusBar.hide();
    }
  });
})

.controller('AppCtrl', ['$scope', '$ionicModal', function($scope, $ionicModal) {

  $scope.data = {
    enableAwesome: true
  }

  $ionicModal.fromTemplateUrl('settings.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  });

  $scope.openSettings = function() {
    $scope.modal.show();
  };

  $scope.closeSettings = function() {
    $scope.modal.hide();
  };

}])

.directive('cardboardGl', [function() {

  return {
    restrict: 'E',
    link: function($scope, $element, $attr) {
      create($element[0]);
    }
  }

  function create(glFrame) {
    var scene,
        camera,
        renderer,
        element,
        container,
        controls,
        clock,
        cube;

    init();

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 700);
      camera.position.z = 3;
      scene.add(camera);

      renderer = new THREE.WebGLRenderer();
      element = renderer.domElement;
      container = glFrame;
      container.appendChild(element);

      // Our initial control fallback with mouse/touch events in case DeviceOrientation is not enabled
      controls = new THREE.OrbitControls(camera, element);
      controls.target.set(
        0,
        0,
        0
      );
      controls.noPan = true;
      controls.noZoom = true;

      // Lighting
      var light = new THREE.DirectionalLight(0xffffff, 0.8);
      light.position.set(0, 0, 1);
      scene.add(light);

      // Skybox
      var skybox_geometry = new THREE.BoxGeometry(500, 500, 500);
      var skybox_material = new THREE.MeshBasicMaterial({color: 0x404040, side: THREE.BackSide});
      var skybox = new THREE.Mesh(skybox_geometry, skybox_material);
      scene.add(skybox);

      // Cube
      var geometry = new THREE.BoxGeometry(1, 1, 1);
      var material = new THREE.MeshPhongMaterial({ color: 0x1c4a8c});
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      clock = new THREE.Clock();

      animate();
    }

    function animate() {
      var elapsedSeconds = clock.getElapsedTime();

      requestAnimationFrame(animate);

      update(clock.getDelta());
      render(clock.getDelta());
    }

    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    function update(dt) {
      resize();

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      camera.updateProjectionMatrix();

      controls.update(dt);
    }

    function render(dt) {
      renderer.render(scene, camera);
    }

    function fullscreen() {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    }

    function getURL(url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
           if (xmlhttp.status == 200){
               callback(JSON.parse(xmlhttp.responseText));
           }
           else {
               console.log('We had an error, status code: ', xmlhttp.status);
           }
        }
      }

      xmlhttp.open('GET', url, true);
      xmlhttp.send();
    }
  }
}]);
