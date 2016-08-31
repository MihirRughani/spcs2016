angular.module('spcsApp.controllers', ['ionic', 'ngCordova', 'base64'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('AnalyticsCtrl', function($scope, Analytics, $state, $ionicLoading, $rootScope){
    if(window.localStorage.getItem('Authenticated')) {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-energized"></ion-spinner>',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        var analytics = Analytics.getAnalytics();
        analytics.success(function (data) {
            $scope.chapterLabels = ["NA", "WA", "CA", "FL", "NC", "TX", "IL", "GA", "MI", "NJ"];
            var memberDataByChapter = data.data.byChapter.member;
            $scope.chapterMemberData = [memberDataByChapter[0], memberDataByChapter[1], memberDataByChapter[2], memberDataByChapter[3], memberDataByChapter[4], memberDataByChapter[5], memberDataByChapter[6], memberDataByChapter[7], memberDataByChapter[8], memberDataByChapter[9]];
            var memberDataByYear = data.data.byYear.member;
            var memberDataYears = data.data.byYear.year;
            // $scope.years =
            $scope.numberOfFamilies = data.data.numberOfFamilies;
            $scope.numberOfHomeTowns = data.data.numberOfHomeTowns;
            $scope.numberOfIndividuals = data.data.numberOfIndividuals;
            $scope.numberOfStates = data.data.numberOfUniqueStates;
            $scope.chaptersSummaryData1 = [{
                label: "NA",
                means: "National",
                value: memberDataByChapter[0],
                bck: "#00BFFF"
            },
                {label: "WA", means: "Washington-DC", value: memberDataByChapter[1], bck: "#00FF00"},
                {label: "CA", means: "California", value: memberDataByChapter[2], bck: "#191970"},
                {label: "FL", means: "Florida", value: memberDataByChapter[3], bck: "#2F4F4F"},
                {label: "NC", means: "North Carolina", value: memberDataByChapter[4], bck: "#800000"}];
            $scope.chaptersSummaryData2 = [{label: "TX", means: "Texas", value: memberDataByChapter[5], bck: "#DEB887"},
                {label: "IL", means: "Illinois", value: memberDataByChapter[6], bck: "#CD5C5C"},
                {label: "GA", means: "Georgia", value: memberDataByChapter[7], bck: "#FF00FF"},
                {label: "MI", means: "Michigan", value: memberDataByChapter[8], bck: "#FFD700"},
                {label: "NJ", means: "New Jersey", value: memberDataByChapter[9], bck: "#D80000"}];
            $scope.chartColors = ['#00BFFF', '#00FF00', '#191970', '#2F4F4F', '#800000', '#DEB887', '#CD5C5C', '#FF00FF', '#FFD700', '#D80000'];

        });

        var localData = JSON.parse(window.localStorage.getItem('memberdata'));
        $scope.lookout={
            chapter: JSON.parse(window.localStorage.getItem('memberdata')).data.member.mm_chapter
        };
        var eventsList = Analytics.getEventByChapter($scope.lookout);
        eventsList.success(function (data) {
            if (data.data.message == "Event Does not exist") {
                $scope.noupcomingevents = true;
            } else {
                $scope.noupcomingevents = false;
                $scope.eventsList = [];
                $scope.eventsList[0] =  data.data.chapterLec;
                $scope.eventsList[0].event_name = $scope.eventsList[0].event_name.substring(0,28);
                $scope.eventsList[0].event_location = $scope.eventsList[0].event_location.substring(0,28);
                $scope.eventsList[0].event_date = $scope.eventsList[0].event_date_time.substring(0,9);
                $scope.eventsList[0].event_time = $scope.eventsList[0].event_date_time.substring(11);
            }
        });
        $scope.images = ["img/sliderimg1.png","img/sliderimg2.png","img/sliderimg3.png","img/sliderimg4.png"];
        $ionicLoading.hide();
    }else{
        $state.go('tabs.home');
    }
})

.controller('SearchCtrl', function ($scope, $state,  Members, $ionicLoading) {
    if(window.localStorage.getItem('Authenticated')) {

        $scope.numberofRecords = 25;
        $scope.criteria = {
            rows:25
        };

        $scope.criteria.accessToken = JSON.parse(window.localStorage.getItem("memberdata")).data.accessToken;
        $scope.criteria.memberId = JSON.parse(window.localStorage.getItem("memberdata")).data.memberId;
        // var mems = Members.getMembers(criteria);
        var mems = Members.search($scope.criteria);

        mems.success(function(data){

            $scope.numberofRecords = $scope.numberofRecords+25;
            var amems = data.data.member;
            $scope.totalMembers = data.data.total_record;
            var actualmems = [];
            for(var i=0; i < amems.length; i++){
                actualmems[i] = amems[i];
                var startchar = actualmems[i].member.mm_lname.substr(0, 1);
                switch (startchar.toLowerCase()) {
                    case 'a':
                        actualmems[i].bgcolor = "#dbe3fe";
                        break;
                    case 'b':
                        actualmems[i].bgcolor = "#c0f1eb";
                        break;
                    case 'c':
                        actualmems[i].bgcolor = "#cde8d8";
                        break;
                    case 'd':
                        actualmems[i].bgcolor = "#f1f6e2";
                        break;
                    case 'e':
                        actualmems[i].bgcolor = "#feecff";
                        break;
                    case 'f':
                        actualmems[i].bgcolor = "#ebd4fe";
                        break;
                    case 'g':
                        actualmems[i].bgcolor = "#b1cdff";
                        break;
                    case 'h':
                        actualmems[i].bgcolor = "#fffbff";
                        break;
                    case 'i':
                        actualmems[i].bgcolor = "#bde3dd";
                        break;
                    case 'j':
                        actualmems[i].bgcolor = "#d1bcb1";
                        break;
                    case 'k':
                        actualmems[i].bgcolor = "#e7e0c1";
                        break;
                    case 'l':
                        actualmems[i].bgcolor = "#b9dcc0";
                        break;
                    case 'm':
                        actualmems[i].bgcolor = "#d9d4d0";
                        break;
                    case 'n':
                        actualmems[i].bgcolor = "#feedd4";
                        break;
                    case 'o':
                        actualmems[i].bgcolor = "#e5ddb7";
                        break;
                    case 'p':
                        actualmems[i].bgcolor = "#c3dffe";
                        break;
                    case 'q':
                        actualmems[i].bgcolor = "#fecae6";
                        break;
                    case 'r':
                        actualmems[i].bgcolor = "#e1e5f1";
                        break;
                    case 's':
                        actualmems[i].bgcolor = "#ebf1ed";
                        break;
                    case 't':
                        actualmems[i].bgcolor = "#d9e8f4";
                        break;
                    case 'u':
                        actualmems[i].bgcolor = "#efffc9";
                        break;
                    case 'v':
                        actualmems[i].bgcolor = "#e1f4c1";
                        break;
                    case 'w':
                        actualmems[i].bgcolor = "#caf2ed";
                        break;
                    case 'x':
                        actualmems[i].bgcolor = "#f1e7ff";
                        break;
                    case 'y':
                        actualmems[i].bgcolor = "#d2f7e7";
                        break;
                    case 'z':
                        actualmems[i].bgcolor = "#fbdfff";
                        break;
                }
            }
            $scope.members = actualmems;
        });

        $scope.getInfo = function(info){
            console.log(info);
            $scope.criteria = {
                userId: JSON.parse(window.localStorage.getItem("memberdata")).data.memberId,
                accessToken: JSON.parse(window.localStorage.getItem("memberdata")).data.accessToken,
                search_member_id: info
            };
            // Members.get($scope.criteria);
            var result = Members.get($scope.criteria);

            result.success(function(data){
              console.log("member data : " , data);
                window.localStorage.setItem("searchmemberdata", JSON.stringify(data.data.member));
                $state.go('tabs.member');
            });
            // window.localStorage.setItem("searchmemberdata", data);
            // $state.go('tabs.member');
        };

        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };

        $scope.loadMore = function () {
            $scope.criteria.rows = $scope.numberofRecords;
            var results = Members.search($scope.criteria);
            results.success(function(data){
                $scope.$broadcast('scroll.infiniteScrollComplete');
                var amems = data.data.member;
                var actualmems = [];
                for(var i=0; i < amems.length; i++){
                    actualmems[i] = amems[i];
                    var startchar = actualmems[i].member.mm_lname.substr(0, 1);
                    switch (startchar.toLowerCase()) {
                        case 'a':
                            actualmems[i].bgcolor = "#dbe3fe";
                            break;
                        case 'b':
                            actualmems[i].bgcolor = "#c0f1eb";
                            break;
                        case 'c':
                            actualmems[i].bgcolor = "#cde8d8";
                            break;
                        case 'd':
                            actualmems[i].bgcolor = "#f1f6e2";
                            break;
                        case 'e':
                            actualmems[i].bgcolor = "#feecff";
                            break;
                        case 'f':
                            actualmems[i].bgcolor = "#ebd4fe";
                            break;
                        case 'g':
                            actualmems[i].bgcolor = "#b1cdff";
                            break;
                        case 'h':
                            actualmems[i].bgcolor = "#fffbff";
                            break;
                        case 'i':
                            actualmems[i].bgcolor = "#bde3dd";
                            break;
                        case 'j':
                            actualmems[i].bgcolor = "#d1bcb1";
                            break;
                        case 'k':
                            actualmems[i].bgcolor = "#e7e0c1";
                            break;
                        case 'l':
                            actualmems[i].bgcolor = "#b9dcc0";
                            break;
                        case 'm':
                            actualmems[i].bgcolor = "#d9d4d0";
                            break;
                        case 'n':
                            actualmems[i].bgcolor = "#feedd4";
                            break;
                        case 'o':
                            actualmems[i].bgcolor = "#e5ddb7";
                            break;
                        case 'p':
                            actualmems[i].bgcolor = "#c3dffe";
                            break;
                        case 'q':
                            actualmems[i].bgcolor = "#fecae6";
                            break;
                        case 'r':
                            actualmems[i].bgcolor = "#e1e5f1";
                            break;
                        case 's':
                            actualmems[i].bgcolor = "#ebf1ed";
                            break;
                        case 't':
                            actualmems[i].bgcolor = "#d9e8f4";
                            break;
                        case 'u':
                            actualmems[i].bgcolor = "#efffc9";
                            break;
                        case 'v':
                            actualmems[i].bgcolor = "#e1f4c1";
                            break;
                        case 'w':
                            actualmems[i].bgcolor = "#caf2ed";
                            break;
                        case 'x':
                            actualmems[i].bgcolor = "#f1e7ff";
                            break;
                        case 'y':
                            actualmems[i].bgcolor = "#d2f7e7";
                            break;
                        case 'z':
                            actualmems[i].bgcolor = "#fbdfff";
                            break;
                    }
                }
                $scope.members = actualmems;
                $scope.numberofRecords = $scope.criteria.rows+25;
            });

        };

        $scope.search={};

        $scope.searchMembers = function(search){
            console.log("serach loader");
            $scope.toggleGroup(true);
            search.rows = 25;
            search.accessToken = JSON.parse(window.localStorage.getItem("memberdata")).data.accessToken;
            search.memberId = JSON.parse(window.localStorage.getItem("memberdata")).data.memberId;
            var results = Members.search(search);
            results.success(function(data){
                var amems = data.data.member;
                var actualmems = [];
                if(data.data.total_record != 0) {
                    $scope.totalMembers = data.data.total_record;
                    $scope.ismemberSearchUnsuccessful = false;
                    for (var i = 0; i < amems.length; i++) {
                        actualmems[i] = amems[i];
                        var startchar = actualmems[i].member.mm_lname.substr(0, 1);
                        switch (startchar.toLowerCase()) {
                            case 'a':
                                actualmems[i].bgcolor = "#dbe3fe";
                                break;
                            case 'b':
                                actualmems[i].bgcolor = "#c0f1eb";
                                break;
                            case 'c':
                                actualmems[i].bgcolor = "#cde8d8";
                                break;
                            case 'd':
                                actualmems[i].bgcolor = "#f1f6e2";
                                break;
                            case 'e':
                                actualmems[i].bgcolor = "#feecff";
                                break;
                            case 'f':
                                actualmems[i].bgcolor = "#ebd4fe";
                                break;
                            case 'g':
                                actualmems[i].bgcolor = "#b1cdff";
                                break;
                            case 'h':
                                actualmems[i].bgcolor = "#fffbff";
                                break;
                            case 'i':
                                actualmems[i].bgcolor = "#bde3dd";
                                break;
                            case 'j':
                                actualmems[i].bgcolor = "#d1bcb1";
                                break;
                            case 'k':
                                actualmems[i].bgcolor = "#e7e0c1";
                                break;
                            case 'l':
                                actualmems[i].bgcolor = "#b9dcc0";
                                break;
                            case 'm':
                                actualmems[i].bgcolor = "#d9d4d0";
                                break;
                            case 'n':
                                actualmems[i].bgcolor = "#feedd4";
                                break;
                            case 'o':
                                actualmems[i].bgcolor = "#e5ddb7";
                                break;
                            case 'p':
                                actualmems[i].bgcolor = "#c3dffe";
                                break;
                            case 'q':
                                actualmems[i].bgcolor = "#fecae6";
                                break;
                            case 'r':
                                actualmems[i].bgcolor = "#e1e5f1";
                                break;
                            case 's':
                                actualmems[i].bgcolor = "#ebf1ed";
                                break;
                            case 't':
                                actualmems[i].bgcolor = "#d9e8f4";
                                break;
                            case 'u':
                                actualmems[i].bgcolor = "#efffc9";
                                break;
                            case 'v':
                                actualmems[i].bgcolor = "#e1f4c1";
                                break;
                            case 'w':
                                actualmems[i].bgcolor = "#caf2ed";
                                break;
                            case 'x':
                                actualmems[i].bgcolor = "#f1e7ff";
                                break;
                            case 'y':
                                actualmems[i].bgcolor = "#d2f7e7";
                                break;
                            case 'z':
                                actualmems[i].bgcolor = "#fbdfff";
                                break;
                        }
                    }
                }else{
                    $scope.totalMembers = 0;
                    $scope.ismemberSearchUnsuccessful = true;
                }
                $scope.members = actualmems;
            });
            $scope.criteria = search;
        };
    }else{
        $state.go('tabs.home');
    }

})


.controller('MemberDetailCtrl', function($scope) {
  var info = JSON.parse(window.localStorage.getItem("searchmemberdata"));
  info[0].mm_gender = info[0].mm_gender==0?"Male":"Female";
  info[0].mm_birth_year = info[0].mm_birth_year==0?"":info[0].mm_birth_year;
    $scope.ishometownempty = info[0].mm_hometown=="";
    $scope.isfathernameempty = info[0].mm_father_name=="";
    $scope.ismothermaidennameempty = info[0].mm_mother_maiden_name=="";
    $scope.isbirthmonthzero = info[0].mm_birth_month == 0 && info[0].mm_birth_year != 0;
    $scope.isbirthyearzero = info[0].mm_birth_year == 0 && info[0].mm_birth_month != 0;
    $scope.arebirthmonthandyearzero = info[0].mm_birth_month == 0 && info[0].mm_birth_year == 0;
    $scope.isOccupationempty = info[0].mm_occupation == "" || info[0].mm_occupation == null;
    $scope.isaddressempty = info[0].mm_address == "";
    $scope.iscityempty = info[0].mm_city == "";
    $scope.isstateempty = info[0].mm_state == "";
    $scope.iszipempty = info[0].mm_zip == "";
    $scope.isemailempty = info[0].mm_email == "";
  $scope.personalinfo = info[0];
  $scope.family = [];
  for(var i = 1; i < info.length; i++){
      info[i].mm_gender = info[i].mm_gender==0?"Male":"Female";
      var dob_month = info[i].mm_birth_month==0?"":info[i].mm_birth_month;
      var dob_year = info[i].mm_birth_year==0?"":info[i].mm_birth_year;
      info[i].mm_birth_year =   dob_month +"/"+dob_year;
      $scope.family[i-1] = info[i];
  }
})

.controller('FamilyMemberDetailCtrl', function($scope, $stateParams, Members) {
  console.log($stateParams.id);
  $scope.fMember = Members.getFamilyMember($stateParams.id);
  console.log($scope.fMember);
})


.controller('AccountCtrl', function($scope, $state, $ionicLoading) {
    if(window.localStorage.getItem('Authenticated')) {
        $ionicLoading.show({
            template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        var accountinfo = JSON.parse(window.localStorage.getItem("memberdata")).data.member;

        accountinfo.mm_gender = accountinfo.mm_gender == 0 ? "Male":"Female";
        accountinfo.mm_birth_month = accountinfo.mm_birth_month == 0 ? "" : accountinfo.mm_birth_month;
        accountinfo.mm_birth_year = accountinfo.mm_birth_year == 0 ? "" : accountinfo.mm_birth_year;
        $scope.ishometownempty = accountinfo.mm_hometown=="";
        $scope.isfathernameempty = accountinfo.mm_father_name=="";
        $scope.ismothermaidennameempty = accountinfo.mm_mother_maiden_name=="";
        $scope.isbirthmonthzero = accountinfo.mm_birth_month == 0 && accountinfo.mm_birth_year != 0;
        $scope.isbirthyearzero = accountinfo.mm_birth_year == 0 && accountinfo.mm_birth_month != 0;
        $scope.arebirthmonthandyearzero = accountinfo.mm_birth_month == 0 && accountinfo.mm_birth_year == 0;
        $scope.isOccupationempty = accountinfo.mm_occupation == "" || accountinfo.mm_occupation == null;
        $scope.isaddressempty = accountinfo.mm_address == "";
        $scope.iscityempty = accountinfo.mm_city == "";
        $scope.isstateempty = accountinfo.mm_state == "";
        $scope.iszipempty = accountinfo.mm_zip == "";
        $scope.isemailempty = accountinfo.mm_email == "";
        console.log("info photo: "+accountinfo.mm_photo);

        $scope.personalinfo = accountinfo;
        $scope.family = [];

      var familyInfo = JSON.parse(window.localStorage.getItem("memberdata")).data.member.family_members;

      for (var i = 0; i < accountinfo.family_members.length; i++) {
            accountinfo.family_members[i].mm_gender = familyInfo[i].mm_gender == 0 ? "Male":"Female";
            accountinfo.family_members[i].mm_birth_month = familyInfo[i].mm_birth_month == 0 ? "" : familyInfo[i].mm_birth_month;
            accountinfo.family_members[i].mm_birth_year = familyInfo[i].mm_birth_year == 0 ? "" : familyInfo[i].mm_birth_year;

            if(accountinfo.family_members[i].mm_birth_month == 0 && accountinfo.family_members[i].mm_birth_year != 0){
                accountinfo.family_members[i].dateOfBirth = familyInfo[i].mm_birth_year;
            }else if(accountinfo.family_members[i].mm_birth_month != 0 && accountinfo.family_members[i].mm_birth_year == 0){
                accountinfo.family_members[i].dateOfBirth = familyInfo[i].mm_birth_month;
            }else if(accountinfo.family_members[i].mm_birth_month == 0 && accountinfo.family_members[i].mm_birth_year == 0){
                accountinfo.family_members[i].dateOfBirth = "-";
            }else{
                accountinfo.family_members[i].dateOfBirth = familyInfo[i].mm_birth_month+"/"+familyInfo[i].mm_birth_year;
            }
        }
        $scope.family = accountinfo.family_members;
        $ionicLoading.hide();

        $scope.editContact = function () {
            $state.go('tabs.editmember');
        }
    }else{
        $state.go('tabs.home');
    }
})

.controller('EditMemberDetailCtrl', function($scope, $state, $ionicLoading, Members, $cordovaFileTransfer, $cordovaImagePicker,$cordovaCamera, $ionicPopup, $window, $base64){
    if(window.localStorage.getItem('Authenticated')) {
        $ionicLoading.show({
            template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        console.log(JSON.parse(window.localStorage.getItem("memberdata")));
        var accountinfo = JSON.parse(window.localStorage.getItem("memberdata")).data.member;
        accountinfo.mm_gender = accountinfo.mm_gender == 0 ? "Male":"Female";
        accountinfo.mm_birth_month = accountinfo.mm_birth_month == 0 || accountinfo.mm_birth_month == "" ? 0 : parseInt(accountinfo.mm_birth_month);
        accountinfo.mm_birth_year = accountinfo.mm_birth_year == 0 || accountinfo.mm_birth_year == "" ? 0 : parseInt(accountinfo.mm_birth_year);
        if(accountinfo.mm_birth_month == 0){
            accountinfo.mm_birth_month = "";
        }
        if(accountinfo.mm_birth_year == 0){
            accountinfo.mm_birth_year = "";
        }

        $scope.imgURI = accountinfo.mm_photo;
        $scope.personalinfo = accountinfo;
        var familyInfo = JSON.parse(window.localStorage.getItem("memberdata")).data.member.family_members;
        for (var i = 0; i < accountinfo.family_members.length; i++) {

            accountinfo.family_members[i].mm_gender = accountinfo.family_members[i].mm_gender == 0 ? "Male":"Female";
            accountinfo.family_members[i].mm_birth_month = familyInfo[i].mm_birth_month == 0 ? "" : familyInfo[i].mm_birth_month;
            accountinfo.family_members[i].mm_birth_year = familyInfo[i].mm_birth_year == 0 ? "" : familyInfo[i].mm_birth_year;
            if(accountinfo.family_members[i].mm_birth_month == 0){
                accountinfo.family_members[i].mm_birth_month = "";
            }
            if(accountinfo.family_members[i].mm_birth_year == 0){
                accountinfo.family_members[i].mm_birth_year = "";
            }

        }
        $scope.family = accountinfo.family_members;
        $scope.cancelEdit = function () {

            $state.go('tabs.contact', $window.location.reload());
        };
        $scope.saveData = function(update){
            update.accessToken = JSON.parse(window.localStorage.getItem("memberdata")).data.accessToken;
            update.memberId = JSON.parse(window.localStorage.getItem("memberdata")).data.memberId;
            update.first_name = update.mm_fname;
            update.last_name = update.mm_lname;
            update.father_name = update.mm_father_name;
            update.mother_maiden_name = update.mm_mother_maiden_name;
            update.hometown = update.mm_hometown;
            update.gender = update.mm_gender;
            update.address = update.mm_address;
            update.birth_month = update.mm_birth_month;
            update.birth_year = update.mm_birth_year;
            Members.update(update);
        };
        $ionicLoading.hide();
        $scope.clickPicture = function() {
            var options = {
                quality : 100,
                destinationType : Camera.DestinationType.FILE_URI,
                sourceType : Camera.PictureSourceType.CAMERA,
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                console.log(imageData);
                $scope.imgURI = imageData;
                window.localStorage.setItem("photoURL", imageData);
                console.log("Picture taken",window.localStorage.getItem("photoURL"));
                var options1 = new FileUploadOptions();
                options1.fileKey = "photo";
                options1.fileName = imageData.substring(imageData.lastIndexOf('/')+1);
                options1.mimeType = "image/jpeg";
                options1.httpMethod = "POST";
                //var url = encodeURI("http://spcsapi.techroversolutions.com/memberUpdate.php");
                var url = encodeURI("http://spcsusa.org/spcsapi/memberUpdate.php");
                var params = new Object();
                var currentData = JSON.parse(window.localStorage.getItem("memberdata"));
                params.accessToken = currentData.data.accessToken;
                params.memberId = currentData.data.memberId;
                params.first_name = currentData.data.member.mm_fname;
                params.last_name = currentData.data.member.mm_lname;
                params.hometown = currentData.data.member.mm_hometown;
                params.life_id = currentData.data.member.mm_life_id;
                params.o_surname = currentData.data.member.mm_original_surname;
                params.father_name = currentData.data.member.mm_father_name;
                params.mother_maiden_name = currentData.data.member.mm_mother_maiden_name;
                params.gender = currentData.data.member.mm_gender;
                params.address = currentData.data.member.mm_address;
                params.hphone = currentData.data.member.mm_hphone;
                params.cphone = currentData.data.member.mm_cphone;
                params.relationship = currentData.data.member.mm_relationship;
                params.marital_status = currentData.data.member.mm_marital_status;
                params.birth_month = currentData.data.member.mm_birth_month;
                params.birth_year = currentData.data.member.mm_birth_year;


                options1.params = params;

                var ft = new FileTransfer();
                ft.upload(imageData, url, function(result){
                    console.log("success");
                    var data = JSON.parse(result.response);
                    data.data.accessToken = JSON.parse(window.localStorage.getItem("memberdata")).data.accessToken;
                    data.data.memberId = JSON.parse(window.localStorage.getItem("memberdata")).data.memberId;
                    window.localStorage.setItem("memberdata",JSON.stringify(data));
                }, function(){console.log("failure")}, options1, true);

            }, function(err) {
               console.log(err);
            });
        };

        $scope.addFamilyMember = function(family){
            $state.go('tabs.addfmember');
        };
        $scope.info = {
            accessToken:"",
            memberId:""
        };
        $scope.addFMember = function(family){
            console.log(family);
            $scope.info.accessToken = JSON.parse(window.localStorage.getItem("memberdata")).data.accessToken;
            $scope.info.memberId = JSON.parse(window.localStorage.getItem("memberdata")).data.memberId;
            $scope.info.user_name = family.user_name;
            $scope.info.first_name = family.first_name;
            $scope.info.last_name = family.last_name;
            $scope.info.relationship = family.relationship;
            $scope.info.gender = family.gender;
            $scope.info.birth_month = family.birth_month;
            $scope.info.birth_year = family.birth_year;
            console.log($scope.info);
            Members.addFamily($scope.info);
        }
    }else{
        $state.go('tabs.home');
    }

    $scope.update={
        mm_gender:""
    };
})

.controller('AddFamilyMemberDetailCtrl', function($scope, $state, Members){
    $scope.info = {
        accessToken:"",
        memberId:""
    };
})

.controller('LoginCtrl', function($scope, $state, Login, $base64, $rootScope, $cordovaDevice, $ionicLoading, $ionicPopup) {
    // if(!window.localStorage.getItem('Authenticated')) {
        $scope.signIn = function (user) {
            if (user != null && user.username != null && user.password != null) {
                //CALL API to validate login, THE API must return APIKey that needs to be stored.
                if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
                    user.deviceType = 1;
                } else {
                    user.deviceType = 2;
                }
                // console.log($cordovaDevice.getUUID());
                user.udid = 1;//window.localStorage['deviceUUID'];
                // =window.localStorage['deviceType'];
                var password = $base64.encode(user.password);
                user.password = password;
                // console.log(user);
                $ionicLoading.show({
                    template: 'Loading..',
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                var loginPromise = Login.login(user);
                 console.log(loginPromise);
                loginPromise.success(function (data) {
                    if (data) {

                        // console.log("Login data",data);
                        try {

                            if (data.data.message == "login successful") {
                                //$rootScope.memberdata = data.member;

                                $rootScope.memberdata = data;

                                window.localStorage.setItem('memberdata', JSON.stringify(data));
                                window.localStorage.setItem('Authenticated', true);

                                $state.go('tabs.analytics');
                            } else {
                                $ionicPopup.alert({
                                    title: "AUTHENTICATION FAILURE",
                                    template: "Check the user name and password you have entered"
                                })
                            }
                        } catch (err) {
                            $ionicPopup.alert({
                                title: "AUTHENTICATION FAILURE",
                                template: "Check the user name and password you have entered"
                            });
                            console.log('Authentication failed');
                            window.localStorage.setItem('Authenticated', false);
                            $state.go('signin');
                        }

                    } else {
                        $ionicPopup.alert({
                            title: "AUTHENTICATION FAILURE",
                            template: "Check the user name and password you have entered"
                        });
                        window.localStorage.setItem('Authenticated', false);
                        $state.go('signin');
                    }
                });

                $ionicLoading.hide();

            } else {
                goBackToLogin();
            }
        };

        function goBackToLogin() {
            $scope.errorMessage = "Invalid Login Credentials!";
            console.log('Sign-In', 'Invalid Credential');
            window.localStorage.setItem('Authenticated', false);
            $state.go('tabs.home');
        }

        $scope.closeForgotPassword = function () {
            $scope.errorMessage = '';
            console.log('Closing forgot password');
            $state.go('login');
        };
    // }

})
.controller('EventsCtrl', function(Events, $scope, $state, $ionicLoading) {
    if(window.localStorage.getItem('Authenticated')) {
        $scope.eventsList = [];
        $ionicLoading.show({
            template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        var list = Events.getEventsList();
        list.success(function (data) {
            $scope.eventsList = [];
            if (data.data.message == "No Event found") {
                $scope.noupcomingevents = true;
            } else {
                $scope.noupcomingevents = false;
                var events = data.data.eventData;
                for(var i = 0; i < data.data.eventData.length; i++){
                    $scope.eventsList[i] = events[i];
                    $scope.eventsList[i].event_name = $scope.eventsList[i].event_name.substring(0,28);
                    $scope.eventsList[i].event_location = $scope.eventsList[i].event_location.substring(0,28);
                    $scope.eventsList[i].event_date = $scope.eventsList[i].event_date_time.substring(0,9);
                    $scope.eventsList[i].event_time = $scope.eventsList[i].event_date_time.substring(11);
                }
            }
        });
        $scope.images = ["img/sliderimg1.png","img/sliderimg2.png","img/sliderimg3.png","img/sliderimg4.png"];
        $ionicLoading.hide();
    }else{
        $state.go('tabs.home');
    }
})

.controller('SponsorsCtrl', function(Sponsors, $scope, $state, $ionicLoading) {
    if(window.localStorage.getItem('Authenticated')) {
        $ionicLoading.show({
            template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        $scope.sponsors = [];
        var list = Sponsors.getSponsorsList();

        list.success(function (data) {
            $scope.sponsors = data.data.sponsors;
        });

        $ionicLoading.hide();
    }else{
        $state.go('tabs.home');
    }
})

.controller('NecCtrl', function(Committee,$scope, $state, $ionicLoading) {
    if(window.localStorage.getItem('Authenticated')) {
        $scope.necMembers = [];
        $ionicLoading.show({
            template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        var members = Committee.getNecMembers();
        members.success(function (data) {
            $scope.totalnecmembers = data.data.chapterNec.length;
            for (var i = 0, j = data.data.chapterNec.length - 1; i < data.data.chapterNec.length; i++, j--) {
                $scope.necMembers[i] = data.data.chapterNec[j];
            }
        });
        $ionicLoading.hide();
    }else{
        $state.go('tabs.home');
    }
  })

.controller('LecCtrl', function(Committee,$scope, $state, $ionicLoading) {
    if(window.localStorage.getItem('Authenticated')) {
        $scope.lecMembers = [];
        $ionicLoading.show({
            template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        $scope.data = {
            chapter: JSON.parse(window.localStorage.getItem('memberdata')).data.member.mm_chapter
        };
        var members = Committee.getLECMembers($scope.data);
        members.success(function(data){
            // $scope.totallecmembers = data.data.chapterLec.length;
             for(var i = 0, j = data.data.chapterLec.length-1; i < data.data.chapterLec.length; i++, j--){
                 $scope.lecMembers[i] = data.data.chapterLec[i];
             }
        });
        $ionicLoading.hide();
    }else{
        $state.go('tabs.home');
    }
})
    .controller('LogoutCtrl', function($state, $scope){
        window.localStorage.removeItem('Authenticated');
        $state.go('signin');
    })
;
