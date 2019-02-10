NodeList.prototype.sort = function(comparator, begin, end)
{
	Sorting.qsort(this, comparator, begin, end);
};

NodeList.prototype.swap = function(a, b)
{
	console.log(this);
	console.log("swap: " + this[a].childNodes[1].innerHTML + " <-> " + this[b].childNodes[1].innerHTML);
	// TODO
	var tmp = this[a];
	this[a] = this[b];
	this[b] = tmp;
};

var Comparators = {};

Comparators.ASCENDING = 1;
Comparators.DESCENDING = -1;

Comparator = function()
{
};

Comparator.prototype.compare = function(o1, o2)
{
	return 0;
};

RowComparator = function(column, cellComparator)
{
	this.column = column;
	this.cellComparator = cellComparator;
};

RowComparator.prototype = new Comparator();

RowComparator.prototype.compare = function(o1, o2)
{
	var cell1 = o1.childNodes[this.column];
	var cell2 = o2.childNodes[this.column];
	return this.cellComparator.compare(cell1, cell2);
};

CellComparator = function(comparator)
{
	this.comparator = comparator;
};

CellComparator.prototype = new Comparator();

CellComparator.prototype.compare = function(o1, o2)
{
	var val1 = o1.innerHTML.toLowerCase();
	var val2 = o2.innerHTML.toLowerCase();
	return this.comparator.compare(val1, val2);
};

StringComparator = function(direction)
{
	this.direction = direction;
};

StringComparator.prototype = new Comparator();

StringComparator.prototype.compare = function(o1, o2)
{
	if(o1 == o2)
		return 0;
	else if(o1 < o2)
		return -1 * this.direction;
	else
		return 1 * this.direction;
};

var Sorting = {};

Sorting.swap = function(list, a, b)
{
	if(list.swap)
		list.swap(a, b);
	else
	{
		var tmp = list[a];
		list[a] = list[b];
		list[b] = tmp;
	}
};

Sorting.partition = function(list, comparator, begin, end, pivot)
{
	var piv = list[pivot];
	Sorting.swap(list, pivot, end - 1);
	var store = begin;

	for( var ix = begin; ix < end - 1; ++ix)
	{
		var comp = 0;
		if(comparator)
			comp = comparator.compare(list[ix], piv);
		else
			comp = list[ix] - piv;
		if(comp <= 0)
		{
			Sorting.swap(list, store, ix);
			++store;
		}
	}
	Sorting.swap(list, end - 1, store);

	return store;
};

Sorting.qsort = function(list, comparator, begin, end)
{
	if(begin == null)
		begin = 0;
	if(end == null)
		end = list.length;
	if((end - 1) > begin)
	{
		var pivot = begin + Math.floor(Math.random() * (end - begin));

		pivot = Sorting.partition(list, comparator, begin, end, pivot);

		Sorting.qsort(list, comparator, begin, pivot);
		Sorting.qsort(list, comparator, pivot + 1, end);
	}
};