snakeApp.controller('snakeController', ['$rootScope', '$scope', '$interval', 'snakeService',
    function ($rootScope, $scope, $interval, snakeService) {

        $scope.snake = snakeService.snake;

        var play;
        var stepTime = 0;
        $scope.dificult = 5;
        $scope.points = 0;

        $scope.play = function () {

            playGround.focus();

            stepTime = 1000 / $scope.dificult;

            if ($scope.snake.parts.length == 0) {
                $scope.snake._startCreate();
                $scope.points = 0;
            }

            if (angular.isDefined(play)) return;

            play = $interval(function () {
                $scope.snake.move();
                if ($scope.snake.wallConnect()) {
                    $scope.stop();
                    alert ("Столкновение со стеной, игра окончена.\nВаш счёт: " + $scope.points);
                }
                if ($scope.snake.tailConnect()) {
                    $scope.stop();
                    alert ("Откушен хвост, игра окончена.\nВаш счёт: " + $scope.points);
                }
                if ($scope.snake.eatenFood()) {
                    $scope.snake.growing();
                    $scope.snake.foodCreate();
                    $scope.points = $scope.points + $scope.dificult;
                }
            }, stepTime);

            $scope.snake.foodCreate();
        };

        $scope.stop = function () {
            if (angular.isDefined(play)) {
                $interval.cancel(play);
                play = undefined;
            }
        };

        $scope.reset = function () {
            $scope.stop();
            $scope.snake.parts.length = 0;
            $scope.snake.direct = 100;
            $scope.snake.foodDelete();
        };

        $scope.arrowDown = function (clickEvent) {
            $scope.snake.whereGoing(clickEvent.keyCode);
        }

    }]);