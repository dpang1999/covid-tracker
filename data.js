
    var firebaseConfig = {
        apiKey: "AIzaSyBmznggzZWJ-fn4mQqrN0OgGqbxmAcLOF0",
        authDomain: "covidtracker-4da2a.firebaseapp.com",
        databaseURL: "https://covidtracker-4da2a.firebaseio.com",
        projectId: "covidtracker-4da2a",
        storageBucket: "covidtracker-4da2a.appspot.com",
        messagingSenderId: "820832515003",
        appId: "1:820832515003:web:60c2cd370fb99c2235ca9e",
        measurementId: "G-3T827RGVJW"
    };
    firebase.initializeApp(firebaseConfig);
    var currentDate = new Date();
    var data = {};
    var totals;
    function thisMakesMeAngry() {
        return currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.get(Month) + 1);
    };
    var today = currentDate.getFullYear() + '' + thisMakesMeAngry() + '' + currentDate.getDate();
    var maxCases=-1;
    var query = firebase.database().ref("data");
    query.once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            data[childSnapshot.key] = childSnapshot.val();
        });
        maxCases = data['Toronto'][numOfDates];
        sliderInput.setAttribute("max", ""+numOfDates);
        document.getElementById('maxCases').innerHTML=""+maxCases;//replace numOfDates with an actual value, i.e. the max cases at a location
        document.getElementById('pending').innerHTML="Total Number of Pending Cases: "+data['pending'][numOfDates];//fill pending here
    });
    var queryTwo = firebase.database().ref("Totals");
    queryTwo.once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            if(childSnapshot.key == today){
                totals = childSnapshot.val();
                document.getElementById('negative').innerHTML = "Negative - " + totals['Negative'];
                document.getElementById('confirmed').innerHTML = "Confirmed - " + totals['Confirmed positive'];
                document.getElementById('deceased').innerHTML = "Deceased - " + totals['Deceased'];
            }
        });
    });

    bounds = [
        [-99, 39], //Southwest coordinates
        [-71, 59] //Northeast coordinates
    ]
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHpjcCIsImEiOiJjazd3cDIwazYwNHd4M2RxdTQ1aWxwamF1In0.433QxPSQ-xAWDWFvD9b7lQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/dzcp/ck7xniymu1kvk1iqdiui4c151',
        center: [-79.38, 43.65],
        zoom:5,
        attributionControl: false,
        maxBounds: bounds
    });
    map.on('load', function()
    {
        map.addSource('Borders', {
            type: 'vector',
            url: 'mapbox://dzcp.ascrkivb'
        });
        map.addLayer(
        {
            'id': 'border',
            'source': 'Borders',
            'source-layer': 'HRP035b11a_e-dz3vx5',
            'type': 'fill',
            'paint':{
                'fill-opacity': 0.33,
                'fill-outline-color': "#ffffff"
                }
        });

        map.addSource('Assessment', {
            type: 'vector',
            url: 'mapbox://zenith404.ck837zzkb1nak2kmetcjm0osj-7b4iz'
        });
        map.addLayer(
        {
            'id': 'assessment',
            'source': 'Assessment',
            'source-layer': 'Covid_Assesment_Centres',
            'type': 'circle',
            'paint':{
                'circle-color': 'green'
            }
        });
        updateMap();
    });


    var names = new Map();
    function buildNamesMap(){
        names.set('Northwestern Health Unit', 'Northwestern');
        names.set('Thunder Bay District Health Unit', 'Thunder');
        names.set('Porcupine Health Unit', 'Porcupine');
        names.set('The District of Algoma Health Unit', 'Algoma');
        names.set('Sudbury and District Health Unit', 'Sudbury');
        names.set('Timiskaming Health Unit', 'Timiskaming');
        names.set('North Bay Parry Sound District Health Unit', 'North');
        names.set('Renfrew County and District Health Unit', 'Renfrew');
        names.set('City of Ottawa Health Unit', 'Ottawa');
        names.set('The Eastern Ontario Health Unit', 'Eastern');
        names.set('Simcoe Muskoka District Health Unit', 'Simcoe');
        names.set('Haliburton, Kawartha, Pine Ridge District Health Unit', 'Haliburton');
        names.set('Peterborough County - City Health Unit', 'Peterborough');
        names.set('Hastings and Prince Edward Counties Health Unit', 'Hastings');
        names.set('Kingston, Frontenac and Lennox and Addington Health Unit', 'Kingston');
        names.set('Leeds, Grenville and Lanark District Health Unit', 'Leeds');
        names.set('Grey Bruce Health Unit', 'Grey');
        names.set('York Regional Health Unit', 'York');
        names.set('Durham Regional Health Unit', 'Durham');
        names.set('Huron County Health Unit', 'Huron');
        names.set('Wellington-Dufferin-Guelph Health Unit', 'Wellington');
        names.set('Peel Regional Health Unit', 'Peel');
        names.set('City of Toronto Health Unit', 'Toronto');
        names.set('Perth District Health Unit', 'Perth');
        names.set('Waterloo Health Unit', 'Waterloo');
        names.set('Halton Regional Health Unit', 'Halton');
        names.set('Lambton Health Unit', 'Lambton');
        names.set('Middlesex-London Health Unit', 'Middlesex');
        names.set('Oxford County Health Unit', 'Southwestern');
        names.set('Brant County Health Unit', 'Brant');
        names.set('City of Hamilton Health Unit', 'Hamilton');
        names.set('Niagara Regional Area Health Unit', 'Niagara');
        names.set('Chatham-Kent Health Unit', 'Chatham');
        names.set('Elgin-St. Thomas Health Unit', 'Southwestern');
        names.set('Haldimand-Norfolk Health Unit', 'Haldimand');
        names.set('Windsor-Essex County Health Unit', 'Windsor');
    }
    buildNamesMap();

    var websites = new Map();
    function buildWebsitesMap(){
        websites.set('Northwestern Health Unit', 'https://www.nwhu.on.ca/Pages/coronavirus.aspx');
        websites.set('Thunder Bay District Health Unit', 'https://www.tbdhu.com/coronavirus');
        websites.set('Porcupine Health Unit', 'http://www.porcupinehu.on.ca/en/your-health/infectious-diseases/novel-coronavirus/');
        websites.set('The District of Algoma Health Unit', 'http://www.algomapublichealth.com/disease-and-illness/infectious-diseases/novel-coronavirus/#algoma');
        websites.set('Sudbury and District Health Unit', 'https://www.phsd.ca/health-topics-programs/diseases-infections/coronavirus/current-status-covid-19');
        websites.set('Timiskaming Health Unit', 'http://www.timiskaminghu.com/90484/COVID-19#Current%20Situation');
        websites.set('North Bay Parry Sound District Health Unit', 'https://www.myhealthunit.ca/en/health-topics/coronavirus.asp');
        websites.set('Renfrew County and District Health Unit', 'https://www.rcdhu.com/novel-coronavirus-covid-19-2/');
        websites.set('City of Ottawa Health Unit', 'https://www.ottawapublichealth.ca/en/reports-research-and-statistics/la-maladie-coronavirus-covid-19.aspx#Data-Table-for-Figure-2');
        websites.set('The Eastern Ontario Health Unit', 'https://eohu.ca/en/my-health/covid-19-status-update-for-eohu-region');
        websites.set('Simcoe Muskoka District Health Unit', 'http://www.simcoemuskokahealthstats.org/topics/infectious-diseases/a-h/covid-19#Confirmed');
        websites.set('Haliburton, Kawartha, Pine Ridge District Health Unit', 'https://www.hkpr.on.ca/covid-19-2/covid-19/');
        websites.set('Peterborough County - City Health Unit', 'https://www.peterboroughpublichealth.ca/your-health/diseases-infections-immunization/diseases-and-infections/novel-coronavirus-2019-ncov/local-covid-19-status/');
        websites.set('Hastings and Prince Edward Counties Health Unit', 'https://hpepublichealth.ca/the-novel-coronavirus-2019ncov/');
        websites.set('Kingston, Frontenac and Lennox and Addington Health Unit', 'https://www.kflaph.ca/en/healthy-living/novel-coronavirus.aspx');
        websites.set('Leeds, Grenville and Lanark District Health Unit', 'https://healthunit.org/coronavirus/');
        websites.set('Grey Bruce Health Unit', 'https://www.publichealthgreybruce.on.ca/COVID-19');
        websites.set('York Regional Health Unit', 'https://www.york.ca/wps/portal/yorkhome/health/yr/infectiousdiseasesandprevention/covid19/covid19/!ut/p/z1/jZDfT4MwEMf_Fh94lB6Mjc63ijrKtmBi3LAvpoMOMKwlLYPEv95Ol5glit7D5e7yuR_fQwxliEne1yXvaiV5Y_MXNnulZEHjeAlJGuAICKQk8UMM93MPbT8B-MUIIPaf_hGAjY9P_lpgFfh6Ha1LxFreVde13CuUWS9yq_FoitoIboThsmi16IU8KUdZrvq68ObfwRaxy1WLJxwA3SQh2XgpBHRyBnw_mMVeBAnEKQb6ED5O73DswdI_A-Nqykbtvh5P5G6C7dla7IUW2j1qW666rjU3DjgwDINbKlU2ws3VwYGfWiplOpRdkqg9PGfvq9s5fZs2_YpcfQDml0gV/dz/d5/L2dBISEvZ0FBIS9nQSEh/#.Xnqe_ZP0lQI');
        websites.set('Durham Regional Health Unit', 'https://www.durham.ca/en/health-and-wellness/novel-coronavirus-update.aspx#Status-of-cases-in-Durham-Region');
        websites.set('Huron County Health Unit', 'https://www.hpph.ca/en/news/coronavirus-covid19-update.aspx#COVID-19-in-Huron-and-Perth');
        websites.set('Wellington-Dufferin-Guelph Health Unit', 'https://www.wdgpublichealth.ca/your-health/covid-19-information-public');
        websites.set('Peel Regional Health Unit', 'https://peelregion.ca/coronavirus/#cases');
        websites.set('City of Toronto Health Unit', 'https://www.toronto.ca/home/covid-19/');
        websites.set('Perth District Health Unit', 'https://www.hpph.ca/en/news/coronavirus-covid19-update.aspx#COVID-19-in-Huron-and-Perth');
        websites.set('Waterloo Health Unit', 'https://www.regionofwaterloo.ca/en/health-and-wellness/positive-cases-in-waterloo-region.aspx');
        websites.set('Halton Regional Health Unit', 'https://www.halton.ca/For-Residents/Immunizations-Preventable-Disease/Diseases-Infections/New-Coronavirus');
        websites.set('Lambton Health Unit', 'https://lambtonpublichealth.ca/2019-novel-coronavirus/');
        websites.set('Middlesex-London Health Unit', 'https://www.healthunit.com/novel-coronavirus#local-case-count');
        websites.set('Oxford County Health Unit', 'https://www.swpublichealth.ca/partners-and-professionals-update-novel-coronavirus-covid-19');
        websites.set('Brant County Health Unit', 'https://www.bchu.org/ServicesWeProvide/InfectiousDiseases/Pages/coronavirus.aspx');
        websites.set('City of Hamilton Health Unit', 'https://www.hamilton.ca/public-health/covid-19/novel-coronavirus-covid-19');
        websites.set('Niagara Regional Area Health Unit', 'https://www.niagararegion.ca/health/covid-19/default.aspx?topic=1');
        websites.set('Chatham-Kent Health Unit', 'https://ckphu.com/current-situation-in-chatham-kent-and-surrounding-areas/');
        websites.set('Elgin-St. Thomas Health Unit', 'https://www.swpublichealth.ca/partners-and-professionals-update-novel-coronavirus-covid-19');
        websites.set('Haldimand-Norfolk Health Unit', 'https://hnhu.org/health-topic/coronavirus-covid-19/');
        websites.set('Windsor-Essex County Health Unit', 'https://www.wechu.org/cv/local-updates');
    }
    buildWebsitesMap();
    var popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true
    });
    map.on('click', 'border', function(mouse) {
        var eng_name = mouse.features[0].properties.ENG_LABEL;
        var yesterday=daysToAdd-1;
        if(daysToAdd==0){yesterday=0;}
    	popup
    		.setLngLat(mouse.lngLat)
    		.setHTML(
    			"<p>&nbsp;</p>" +
				"<h2 style=\"text-align: center;\"><strong>&nbsp;</strong><strong>Health Unit<br/>Circonscription Sanitaire</span></span></strong></h2>" +
				"<p style=\"text-align: center;\"><strong><span class=\"tlid-translation translation\" lang=\"fr\"><span class=\"\" title=\"\">" + eng_name + "</span></span></strong></p>" +
				"<p style=\"text-align: center;\"><strong><span class=\"tlid-translation translation\" lang=\"fr\"><span class=\"\" title=\"\">" + mouse.features[0].properties.FRE_LABEL + "</span></span></strong></p>" +
				"<p style=\"text-align: center;\"><strong><span class=\"tlid-translation translation\" lang=\"fr\"><span class=\"\" title=\"\"> <a href=" + websites.get(eng_name) + " target=\"_blank\"> Health Unit Website </a></span></span></strong></p>" +
    			"<p style=\"text-align: center;\"><strong><span class=\"tlid-translation translation\" lang=\"fr\"><span class=\"\" title=\"\">Number of Cases to Date: " + data[names.get(eng_name)][daysToAdd] + "</span></span></strong></p>" +
                "<p style=\"text-align: center;\"><strong><span class=\"tlid-translation translation\" lang=\"fr\"><span class=\"\" title=\"\">Number of Cases on the Day: " + (data[names.get(eng_name)][daysToAdd] - data[names.get(eng_name)][yesterday]) + "</span></span></strong></p>"
                )
    		.addTo(map);
    });

    map.on('mouseenter', 'assessment', function(e){
        map.getCanvas().style.cursor = 'pointer';
        popup
            .setLngLat(e.features[0].geometry.coordinates.slice())
            .setHTML(
                "<p>&nbsp;</p>" +
				"<h2 style=\"text-align: center;\"><strong>&nbsp;</strong><strong>Assessment Centre<br/>Centres D'évaluation</span></span></strong></h2>" +
				"<p style=\"text-align: center; text-overflow: ellipsis;\"><strong><span class=\"tlid-translation translation\" lang=\"fr\"><span class=\"\" title=\"\">" + e.features[0].properties.name + "</span></span></strong></p>" +
				"<p style=\"text-align: center; text-overflow: ellipsis;\"><strong><span class=\"tlid-translation translation\" lang=\"fr\"><span class=\"\" title= \"\"><a href=" + e.features[0].properties.info + " target=\"_blank\"> Assessment Centre Website </a></span></span></strong></p>" +
				"<p style=\"text-align: center;\"><strong><span class=\"tlid-translation translation\" lang=\"fr\"><span class=\"\" title=\"\">Phone/T&eacute;l&eacute;phone: " + e.features[0].properties.phone + "</span></span></strong></p>"
    			)
    		.addTo(map);
    });
    map.on('mouseleave', 'assessment', function(e) {
        map.getCanvas().style.cursor = '';
    });

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var initialDate = new Date(2020, 0, 24);
    var date = new Date(2020, 0, 24);
    var numOfDates=Math.floor((currentDate.getTime()-initialDate.getTime())/86400000)-1;
    var sliderInput = document.getElementById("slider");
    var daysToAdd=0;

    updateDateLabel();

    function updateDateLabel(){
        var formattedDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        document.getElementById('date').innerHTML='Date: '+formattedDate;
    }

   //The big slider event listener, need this to update the map as well, current date is updated here as well
    document.getElementById('slider').addEventListener('input', function(e) {
        daysToAdd = parseInt(e.target.value, 10);//aka the index for each of the corresponding location arrays
        date.setTime(initialDate.getTime() + daysToAdd*86400000);//explanation: https://stackoverflow.com/questions/6963311/add-days-to-a-date-object
        updateDateLabel();
        updateMap();
        //filterBy(date);
    });
    //there should be 34 health units
    //VVV important, Southwestern = Elgin + Oxford, they merged in 2018 and it hasn't been reflected in the boundaries
    //instead of calculating the RgB every time, calculate colours and put it into a 2-d array when a day is requested,
    //mark down which days have been requested and have an if statement to check if there's colours in the 2-d array already, if not, calculate and store it
    function updateMap(){
        map.setPaintProperty(
        'border',
        'fill-color',
            ['match',
            ['get', 'ENG_LABEL'],

            'Northwestern Health Unit',
            pickColour(data['Northwestern'][daysToAdd]),

            'Thunder Bay District Health Unit',
            pickColour(data['Thunder'][daysToAdd]),

            'Porcupine Health Unit',
            pickColour(data['Porcupine'][daysToAdd]),

            'The District of Algoma Health Unit',
            pickColour(data['Algoma'][daysToAdd]),

            'Sudbury and District Health Unit',
            pickColour(data['Sudbury'][daysToAdd]),

            'Timiskaming Health Unit',
            pickColour(data['Timiskaming'][daysToAdd]),

            'North Bay Parry Sound District Health Unit',
            pickColour(data['North'][daysToAdd]),

            'Renfrew County and District Health Unit',
            pickColour(data['Renfrew'][daysToAdd]),

            'City of Ottawa Health Unit',
            pickColour(data['Ottawa'][daysToAdd]),

            'The Eastern Ontario Health Unit',
            pickColour(data['Eastern'][daysToAdd]),

            'Simcoe Muskoka District Health Unit',
            pickColour(data['Simcoe'][daysToAdd]),

            'Haliburton, Kawartha, Pine Ridge District Health Unit',
            pickColour(data['Haliburton'][daysToAdd]),

            'Peterborough County - City Health Unit',
            pickColour(data['Peterborough'][daysToAdd]),

            'Hastings and Prince Edward Counties Health Unit',
            pickColour(data['Hastings'][daysToAdd]),

            'Kingston, Frontenac and Lennox and Addington Health Unit',
            pickColour(data['Kingston'][daysToAdd]),

            'Leeds, Grenville and Lanark District Health Unit',
            pickColour(data['Leeds'][daysToAdd]),

            'Grey Bruce Health Unit',
            pickColour(data['Grey'][daysToAdd]),

            'York Regional Health Unit',
            pickColour(data['York'][daysToAdd]),

            'Durham Regional Health Unit',
            pickColour(data['Durham'][daysToAdd]),

            'Huron County Health Unit',
            pickColour(data['Huron'][daysToAdd]),

            'Wellington-Dufferin-Guelph Health Unit',
            pickColour(data['Wellington'][daysToAdd]),

            'Peel Regional Health Unit',
            pickColour(data['Peel'][daysToAdd]),

            'City of Toronto Health Unit',
            pickColour(data['Toronto'][daysToAdd]),

            'Perth District Health Unit',
            pickColour(data['Perth'][daysToAdd]),

            'Waterloo Health Unit',
            pickColour(data['Waterloo'][daysToAdd]),

            'Halton Regional Health Unit',
            pickColour(data['Halton'][daysToAdd]),

            'Lambton Health Unit',
            pickColour(data['Lambton'][daysToAdd]),

            'Middlesex-London Health Unit',
            pickColour(data['Middlesex'][daysToAdd]),

            'Oxford County Health Unit',
            pickColour(data['Southwestern'][daysToAdd]),

            'Brant County Health Unit',
            pickColour(data['Brant'][daysToAdd]),

            'City of Hamilton Health Unit',
            pickColour(data['Hamilton'][daysToAdd]),

            'Niagara Regional Area Health Unit',
            pickColour(data['Niagara'][daysToAdd]),

            'Chatham-Kent Health Unit',
            pickColour(data['Chatham'][daysToAdd]),

            'Elgin-St. Thomas Health Unit',
            pickColour(data['Southwestern'][daysToAdd]),

            'Haldimand-Norfolk Health Unit',
            pickColour(data['Haldimand'][daysToAdd]),

            'Windsor-Essex County Health Unit',
            pickColour(data['Windsor'][daysToAdd]),

            "rgb(0, 0, 0)"]
        );// can't have match or case or anything without a fallback value, so you can't do a for loop through all locations cuz otherwise, only the last one is applied and the rest gets the fallback value
    }
    //so the ideal is that the database returns UID -> [Cases], this way locations and colours can be arrays and thus put into the match where index = UID
    //otherwise there's a lot of garbage code writing to do where you'd have to match every single individual health unit by name to it's colour

    //not in use anymore
    function pickRGB(cases){
        var colour1 = [255,255,255];
        var colour2 = [220,28,19];
        var w2 = cases/maxCases;//weight for left colour, replace num of dates with count of most red
        var w1 = 1- w2;//weight for right colour
        var rgb = 'rgb('+Math.round(colour1[0]*w1+colour2[0]*w2)+','+Math.round(colour1[1]*w1+colour2[1]*w2)+','+Math.round(colour1[2]*w1+colour2[2]*w2)+')';
        return rgb;
    }

    function pickColour(cases){
        if(cases>maxCases*5/6)
        {
            return '#ff0000';
        }
        else if(cases>maxCases*4/6)
        {
            return '#ff5a00';
        }
        else if(cases>maxCases*3/6)
        {
            return '#ff9a00';
        }
        else if(cases>maxCases*2/6)
        {
            return '#ffce00';
        }
        else if(cases>maxCases*1/6)
        {
            return '#f0ff00';
        }
        else if (cases>0/6)
        {
            return 'khaki';
        }
        else
        {
            return 'white';
        }
    }

    function openNav() {
        document.getElementById("mySidenav").style.width = "25%";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
