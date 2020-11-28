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
            var cityDate = $('#fillList').children('p')[0];
            var date = today;
            var temp = $('#fillList').children('p')[1];;
            var humidity = $('#fillList').children('p')[2];;
            var wind = $('#fillList').children('p')[3];;
            var img = $('#image');

            obj = response;
            console.log(obj);
            cityDate.innerText = obj.name + ' (' + date + ')';
            //date.innerText = 'Date: ' + today;
            temp.innerText = 'Temperature: ' + obj.main.temp + ' degrees';
            humidity.innerText = 'Humidity: ' + obj.main.humidity + '%';
            wind.innerText = 'Wind Speed: ' + obj.wind.speed + ' mph';
            img.attr('src', 'http://openweathermap.org/img/wn/' + obj.weather[0].icon + '@2x.png')


        });

    });
});