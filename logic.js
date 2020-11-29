$(document).ready(function () {
    var obj = {};
    var obj5Day = {};

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var city = $('#cityInput').val();
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=ed95b778408ac6d4e0bb101e786ed762';
        var fiveDayURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&APPID=ed95b778408ac6d4e0bb101e786ed762'
        // APIkey = ed95b778408ac6d4e0bb101e786ed762

        // Formats the Current Date
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

        // AJAX call for current weather
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (current) {
            var cityDate = $('#fillList').children('p')[0];
            var date = today;
            var temp = $('#fillList').children('p')[1];;
            var humidity = $('#fillList').children('p')[2];;
            var wind = $('#fillList').children('p')[3];;
            var img = $('#image');

            obj = current;
            cityDate.innerText = obj.name + ' (' + date + ')';
            temp.innerText = 'Temperature: ' + obj.main.temp + ' degrees';
            humidity.innerText = 'Humidity: ' + obj.main.humidity + '%';
            wind.innerText = 'Wind Speed: ' + obj.wind.speed + ' mph';
            img.attr('src', 'http://openweathermap.org/img/wn/' + obj.weather[0].icon + '@2x.png')
        });

        // AJAX call for 5 day forecast
        $.ajax({
            url: fiveDayURL,
            method: 'GET'
        }).then(function (forecast) {
            for (var i = 0; i < 5; i++) {
                var selector = $('#num' + i);
                var imgForecast = $('<img>');
                var dateForecast = today;

                obj5Day = forecast;
                console.log(obj5Day);
                selector.append('<h2>' + obj5Day.list[3 + (i * 8)].dt_txt + '</h2>');
                imgForecast.attr('src', 'http://openweathermap.org/img/wn/' + obj5Day.list[3 + (i * 8)].weather[0].icon + '@2x.png')
                selector.append(imgForecast);
                selector.append('<p>Temp: ' + obj5Day.list[3 + (i * 8)].main.temp_max + '</p>');
                selector.append('<p>Humidity: ' + obj5Day.list[3 + (i * 8)].main.humidity + '%</p>');
            };
        });

    });
});