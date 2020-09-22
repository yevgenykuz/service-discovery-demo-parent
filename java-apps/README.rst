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

.. code-block:: bash

    # in java-apps folder:
    mvn clean install

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

.. code-block:: bash

    docker run --rm -it -p 8183:8183 java-http-sink
    docker run --rm -it -p 8182:8182 java-http-propagator
    docker run --rm -it -p 8181:8181 java-http-entry-point

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
