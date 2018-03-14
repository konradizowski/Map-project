require('ammap3');
require('../../node_modules/ammap3/ammap/maps/js/worldLow.js');
require('../css/style.css');


document.addEventListener("DOMContentLoaded", function () {
    const map = AmCharts.makeChart( "mapdiv", {
        "type": "map",
        
        /**
         * create data provider object
         * map property is usually the same as the name of the map file.
         * getAreasFromMap indicates that amMap should read all the areas available
         * in the map data and treat them as they are included in your data provider.
         * in case you don't set it to true, all the areas except listed in data
         * provider will be treated as unlisted.
         */
        "dataProvider": {
            "map": "worldLow",
            "getAreasFromMap": true

        },

        /**
         * create areas settings
         * autoZoom set to true means that the map will zoom-in when clicked on the area
         * selectedColor indicates color of the clicked area.
         */
        "areasSettings": {
            "autoZoom": true
        },

        "smallMap": {}
    } );


    map.addListener("clickMapObject", function(event) {

        const urlApi = 'https://restcountries.eu/rest/v2/alpha?codes=';

        function  loadData() {
            document.querySelector(".flagWrap").style.display = "block";
            $.ajax({
                url: urlApi + event.mapObject.id
            }).done(function (response) {
                document.querySelector('.countryName').innerHTML = response[0].name;
                document.querySelector('.capital').innerHTML = '&#127961' + ' Capital: ' + response[0].capital;
                document.querySelector('.currency').innerHTML = '&#128177' + ' Currency: ' + response[0].currencies[0].name;
                document.querySelector('.languages').innerHTML = '&#5842' + ' Languages: ' + response[0].languages[0].name;

                function fnum(x) {
                    if (isNaN(x)) return x;

                    if (x < 9999) {
                        return x;
                    }

                    if (x < 1000000) {
                        return Math.round(x / 1000) + "K";
                    }
                    if (x < 10000000) {
                        return (x / 1000000).toFixed(2) + "M";
                    }

                    if (x < 1000000000) {
                        return (x / 1000000).toFixed(1) + "M";
                    }

                    if(x < 1000000000000) {
                        return (x/1000000000).toFixed(2) + "B";
                    }

                }


                    document.querySelector('.population').innerHTML = '&#9977' + ' Population: ' + fnum(response[0].population);
                    document.querySelector('.flag').setAttribute('src', response[0].flag);

                function  loadWeather() {

                    $.ajax({
                        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + response[0].capital +'&units=metric&APPID=7d39d21c46820b70dfc1978c32f2dcf1'
                    }).done(function (response) {
                        document.querySelector('.capitalName').innerHTML = response.name;
                        document.querySelector('.temperature').innerHTML = '&#127777' + ' Temperature: ' + response.main.temp.toFixed(1) + '&#8451';
                        document.querySelector('.weatherState').innerHTML = '&#127774' + ' Weather: ' + response.weather[0].description ;
                        document.querySelector('.humidity').innerHTML = '&#9926' + ' Humidity: ' + response.main.humidity + '&#37' ;
                        document.querySelector('.overcast').innerHTML = '&#9729' + ' Overcast: ' + response.clouds.all + '&#37' ;

                    }).fail(function (error) {
                        console.log(error);
                    })
                } loadWeather();

            }).fail(function (error) {
                console.log(error);
            })
        } loadData();
        });

});


