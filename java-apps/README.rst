Java Applications
#################

This folder includes demo applications written in Java.

-----

.. contents::

.. section-numbering::

Packaging
=========

Compile with Maven
------------------

In "*java-apps*" folder:

.. code-block:: bash

    mvn clean install

Build, tag, and push with Docker
--------------------------------

To push Docker images to a different location, change *yevgenykcx* to your needs.

.. code-block:: bash

    # in java-http-entry-point folder:
    docker build -t yevgenykcx/java-http-entry-point .
    docker push yevgenykcx/java-http-entry-point
    # in java-http-propagator folder:
    docker build -t yevgenykcx/java-http-propagator .
    docker push yevgenykcx/java-http-propagator
    # in java-http-sink folder:
    docker build -t yevgenykcx/java-http-sink .
    docker push yevgenykcx/java-http-sink
    # in java-kafka-http-entry-point folder:
    docker build -t yevgenykcx/java-kafka-http-entry-point .
    docker push yevgenykcx/java-kafka-http-entry-point
    # in java-kafka-entry-point folder:
    docker build -t yevgenykcx/java-kafka-entry-point .
    docker push yevgenykcx/java-kafka-entry-point
    # in java-kafka-propagator folder:
    docker build -t yevgenykcx/java-kafka-propagator .
    docker push yevgenykcx/java-kafka-propagator
    # in java-kafka-sink folder:
    docker build -t yevgenykcx/java-kafka-sink .
    docker push yevgenykcx/java-kafka-sink

Usage
=====

Launching
---------

Choose one of the following options to launch the applications.

Manually on Windows
~~~~~~~~~~~~~~~~~~~

* `Compile with Maven`_
* Start a local IAST manager instance
* Download an agent from IAST manager UI
* For each application you want to run:

  * Create an empty "*agent*" folder in the application's folder
  * Extract the contents of the zipped agent file you've downloaded into the "*agent*" folder
  
* In "*java-apps*" folder run "*runAll.bat*"

This will run all applications with the following:

* IAST agent attached
* Agent auto-upgrade disabled
* Agent log level set to DEBUG
* Open port for remote debug (see individual "*run.bat*" files for exact port)

Docker-compose
~~~~~~~~~~~~~~

To run with IAST agent automatically:

* Start a local IAST manager instanc
* Edit the provided "*.env*" and then if needed
* HTTP flow applications:

.. code-block:: bash

    # start:
    docker-compose -f docker-compose-java-http.yml up -d
    # check status:
    docker-compose -f docker-compose-java-http.yml ps
    # check logs:
    docker-compose -f docker-compose-java-http.yml logs
    # stop:
    docker-compose -f docker-compose-java-http.yml down

* Kafka flow applications:

.. code-block:: bash

    # start:
    docker-compose -f docker-compose-java-kafka.yml up -d
    # check status:
    docker-compose -f docker-compose-java-kafka.yml ps
    # check logs:
    docker-compose -f docker-compose-java-kafka.yml logs
    # stop:
    docker-compose -f docker-compose-java-kafka.yml down

An agent will be downloaded from the configured manager for each application before running.

Flow Triggering
---------------

To test locally, make sure all relevant applications are running before triggering flows.

HTTP Flow
~~~~~~~~~

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
~~~~~~~~~~

Relevant applications:

* *java-kafka-http-entry-point*
* *java-kafka-entry-point*
* *java-kafka-propagator*
* *java-kafka-sink*

To trigger Kafka flows you can do one of the following:

* Send HTTP GET request to http://localhost:8113/kafka/send?message=${text}
* Produce ${text} to Kafka (topic: entry_point), for example:

.. code-block:: batch

    # in Windows, after navigating to downloaded Kafka folder, run:
    bin\windows\kafka-console-producer.bat --broker-list localhost:9003 --topic entry_point
    # then, send your message

Replace *${text}* with the following input to get the relevant vulnerability:

* *sqli* -> SQL injection
* *commandi* -> command injection
* *any other text* -> log forging
