$(document).ready(function () {
    var obj = {};
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var city = $('#cityInput').val();
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=ed95b778408ac6d4e0bb101e786ed762';
        // APIkey = ed95b778408ac6d4e0bb101e786ed762
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

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            var cityName = $('#fillList').children('li')[0];
            var date = $('#fillList').children('li')[1];;
            var temp = $('#fillList').children('li')[2];;
            var humidity = $('#fillList').children('li')[3];;
            var wind = $('#fillList').children('li')[4];;
            var uvInd = $('#image');

            obj = response;
            console.log(obj);
            cityName.innerText = 'City: ' + obj.name
            date.innerText = 'Date: ' + today;
            temp.innerText = 'Temperature: ' + obj.main.temp;
            humidity.innerText = 'Humidity: ' + obj.main.humidity + '%';
            wind.innerText = 'Wind: ' + obj.wind.speed + ' mph';
            uvInd.attr('src', 'http://openweathermap.org/img/wn/' + obj.weather[0].icon + '@2x.png')


        });

    });
});