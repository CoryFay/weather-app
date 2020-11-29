$(document).ready(function () {
    var obj = [];
    var obj5Day = [];

    $("button").on("click", function (event) {
        event.preventDefault();
        $('#forecast').children('div').empty();
        $('#forecast').removeClass('hide');
        var city = $('#cityInput').val();
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=ed95b778408ac6d4e0bb101e786ed762';
        var fiveDayURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&APPID=ed95b778408ac6d4e0bb101e786ed762';
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
            obj = current;
            var cityDate = $('#fillList').children('p')[0];
            var date = today;
            var temp = $('#fillList').children('p')[1];
            var humidity = $('#fillList').children('p')[2];
            var wind = $('#fillList').children('p')[3];
            var img = $('#image');
            var newH3 = $('<h3>' + obj.name + '</h3>');

            $('#emptyBtnDiv').append(newH3);
            cityDate.innerText = obj.name + ' (' + date + ')';
            temp.innerText = 'Temperature: ' + obj.main.temp + ' degrees';
            humidity.innerText = 'Humidity: ' + obj.main.humidity + '%';
            wind.innerText = 'Wind Speed: ' + obj.wind.speed + ' mph';
            img.attr('src', 'http://openweathermap.org/img/wn/' + obj.weather[0].icon + '@2x.png')
            localStorage.setItem('currentDayWeather', JSON.stringify(obj));
        });

        // AJAX call for 5 day forecast
        $.ajax({
            url: fiveDayURL,
            method: 'GET'
        }).then(function (forecast) {
            for (var i = 0; i < 5; i++) {
                // Generate the date for 5 day forecast
                var selector = $('#num' + i);
                var imgForecast = $('<img>');
                var targetDate = new Date();
                targetDate.setDate(targetDate.getDate() + (i + 1));
                var dd2 = targetDate.getDate();
                var mm2 = targetDate.getMonth() + 1;
                var yyyy2 = targetDate.getFullYear();
                if (dd2 < 10) {
                    dd2 = '0' + dd2;
                }
                if (mm2 < 10) {
                    mm2 = '0' + mm2;
                }
                var dateString = mm2 + "/" + dd2 + "/" + yyyy2;
                // Fill the empty Divs with data from API 
                obj5Day = forecast;
                selector.append('<h4>' + dateString + '</h4>');
                imgForecast.attr('src', 'http://openweathermap.org/img/wn/' + obj5Day.list[3 + (i * 8)].weather[0].icon + '@2x.png')
                selector.append(imgForecast);
                selector.append('<p>Temp: ' + obj5Day.list[3 + (i * 8)].main.temp_max + '</p>');
                selector.append('<p>Humidity: ' + obj5Day.list[3 + (i * 8)].main.humidity + '%</p>');
                localStorage.setItem('fiveDayForecast', JSON.stringify(obj5Day));
            };
        });
    });
});