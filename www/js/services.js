angular.module('spcsApp.services', [])

.factory('Members', function($http){
  return {
    search: function(criteria){
        return $http({
            method:"POST",
            url: "http://spcsusa.org/spcsapi/memberserach.php",
            //url:"http://spcsapi.techroversolutions.com/memberserach.php",
            data: criteria
        });/*.then(function(result){
            console.log(result);
        })*/
    },
    update : function(details){

        var url = encodeURI("http://spcsusa.org/spcsapi/memberUpdate.php");
        //var url = encodeURI("http://spcsapi.techroversolutions.com/memberUpdate.php");

        var params = new Object();
        var currentData = JSON.parse(window.localStorage.getItem("memberdata"));
        params.accessToken = details.accessToken;
        params.memberId = details.memberId;
        params.first_name = details.mm_fname;
        params.last_name = details.mm_lname;
        params.hometown = details.mm_hometown;
        params.life_id = currentData.data.member.mm_life_id;
        params.o_surname = currentData.data.member.mm_original_surname;
        params.father_name = details.mm_father_name;
        params.mother_maiden_name = details.mm_mother_maiden_name;
        params.gender = details.mm_gender;
        params.address = details.mm_address;
        params.hphone = currentData.data.member.mm_hphone;
        params.cphone = currentData.data.member.mm_cphone;
        params.relationship = currentData.data.member.mm_relationship;
        params.marital_status = currentData.data.member.mm_marital_status;
        params.birth_month = details.mm_birth_month;
        params.birth_year = details.mm_birth_year;

        var fileName;
        if(window.localStorage.getItem("photoURL")=="" || window.localStorage.getItem("photoURL")==null){
            fileName = JSON.parse(window.localStorage.getItem("memberdata")).data.member.mm_photo.substring(JSON.parse(window.localStorage.getItem("memberdata")).data.member.mm_photo.lastIndexOf('/')+1);
        }else{
            fileName = window.localStorage.getItem("photoURL").substring(window.localStorage.getItem("photoURL").lastIndexOf('/')+1)
        }

        var options1 = new FileUploadOptions();
        options1.fileKey = "file";
        options1.fileName = fileName;
        options1.httpMethod = "POST";
        options1.params = params;

        var ft = new FileTransfer();
        var imageData;
        if(window.localStorage.getItem("photoURL")=="" || window.localStorage.getItem("photoURL")==null){
           imageData = JSON.parse(window.localStorage.getItem("memberdata")).data.member.mm_photo;
        }else {
            imageData = window.localStorage.getItem("photoURL");
        }
        console.log("Uploading picture", imageData);
        ft.upload(imageData, url, function(result){
            console.log("success");
            var data = JSON.parse(result.response);
            console.log(data);
            data.data.accessToken = JSON.parse(window.localStorage.getItem("memberdata")).data.accessToken;
            data.data.memberId = JSON.parse(window.localStorage.getItem("memberdata")).data.memberId;
            window.localStorage.setItem("memberdata",JSON.stringify(data));
        }, function(fail){console.log("failure", fail);}, options1, true);
    },
    get: function(criteria){
        return $http({
            method: "POST",
            //url     : 'http://spcsapi.techroversolutions.com/searchallfamily.php',
            url:"http://spcsusa.org/spcsapi/searchallfamily.php",
            data: criteria
        });/*.then(function(result){
            console.log(result);
        })*/
    },
    addFamily: function(data){
        return $http({
            method: "POST",
            //url     : 'http://spcsapi.techroversolutions.com/insertfamilymember.php',
            url: "http://spcsusa.org/spcsapi/insertfamilymember.php",
            data: data
        }).then(function(result){
            console.log(result);
        })
    }
  }
})


.factory('Login', function($http){
  return{
    login: function (params){
        console.log(params);
      return $http({
            method  : 'POST',
            //url     : 'http://spcsapi.techroversolutions.com/memberLogin.php',
            url     : 'http://spcsusa.org/spcsapi/memberLogin.php',
            data    : params //forms user object
        });
    }
  }
})

.factory('Analytics', function($http){
  return {
    getAnalytics: function () {
      return $http({
        method: "GET",
        //url     : 'http://spcsapi.techroversolutions.com/analytics.php',
        url: 'http://spcsusa.org/spcsapi/analytics.php'
      });
    },
        getEventByChapter: function(chapterName){
        return $http({
            method: "POST",
            //url     : 'http://spcsapi.techroversolutions.com/chapterewiseevent.php',
            url: "http://spcsusa.org/spcsapi/chapterewiseevent.php",
            data: chapterName
        });/*.then(function(result){
            console.log(chapterName);
            console.log(result);
        })*/
    }
  }
})

.factory('Committee', function($http){
    return {
        getNecMembers: function(){
            return $http({
                method: "GET",
                //url     : 'http://spcsapi.techroversolutions.com/neclist.php',
                url: "http://spcsusa.org/spcsapi/neclist.php"
            });/*.then(function(result){
                console.log(result);
            })*/
        },

        getLECMembers: function(chapter) {
            return $http({
                method: "POST",
                //url     : 'http://spcsapi.techroversolutions.com/leclist.php',
                url: "http://spcsusa.org/spcsapi/leclist.php",//works
                data: chapter
            });/*.then(function(result){
                console.log(result);
            })*/
        }
    }
})

.factory('Events', function($http){
    return {
        getEventsList: function(){
            return $http({
                method: "GET",
                //url     : 'http://spcsapi.techroversolutions.com/chapterEvent.php',
                url: "http://spcsusa.org/spcsapi/chapterEvent.php"
            });/*.then(function(result){
                console.log(result);
            })*/
        }
    }
})

.factory('Sponsors', function($http){
    return {
        getSponsorsList: function() {
            return $http({
                method: "GET",
                //url     : 'http://spcsapi.techroversolutions.com/sponsors.php',
                url: "http://spcsusa.org/spcsapi/sponsors.php"
            })/*.then(function(result){
                console.log(result);
            })*/
        }
    }
})
;
