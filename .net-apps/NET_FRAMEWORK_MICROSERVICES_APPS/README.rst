***.NET FRAMEWORK MICRO SERVICES APP***

REQUIRMENTS
- .NET FRAMEWORK 4.7.2
- The following 3 enviornment variables must to be exists, while the varibale values have to be with in this format: "Protocol://ServerIP:ServerPort". For example: http://localhost:5561. Make sure the ports you choosed are available.
	1. NET_FRAMEWORK_REST_ENTRY_POINT_EXAMPLE_URL
	2. NET_FRAMEWORK_PROPOGATOR_EXAMPLE_URL
	3. NET_FRAMEWORK_SINK_EXAMPLE_URL
- IIS installed

HOW TO RUN THE APPLICATIONS MANUALLY
- ADD the 3 apps in your IIS. For each app do:
	- Open IIS Manager ( Start >> Run >> type inetmgr and hit enter). 
	- In the connections pane, right click on the Sites and click on Add Web Site. 
	- In the 'Physical path', choose the publish folder of this app.
	- Choose the same port as the Enviornment Variable. (For example, if you added this enviornment variable: NET_FRAMEWORK_REST_ENTRY_POINT_EXAMPLE_URL=http://localhost:5561, so for the Entry Point App choose the port to be 5561 )

HOW TO GET SQL_INJETION FLOW
** The following examples are based on the assumption that the protocol is 'http' and NET_FRAMEWORK_REST_ENTRY_POINT_EXAMPLE_URL is '5561'. Edit it according to your settings.

For the vulnearble flows (SQL INJECTION):

		[GET] http://localhost:5561/api/Entry_Sink?userInput=EntrySink_GET
		[POST with string as JSON in the request body] http://localhost:5561/api/Entry_Sink 
		[PUT with string as JSON in the request body] http://localhost:5561/api/Entry_Sink?input=Entry_Sink_PUT
		[DELETE] http://localhost:5561/api/Entry_Sink?userInput=Entry_Sink_DELETE

For the unvulnerable flows (SQL INJECTION):
		[GET] http://localhost:5561/api/Entry_Prop_Sink?userInput=EntryPropSink_GET
		[POST with as JSON string in the request body] http://localhost:5561/api/Entry_Prop_Sink
		[PUT with string in the request body] http://localhost:5561/api/Entry_Prop_Sink?input=Entry_Prop_Sink_PUT
		[DELETE] http://localhost:5561/api/Entry_Prop_Sink?userInput=Entry_Prop_Sink_DELETE

***********************************************
********** FOR IAST QA & PROGRAMMERS **********
***********************************************

OTHER APIs:
** The following examples are based on the assumption that:
- protocol is 'http'
- NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL = '5561'
- NET_CORE_PROPOGATOR_EXAMPLE_URL = '5562'
- NET_CORE_SINK_EXAMPLE_URL = '5563'

NET_CORE_REST_ENTRY_POINT_APP APIS:
	[GET] http://localhost:5561/api/Entry_Sink2?userInput=EntrySink2_GET
		- This API send GET request to NET_FRAMEWORK_SINK_APP using WebRequest.Create
	[GET] http://localhost:5561/api/Entry_Sink3?userInput=EntrySink3_GET
		- This API send GET request to NET_FRAMEWORK_SINK_APP using WebClient.OpenRead
	[GET] http://localhost:5561/api/Entry_Sink4?userInput=EntrySink4_GET
		- This API send GET request to NET_FRAMEWORK_SINK_APP using httpClient.SendAsync
	[GET] http://localhost:5561/api/Entry_Sink5?userInput=EntrySink5_GET
		- This API send GET request to NET_FRAMEWORK_SINK_APP using RestRequest

NET_CORE_PROPOGATOR_APP
	[GET] http://localhost:5562/api/Propogator_Sink?userInput=userInputGet
		- This API send GET request to NET_FRAMEWORK_SINK_APP using HttpClient.GetStringAsync

	[POST with string in the request body] http://localhost:5562/api/Propogator_Sink
		- This API send POST request to NET_FRAMEWORK_SINK_APP using HttpClient.PostAsync
	[PUT with string in the request body] http://localhost:5562/api/Propogator_Sink?userInput=userInputPut
		- This API send PUT request to NET_FRAMEWORK_SINK_APP using HttpClient.PutAsync
	[DELETE] http://localhost:5562/api/Propogator_Sink?userInput=userInputDelete
		- This API send DELETE request to NET_FRAMEWORK_SINK_APP using HttpClient.DeleteAsync

NET_CORE_SINK_APP
	[GET] http://localhost:5563/api/Sink?userInput={userInput}
	[POST with string in the request body] http://localhost:5563/api/Sink
	[PUT with string in the request body] http://localhost:5563/api/Sink?userInput={userInput}
	[DELETE] http://localhost:5553/api/Sink?userInput={userInput}

***************************
Snir.ShemTov@checkmarx.com