.NET Applications
#################

This folder includes demo applications written in .NET.

-----

.. contents::

.. section-numbering::

Build, tag, and push with Docker
--------------------------------

To push Docker images to a different location, change *yevgenykcx* to your needs.

.. code-block:: bash

    # in NET_CORE_REST_ENTRY_POINT_APP folder:
    docker build -t yevgenykcx/dotnet-core-http-entry-point .
    docker push yevgenykcx/dotnet-core-http-entry-point
    # in NET_CORE_PROPOGATOR_APP folder:
    docker build -t yevgenykcx/dotnet-core-http-propagator .
    docker push yevgenykcx/dotnet-core-http-propagator
    # in NET_CORE_SINK_APP folder:
    docker build -t yevgenykcx/dotnet-core-http-sink .
    docker push yevgenykcx/dotnet-core-http-sink

Requirements
------------
- .NET CORE 2.1
- The following 3 environment variables must to be exists, while the variable values have to be with in this format: "Protocol://ServerIP:ServerPort". For example: http://localhost:5551. Make sure the ports you choosed are available.
	1. NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL
	2. NET_CORE_PROPOGATOR_EXAMPLE_URL
	3. NET_CORE_SINK_EXAMPLE_URL

HOW TO RUN THE APPLICATIONS MANUALLY
- open CMD/Terminal:
	cd \NET_CORE_REST_ENTRY_POINT_APP
	dotnet build
	dotnet run

- open CMD/Terminal:
	cd \NET_CORE_PROPOGATOR_APP
	dotnet build
	dotnet run

- open CMD/Terminal:
	cd \NET_CORE_SINK_APP
	dotnet build
	dotnet run

HOW TO GET SQL_INJETION FLOW
** The following examples are based on the assumption that the protocol is 'http' and NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL is '5551'. Edit it according to your settings.

For the vulnearble flows (SQL INJECTION):
		[GET] http://localhost:5551/Entry/Sink/userInputGet
		[POST with string in the request body] http://localhost:5551/Entry/Sink 
		[PUT with string in the request body] http://localhost:5551/Entry/Sink/userInputPut
		[DELETE] http://localhost:5551/Entry/Sink/userInputDelete

For the unvulnerable flows (SQL INJECTION):
		[GET] http://localhost:5551/Entry/Prop/Sink/userInputGet
		[POST with string in the request body] http://localhost:5551/Entry/Prop/Sink 
		[PUT with string in the request body] http://localhost:5551/Entry/Prop/Sink/userInputPut
		[DELETE] http://localhost:5551/Entry/Prop/Sink/userInputDelete

***********************************************
********** FOR IAST QA & PROGRAMMERS **********
***********************************************
 
DEBUG MODE 
In debug mode, NET_CORE_PROPOGATOR_APP and NET_CORE_SINK_APP will print the uuid & sequence.
- Add this Environment variable to enable it: NET_CORE_MICRO_SERVICES_DEBUG = 1
 
OTHER APIs:
** The following examples are based on the assumption that:
- protocol is 'http'
- NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL = '5551'
- NET_CORE_PROPOGATOR_EXAMPLE_URL = '5552'
- NET_CORE_SINK_EXAMPLE_URL = '5553'

NET_CORE_REST_ENTRY_POINT_APP APIS:
	[GET] http://localhost:5551/Entry2/Sink/userInputGet
		- This API send GET request to NET_CORE_SINK_APP using WebRequest.Create
	[GET] http://localhost:5551/Entry3/Sink/userInputGet
		- This API send GET request to NET_CORE_SINK_APP using WebClient.OpenRead
	[GET] http://localhost:5551/Entry4/Sink/userInputGet
		- This API send GET request to NET_CORE_SINK_APP using httpClient.SendAsync

NET_CORE_PROPOGATOR_APP
	[GET] http://localhost:5552/Propogator/Sink/userInputGet
		- This API send GET request to NET_CORE_SINK_APP using HttpClient.GetStringAsync
	[POST with string in the request body] http://localhost:5552/Propogator/Sink 
		- This API send POST request to NET_CORE_SINK_APP using HttpClient.PostAsync
	[PUT with string in the request body] http://localhost:5552/Propogator/Sink/userInputPut
		- This API send PUT request to NET_CORE_SINK_APP using HttpClient.PutAsync
	[DELETE] http://localhost:5552/Propogator/Sink/userInputDelete
		- This API send DELETE request to NET_CORE_SINK_APP using HttpClient.DeleteAsync

NET_CORE_SINK_APP
	[GET] http://localhost:5553/userInputGet
	[POST with string in the request body] http://localhost:5553/
	[PUT with string in the request body] http://localhost:5553/userInputPut
	[DELETE] http://localhost:5553/userInputDelete

***************************
Snir.ShemTov@checkmarx.com