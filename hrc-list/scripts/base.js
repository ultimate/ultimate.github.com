//						0		1		2		3		4		5		6		7		8		9		10		11				
var hrc_sort = 		[	"text",	"text",	"text", "text", "date", "date", "date", "text", "text", "text", "text", "text"	];
var hrc_filter = 	[	"list",	"list",	"list",	"list",	null,	"empty","empty","empty","empty","empty","empty","empty" ];

init = function()
{	
	Content.load("Home", 		"home.html", 			new Renderer(), 						true);
//	Content.load("HRC", 		"content/HardRock.csv", new CSVRenderer(hrc_sort, hrc_filter), 	false);
	Content.load("HRC", 		"content/test.csv", 	new CSVRenderer(hrc_sort, hrc_filter), 	false);
	Content.load("Impressum", 	"impressum.html", 		new Renderer(), 						false);
};