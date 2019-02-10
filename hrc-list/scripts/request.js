var HTTP = {};

// HTTP STATUS CODES
// 1XX – Informationen
HTTP.STATUS_CONTINUE 								= 100;
HTTP.STATUS_SWITCHING_PROTOCOLS 					= 101;
HTTP.STATUS_PROCESSING 								= 102;
// 2XX – Erfolgreiche Operation
HTTP.STATUS_OK 										= 200;
HTTP.STATUS_CREATED 								= 201;
HTTP.STATUS_ACCEPTED 								= 202;
HTTP.STATUS_NON_AUTHORITATIVE_INFORMATION 			= 203;
HTTP.STATUS_NO_CONTENT 								= 204;
HTTP.STATUS_RESET_CONTENT 							= 205;
HTTP.STATUS_PARTIAL_CONTENT			 				= 206;
HTTP.STATUS_MULTI_STATUS 							= 207;
// 3XX – Umleitung
HTTP.STATUS_MULTIPLE_CHOICE 						= 300;
HTTP.STATUS_MOVED_PERMANENTLY 						= 301;
HTTP.STATUS_FOUND 									= 302;
HTTP.STATUS_SEE_OTHER 								= 303;
HTTP.STATUS_NOT_MODIFIED 							= 304;
HTTP.STATUS_USE_PROXY 								= 305;
HTTP.STATUS_SWITCH_PROXY							= 306;
HTTP.STATUS_TEMPORARY_REDIRECT						= 307;
// 4XX – Client-Fehler
HTTP.STATUS_BAD_REQUEST 							= 400;
HTTP.STATUS_UNAUTHORIZED							= 401;
HTTP.STATUS_PAYMENT_REQUIRED						= 402;
HTTP.STATUS_FORBIDDEN								= 403;
HTTP.STATUS_NOT_FOUND								= 404;
HTTP.STATUS_METHOD_NOT_ALLOWED						= 405;
HTTP.STATUS_NOT_ACCEPTABLE 							= 406;
HTTP.STATUS_PROXY_AUTHENTICATION_REQUIRED 			= 407;
HTTP.STATUS_REQUEST_TIMEOUT							= 408;
HTTP.STATUS_CONFLICT 								= 409;
HTTP.STATUS_GONE 									= 410;
HTTP.STATUS_LENGTH_REQUIRED							= 411;
HTTP.STATUS_PRECONDITION_FAILED 					= 412;
HTTP.STATUS_REQUEST_ENTITY_TOO_LARGE 				= 413;
HTTP.STATUS_REQUEST_URI_TOO_LONG 					= 414;
HTTP.STATUS_UNSUPPORTED_MEDIA_TYPE 					= 415;
HTTP.STATUS_REQUEST_RANGE_NOT_SATISFIABLE 			= 416;
HTTP.STATUS_EXPECTATION_FAILED						= 417;
HTTP.STATUS_I_M_A_TEAPOT 							= 418;
HTTP.STATUS_TOO_MANY_CONNECTIONS_FROM_YOUR_ADDRESS 	= 421;
HTTP.STATUS_UNPROCESSABLE_ENTITY 					= 422;
HTTP.STATUS_LOCKED 									= 423;
HTTP.STATUS_FAILED_DEPENDENCY 						= 424;
HTTP.STATUS_UNORDERED_COLLECTION 					= 425;
HTTP.STATUS_UPGRADE_REQUIRED 						= 426;
// 5XX – Server-Fehler
HTTP.STATUS_INTERNAL_SERVER_ERROR 					= 500;
HTTP.STATUS_NOT_IMPLEMENTED 						= 501;
HTTP.STATUS_BAD_GATEWAY 							= 502;
HTTP.STATUS_SERVICE_UNAVAILABLE 					= 503;
HTTP.STATUS_GATEWAY_TIMEOUT 						= 504;
HTTP.STATUS_HTTP_VERSION_NOT_SUPPORTED 				= 505;
HTTP.STATUS_VARIANT_ALSO_NEGOTIATES 				= 506;
HTTP.STATUS_INSUFFICIENT_STORAGE 					= 507;
HTTP.STATUS_BANDWIDTH_LIMIT_EXCEEDED 				= 509;
HTTP.STATUS_NOT_EXTENDED 							= 510;

// HTTP METHODS
HTTP.GET 		= "GET";
HTTP.POST 		= "POST";
HTTP.HEAD 		= "HEAD";
HTTP.PUT 		= "PUT";
HTTP.DELETE 	= "DELETE";
HTTP.TRACE 		= "TRACE";
HTTP.OPTIONS 	= "OPTIONS";
HTTP.CONNECT 	= "CONNECT";

var AJAX = {};

AJAX.sendRequest = function(url, params, method, doOnSuccess, doOnFailure)
{
	var request = new AJAX.createXMLHttp();
	request.open(method, url, true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function(){ AJAX.processRequest(request, doOnSuccess, doOnFailure) };
	request.send(params);
	return request;
}

AJAX.createXMLHttp = function()
{
	if (typeof XMLHttpRequest != "undefined")
		return new XMLHttpRequest();
	else if (window.ActiveXObject)
		return new new ActiveXObject("Microsoft.XMLHTTP");
	throw new Error("XMLHttp (AJAX) not supported");
}

AJAX.processRequest = function(request, doOnSuccess, doOnFailure)
{
	if (request.readyState == 4)
	{
		if((request.status >= HTTP.STATUS_OK) && (request.status < HTTP.STATUS_MULTIPLE_CHOICE))
		{
			if(doOnSuccess)
				doOnSuccess.call(null, request);
			else
				AJAX.defaultDoOnSuccess(request);
		}
		else
		{
			if(doOnFailure)
				doOnFailure.call(null, request);
			else
				AJAX.defaultDoOnFailure(request);
		}
	}
}

AJAX.defaultDoOnSuccess = function(request)
{
	// do nothing
}

AJAX.defaultDoOnFailure = function(request)
{
	// do nothing
}