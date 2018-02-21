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
            "getAreasFromMap": true,
            "fill": '#A2C5A3'


        },

        /**
         * create areas settings
         * autoZoom set to true means that the map will zoom-in when clicked on the area
         * selectedColor indicates color of the clicked area.
         */
        "areasSettings": {
            "autoZoom": true,
            "selectedColor": "#CC0033"
        },

        "smallMap": {}
    } );


    map.addListener("clickMapObject", function(event) {

        const selected = event.mapObject.enTitle;
        console.log(event.mapObject);

        const urlApi = 'https://restcountries.eu/rest/v2/alpha?codes=';
        function  loadData() {
            $.ajax({
                url: urlApi + event.mapObject.id
            }).done(function (response) {
                console.log(response);

                document.querySelector('.capital').innerHTML = 'Capital' + response[0].capital;
                document.querySelector('.currency').innerHTML = 'Currency' + response[0].currencies[0].name;
                document.querySelector('.languages').innerHTML = 'Languages' + response[0].languages[0].name;
                document.querySelector('.population').innerHTML = 'Population' + response[0].population;

            }).fail(function (error) {
                console.log(error);
            })
        } loadData();
        console.log(selected);

    });



});
