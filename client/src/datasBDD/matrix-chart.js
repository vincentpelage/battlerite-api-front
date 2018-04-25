const turquoise = 'rgba(97, 209, 229, 0.5)';
const popPurple = 'rgba(128, 131, 255, 0.7)';
const purple = '#3C3F5B';
const white = '#FFFFFF';

export const matrixData = {
	labels: ["Score", "Damage done", "Healing done", "Disables done", "Damage receive"],
	datasets: [
		{
			fillColor: popPurple,
			strokeColor: popPurple,
			pointColor: popPurple,
			pointStrokeColor: popPurple,
			pointHighlightFill: popPurple,
			pointHighlightStroke: popPurple,
		},
		{
			label: "Average",
			fillColor: turquoise,
			strokeColor: turquoise,
			pointColor: turquoise,
			pointStrokeColor: turquoise,
			pointHighlightFill: turquoise,
			pointHighlightStroke: turquoise,
		}
	]
};

export const matrixOptions = {
	//Boolean - Whether to show lines for each scale point
	scaleShowLine : true,

	//Boolean - Whether we show the angle lines out of the radar
	angleShowLineOut : true,

	//Boolean - Whether to show labels on the scale
	scaleShowLabels : false,

	// Boolean - Whether the scale should begin at zero
	scaleBeginAtZero : false,

	//String - Colour of the angle line
	angleLineColor : purple,
	scaleLineColor : purple,

	//Number - Pixel width of the angle line
	angleLineWidth : 1,
	scaleLineWidth : 1,

	//Number - Interval at which to draw angle lines ("every Nth point")
	angleLineInterval: 1,

	//String - Point label font declaration
	pointLabelFontFamily : "'Exo'",

	//String - Point label font weight
	pointLabelFontStyle : "normal",

	//Number - Point label font size in pixels
	pointLabelFontSize : 12,

	//String - Point label font colour
	pointLabelFontColor : white,

	//Boolean - Whether to show a dot for each point
	pointDot : true,

	//Number - Radius of each point dot in pixels
	pointDotRadius : 3,

	//Number - Pixel width of point dot stroke
	pointDotStrokeWidth : 1,

	//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	pointHitDetectionRadius : 20,

	//Boolean - Whether to show a stroke for datasets
	datasetStroke : false,

	//Number - Pixel width of dataset stroke
	datasetStrokeWidth : 2,

	//Boolean - Whether to fill the dataset with a colour
	// datasetFill : true,
	responsive: true,
	// maintainAspectRatio: true,
}
