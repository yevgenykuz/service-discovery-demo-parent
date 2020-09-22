Java Applications
#################

This folder includes demo applications written in Java.

-----

.. contents::

.. section-numbering::

Deployment
==========

Compile with Maven
------------------

In "*java-apps*" folder:

.. code-block:: bash

    mvn clean install

Run manually on Windows
-----------------------

* Download an agent from IAST manager
* For each application you want to run:
    * Create an empty "*agent*" folder in the application's folder
    * Extract the contents of the zipped agent file you've downloaded into the "*agent*" folder
* In "*java-apps*" folder run "*runAll.bat*"

This will run all applications with the following:

* IAST agent attached
* Agent auto-upgrade disabled
* Agent log level set to DEBUG
* Open port for remote debug (see individual "*run.bat*" files for exact port)

Build, tag, and push with Docker
--------------------------------

To push Docker images to a different location, change *yevgenykcx* to your needs.

.. code-block:: bash

    # in http-entry-point folder:
    docker build -t yevgenykcx/java-http-entry-point .
    docker push yevgenykcx/java-http-entry-point
    # in http-propagator folder:
    docker build -t yevgenykcx/java-http-propagator .
    docker push yevgenykcx/java-http-propagator
    # in http-sink folder:
    docker build -t yevgenykcx/java-http-sink .
    docker push yevgenykcx/java-http-sink

Run with Docker
---------------

To run with IAST agent automatically:

.. code-block:: bash

    # replace ${MANAGER_IP} with an IP or DNS name of a running IAST manager
    docker run -e server_ip=${MANAGER_IP} --rm -it -p 8183:8183 java-http-sink
    docker run -e server_ip=${MANAGER_IP} --rm -it -p 8182:8182 java-http-propagator
    docker run -e server_ip=${MANAGER_IP} --rm -it -p 8181:8181 java-http-entry-point

An agent will be downloaded from the provided manager before running.

Flow Triggering
===============

To test locally, make sure all relevant applications are running before triggering flows.

HTTP Flow
---------

Relevant applications:

* *java-http-entry-point*
* *java-http-propagator*
* *java-http-sink*

To trigger HTTP flows you can send HTTP GET request as follows:

* | entry-point -> propagator -> sink:
  | http://localhost:8181/prop-name/?name=${text}
* | entry-point -> sink:
  | http://localhost:8181/name/?name=${text}
* | propagator -> sink:
  | http://localhost:8182/name?name=${text}

Replace *${text}* with any string.

Kafka Flow
----------

Relevant applications:

* *java-kafka-http-entry-point*
* *java-kafka-entry-point*
* *java-kafka-propagator*
* *java-kafka-sink*

To trigger Kafka flows you can do one of the following:

* Send HTTP GET request to http://localhost:8085/kafka/send?message=${text}
* Produce ${text} to Kafka (topic: entry_point)

Replace *${text}* with the following input to get the relevant vulnerability:

* *sqli* -> SQL injection
* *commandi* -> command injection
* *any other text* -> log forging
