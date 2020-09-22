***.NET CORE MICRO SERVICES APP***

REQUIRMENTS
- .NET CORE 2.1
- The following 3 enviornment variables need to be exists, while the varibale values have to be with in this format: "http://ServerIP:ServerPort". for example: http://localhost:5553. make sure the ports you choosed are available.
	1. NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL
	2. NET_CORE_PROPOGATOR_EXAMPLE_URL
	3. NET_CORE_SINK_EXAMPLE_URL

HOW TO RUN THE APPLICATIONS
- open CMD/Terminal:
	cd \NET_CORE_PROPOGATOR_APP
	dotnet run
	cd \NET_CORE_REST_ENTRY_POINT_APP
	dotnet run
	cd \NET_CORE_SINK_APP
	dotnet run

HOW TO GET SQL_INJETION FLOW
For the vulneable flow, send get http request to "<NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL>/api/sql_injection/unsafe_code/userInput". the "userInput" suffix is a string input, it could be any other string.

APIs FOR USER: 
1. NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL/api/sql_injection/unsafe_code/userInput : 1 --> 4 --> 1
2. NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL/safe_code/userInput : 2 --> 3 --> 4 --> 3 --> 2

APIs FOR INTERNAL USING:
3. NET_CORE_PROPOGATOR_EXAMPLE_URL/api/sql_injection_propogator/userInput:  3 --> 4 --> 3
4. NET_CORE_SINK_EXAMPLE_URL/api/sql_injection_sink/userInput : 4

(The numbers and arrows represents the micro services flows)