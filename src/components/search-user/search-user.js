angular.module("adminScreen")
    .component("searchUser", {
        templateUrl: './src/components/search-user/search-user.html',
        controller: function ($scope, usersAPI) {

            let userSearched;

            $scope.searchUser = function () {
                email = document.getElementById("email").value;
                usersAPI.getUsers()
                    .then(users => {
                        user = users.data.filter(a => {
                            if (a.email == email) {
                                return a;
                            }
                        })
                        userSearched = user[0];
                        $scope.userSearched = userSearched;
                    });
            }

            $scope.getUserSettings = function () {
                usersAPI.getUserSettings(userSearched.id)
                    .then(settings => {
                        console.log(settings.data);

                        $scope.brands_limit = settings.data.brands_limit
                        $scope.collected_limit = settings.data.collected_limit
                        $scope.analytics_limit = settings.data.analytics_limit;
                        $scope.crm_limit = settings.data.crm_limit;

                        setCheckbox(settings.data);
                    });
            }
            setCheckbox = function (settings) {
                if (settings.brands_limited) {
                    document.getElementById("check1").checked = true;
                }
                if (settings.collected_limited) {
                    document.getElementById("check2").checked = true;
                }
                if (settings.analytics_limited) {
                    document.getElementById("check3").checked = true;
                }
                if (settings.crm_limited) {
                    document.getElementById("check4").checked = true;
                }
                if (settings.analytics_pro) {
                    document.getElementById("check5").checked = true;
                }
                if (settings.dashboards) {
                    document.getElementById("check6").checked = true;
                }
                if (settings.historial_search) {
                    document.getElementById("check7").checked = true;
                }
            }

            $scope.setViewSettings = function () {
                $scope.viewSettings = !$scope.viewSettings;
            }

            $scope.setViewUserInformations = function () {
                $scope.viewUserInformations = !$scope.viewUserInformations;
            }

            $scope.getUserInformations = function () {
                usersAPI.getUserInformations(userSearched.id)
                    .then(userInfos => {
                        console.log(userInfos.data.password)
                        $scope.userPassword = userInfos.data.password;
                        $scope.activationState = userInfos.data.activation_state;
                        $scope.accountType = userInfos.data.account_type;
                        $scope.userInfos = userInfos.data;
                    })
            }
        }
    })