var Contents = {};
var ContentsHTML = {};
var ContentsRenderer = {};

var currentContent = null;

var Content = {}; 

Content.load = function(name, url, renderer, isDefault)
{
	Contents[name] = null;
	ContentsHTML[name] = null;	
	ContentsRenderer[name] = renderer;	
	
	var newNavElem = document.createElement("li");
	var newLink = document.createElement("a");
	newLink.setAttribute("href", "javascript: Content.show('" + name + "');");
	var text = document.createTextNode(name);
	newLink.appendChild(text);
	newNavElem.appendChild(newLink);
	document.getElementById("menu").appendChild(newNavElem);
	
	AJAX.sendRequest(url,null,HTTP.GET, function(request) { Content.add(name, request.responseText, isDefault); }, function(request) { Content.loadFailed(name); });
};

Content.add = function(name, responseText, isDefault)
{
	Contents[name] = responseText;
	if(isDefault)
		Content.show(name);
};

Content.loadFailed = function(name)
{
	throw new Error("could not load content: '" + name + "'");
};

Content.show = function(name)
{	
	if(ContentsHTML[name] == null)
	{		
		if(Contents[name] == null)
		{
			alert("Inhalt noch nicht geladen...");
			return;
		}
		
		var renderer = ContentsRenderer[name];
		ContentsHTML[name] = renderer.render(Contents[name]);
	}
	document.getElementById("content").innerHTML = ContentsHTML[name];
	
	currentContent = name;
};

Content.sort = function(col, dir, type)
{
	ContentsRenderer[currentContent].sort(col, dir, type);
};

Renderer = function()
{
};

Renderer.prototype.render = function(content)
{
	return content;
};

CSVRenderer = function(sortColumns, filterColumns)
{
	this.sortColumns = sortColumns;
	this.filterColumns = filterColumns;
};

CSVRenderer.prototype = new Renderer();

CSVRenderer.prototype.parseCSV = function(csv)
{
	var table = new Array(0);
	
	var row;
	var cell;
	var i = 1;	
	
	do
	{		
		row = new Array(0);
		var newRow = false;
		do
		{
			var newCell = false;
			cell = new StringBuilder();	
			do
			{					
				if(i == csv.length-1)
				{
					newRow = true;
					i = i+1;
				}
				else if(i < csv.length-1 && csv.substring(i).startsWith("\"\n"))
				{
					newRow = true;
					i = i+3;
				}
				else if(i < csv.length-2 && csv.substring(i).startsWith("\"\r\n"))
				{
					newRow = true;
					i = i+4;
				}
				else if(i < csv.length-2 && csv.substring(i).startsWith("\";\""))
				{
					newCell = true;
					i = i+3;
				}
				else if(i < csv.length-1 && csv.substring(i).startsWith("\"\""))
				{
					cell.append('\"');
					i = i+2;
				}	
				else
				{
					cell.append(csv.charAt(i));
					i = i+1;
				}	
			} while(!newCell && !newRow);
			row[row.length] = cell.toString();
		} while(!newRow);
		table[table.length] = row;
	} while(i < csv.length-1);
	
	return table;
};

CSVRenderer.prototype.render = function(content)
{
	if(this.table == null)
		this.table = this.parseCSV(content);
		
	var html = new StringBuilder();
	
	html.append("<table border=\"1\">");
		
	for(var row = 0; row < this.table.length; row++)
	{		
		if(row == 0)
			this.renderHead(html, this.table[row]);
		else
			this.renderRow(html, this.table[row]);
	}	
	
	html.append("</table>");
	
	return html.toString();
};

CSVRenderer.prototype.renderHead = function(html, row)
{
	html.append("<tr>");
	for(var col = 0; col < row.length; col++)
	{	
		html.append("<th>");
		html.append(row[col]);
		if(row[col] == "")
			html.append("&nbsp;");
		if(this.sortColumns != null && this.sortColumns[col] != null)
		{
			html.append("&nbsp;");
			html.append("<a href=\"javascript:Content.sort(" + col + ",Comparators.ASCENDING,'" + this.sortColumns[col] + "')\">");
			html.append("&lt;");
			html.append("</a>");
			html.append("&nbsp;");
			html.append("<a href=\"javascript:Content.sort(" + col + ",Comparators.DESCENDING,'" + this.sortColumns[col] + "')\">");
			html.append("&gt;");
			html.append("</a>");
		}
		html.append("</th>");
	}
	html.append("</tr>");
};

CSVRenderer.prototype.renderRow = function(html, row)
{	
	html.append("<tr>");
	for(var col = 0; col < row.length; col++)
	{
		html.append("<td>");
		html.append(row[col]);
		if(row[col] == "")
			html.append("&nbsp;");
		html.append("</td>");
	}	
	html.append("</tr>");
};

CSVRenderer.prototype.sort = function(col, dir, type)
{
	var tbody = document.getElementById("content").firstChild.firstChild;
	tbody.childNodes.sort(new RowComparator(col, new CellComparator(new StringComparator(dir))),1);
	

	for(var i = 0; i < tbody.childNodes.length; i++)
	{
		console.log(tbody.childNodes[i].childNodes[col].innerHTML);
	}
	
	console.log("-- sorting done --");
};
