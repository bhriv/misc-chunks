/***********************************************************************/
/********************* Setup Flurry API Variables **********************/
/***********************************************************************/

var base_url_Flurry           = 'http://api.flurry.com/',
    apiAccessCode             = 'XXXXXXXXXXXXXXXX',
    apiKey                    = checkApiKey(), 
    flurry_country_data       = [], 
    flurry_metric_data        = [],

    dates                     = [],
    combined_dates            = [],
    flurry_dates              = [],
    flurry_moment_dates              = [],
    course_values             = [],
    course_object             = [],
    flurry_values             = [],
    flurry_object             = [],

    url_new_Flurry            = '',
    url_metric_type           = '',
    url_app_metric_specific   = '',
    url_startDate             = '',
    url_endDate               = '',
    url_country               = 'ALL';



function constructFlurryEventEndpoint(type){
  console.log('...doing constructFlurryEventEndpoint()');
  url_metric_type           = 'eventMetrics',
  url_app_metric_specific   = type,
  url_startDate             = checkStartDate(),
  url_endDate               = checkEndDate(),
  url_country               = 'ALL';
  url_new_Flurry = base_url_Flurry + url_metric_type + '/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey + '&startDate=' + url_startDate + '&endDate=' + url_endDate + '&country=' + url_country;
  // var DEBUG_url_new_Flurry = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=FX2FBFN9RQXW8DKJH4WB&apiKey=VW7Z3VDXXSK7HM6GKWZ3&startDate=2015-01-01&endDate=2015-10-31&country=ALL';
  console.log('CUSTOM EVENT API URL: '+url_new_Flurry);
  return url_new_Flurry;
}


function runFlurryDashboard(){
  cc('runFlurryDashboard','run');
  var a = checkStartDate();
  var b = checkEndDate();
  var c = checkMetricType();
  var d = checkAppMetricSpecific();
  // var e = localStorage.getItem( 'event_metric_specific' );
  if (a && b && c && d) {
    cc('All Flurry requirements met, runDashboard executing','success');
    // get default 
    getChartData('NewUsers','days');
    $('#flurry_reports').show();
    }else{
    cc('All Flurry requirements NOT met, runDashboard NOT executing','fatal');
  }
}


// get the app details from Flurry endpoint, then add to the app_overview div
function getFlurryAppInfo(){
  cc('getFlurryAppInfo','run');
  $.getJSON( constructFlurryAppInfoEndpoint(), function( Flurry_json ) {
    console.log('getting url_Flurry data...');
    console.log(Flurry_json);
      //By using javasript json parser
      var app_versions = Flurry_json['version']; // @category, @createdDate, @createdDate,@name
      // loop through the version history and pass all version names to a list
      jQuery.each(app_versions, function(i, vdata) {
        console.log('app_versions DATA');
        console.log(vdata);
        var v_createdDate = vdata['@createdDate'];
        var v_name = vdata['@name'];
        var v_version = '<strong>Version Name:</strong> ' +v_name +'  <strong>Created:</strong> ' +v_createdDate;
        var v_history = '<li>'+v_version+'</li>';
        // Pass all version history to the UI
        $('ul.app_version_history').append(v_history);
      });
      $('span.app_category').html(Flurry_json['@category']);
      $('span.app_createdDate').html(Flurry_json['@createdDate']);
      $('span.app_name').html(Flurry_json['@name']);
      $('span.app_platform').html(Flurry_json['@platform']);
      $('span.app_generatedDate').html(Flurry_json['@generatedDate']);
    console.log('----- END getFlurryAppInfo -----');
  });
}


/*******************************************************/
/******  Build and Display  Flurry Chart  **************/
/*******************************************************/

function newFlurryChart(chart_id){
  cc('newFlurryChart','run');
  var canvas_id = 'flurry-chart-' +chart_id;
    var canvas = document.getElementById(canvas_id),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: flurry_dates,
      datasets: [
          {
              fillColor: "transparent",
              strokeColor: "#fe5f55",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: flurry_values
          }
      ]
    },
    latestLabel = startingData.labels[6];
    // Reduce the animation steps for demo clarity.
    var myLiveChart = new Chart(ctx).Line(startingData);
} // end newCombinedChart
