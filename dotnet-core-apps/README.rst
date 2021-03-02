.NET Core Applications
######################

This folder includes demo applications written in .NET Core.

-----

.. contents::

.. section-numbering::

Packaging
=========

Build, tag, and push with docker
--------------------------------

To push docker images to a different location, change *yevgenykcx* to your needs.

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

Usage
=====

Launching
---------

Choose one of the following options to launch the applications.

Docker-compose
~~~~~~~~~~~~~~

| An agent will be downloaded from the configured manager for each application before running.
| Depending on your machine, full environment startup may take a couple of minutes.
| Do the following steps:
|

* Start a local IAST manager instance
* Edit the provided "*.env*" file if needed
* HTTP flow environment:

.. code-block:: bash

    # pull latest:
    docker-compose -f docker-compose-dotnet-core-http.yml pull

    # start:
    # Windows:
    docker-compose -f docker-compose-dotnet-core-http.yml up -d
    # Linux:
    docker-compose -f docker-compose-dotnet-core-http.yml -env-file .env.linux up -d

    # check status:
    docker-compose -f docker-compose-dotnet-core-http.yml ps

    # check logs:
    docker-compose -f docker-compose-dotnet-core-http.yml logs

    # stop:
    docker-compose -f docker-compose-dotnet-core-http.yml down

Manually on Windows
~~~~~~~~~~~~~~~~~~~

* Make sure .NET CORE 2.1 is installed
* The following 3 environment variables must exist. The variable values have to be with in this format: ``Protocol://ServerIP:ServerPort``. For example: ``http://localhost:5551``.

.. code-block:: bash

    NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL
    NET_CORE_PROPOGATOR_EXAMPLE_URL
    NET_CORE_SINK_EXAMPLE_URL


* Build and run all applications. *For each application*, open CMD/Terminal and type:

.. code-block:: bash

    dotnet build
    dotnet run

Flow Triggering
---------------

To test locally, make sure all relevant applications are running before triggering flows.

SQL Injection HTTP Flow
~~~~~~~~~~~~~~~~~~~~~~~

Relevant applications:

* *NET_CORE_REST_ENTRY_POINT_APP*
* *NET_CORE_PROPOGATOR_APP*
* *NET_CORE_SINK_APP*

The following examples are based on the assumption that the protocol is 'http' and NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL is '5551'. Edit it according to your settings.

* For the vulnearble flows (SQL INJECTION):

.. code-block:: bash

    [GET] http://localhost:5551/Entry/Sink/userInputGet
    [POST with string in the request body] http://localhost:5551/Entry/Sink 
    [PUT with string in the request body] http://localhost:5551/Entry/Sink/userInputPut
    [DELETE] http://localhost:5551/Entry/Sink/userInputDelete

* For the unvulnerable flows (SQL INJECTION):

.. code-block:: bash

    [GET] http://localhost:5551/Entry/Prop/Sink/userInputGet
    [POST with string in the request body] http://localhost:5551/Entry/Prop/Sink 
    [PUT with string in the request body] http://localhost:5551/Entry/Prop/Sink/userInputPut
    [DELETE] http://localhost:5551/Entry/Prop/Sink/userInputDelete


Appendix - for IAST QA and programmers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
Cross platform API
``````````````````
``[GET] http://localhost:5551/Entry/Prop?name={string : name}`` - This API send Get request to using NET_CORE_PROPOGATOR_APP HttpClient.GetStringAsync, and it send other request to ``<NODE_ENTRY_POINT>/sendToService2?id={id}``
			
Debug mode 
``````````
| In debug mode, NET_CORE_PROPOGATOR_APP and NET_CORE_SINK_APP will print the uuid & sequence.
| Add this Environment variable to enable it: ``NET_CORE_MICRO_SERVICES_DEBUG = 1``
 
Other APIs
``````````
The following examples are based on the assumption that:

* Protocol is ``HTTP``
* ``NET_CORE_REST_ENTRY_POINT_EXAMPLE_URL = 5551``
* ``NET_CORE_PROPOGATOR_EXAMPLE_URL = 5552``
* ``NET_CORE_SINK_EXAMPLE_URL = 5553``

NET_CORE_REST_ENTRY_POINT_APP APIs:

.. code-block:: bash

    # This API send GET request to NET_CORE_SINK_APP using WebRequest.Create:
    [GET] http://localhost:5551/Entry2/Sink/userInputGet
    # This API send GET request to NET_CORE_SINK_APP using WebClient.OpenRead:
    [GET] http://localhost:5551/Entry3/Sink/userInputGet
    # This API send GET request to NET_CORE_SINK_APP using httpClient.SendAsync:
    [GET] http://localhost:5551/Entry4/Sink/userInputGet

NET_CORE_PROPOGATOR_APP APIs:

.. code-block:: bash

    # This API send GET request to NET_CORE_SINK_APP using HttpClient.GetStringAsync:    
    [GET] http://localhost:5552/Propogator/Sink/userInputGet
    # This API send POST request to NET_CORE_SINK_APP using HttpClient.PostAsync:    
    [POST with string in the request body] http://localhost:5552/Propogator/Sink 
    # This API send PUT request to NET_CORE_SINK_APP using HttpClient.PutAsync:
    [PUT with string in the request body] http://localhost:5552/Propogator/Sink/userInputPut
    # This API send DELETE request to NET_CORE_SINK_APP using HttpClient.DeleteAsync:
    [DELETE] http://localhost:5552/Propogator/Sink/userInputDelete

NET_CORE_SINK_APP APIs:

.. code-block:: bash

    [GET] http://localhost:5553/userInputGet
    [POST with string in the request body] http://localhost:5553/
    [PUT with string in the request body] http://localhost:5553/userInputPut
    [DELETE] http://localhost:5553/userInputDelete
