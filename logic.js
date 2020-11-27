$(document).ready(function () {
    var obj = {};
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var city = $('#cityInput').val();
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=ed95b778408ac6d4e0bb101e786ed762';

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;

        //key = ed95b778408ac6d4e0bb101e786ed762
        // $.ajax({
        //     url: queryURL,
        //     method: 'GET'
        // }).then(function (response) {
        var cityName = $('#fillList').children('li')[0];
        var date = $('#fillList').children('li')[1];;
        var icon = [];
        var temp = $('#fillList').children('li')[2];;
        var humidity = $('#fillList').children('li')[3];;
        var wind = $('#fillList').children('li')[4];;
        var uvInd = $('#fillList').children('li')[5];;

        //obj = response;
        //console.log(obj);
        cityName.innerText = 'City: ' + obj.name
        date.innerText = today;



        // });

    });
});