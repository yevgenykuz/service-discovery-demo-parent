Service Discovery Demo
######################

| This project includes demo applications and configuration to demo Checkmarx service discovery on kubernetes.
| **Security note: These applications are vulnerable by design. Do not use them as reference for secured applications.**
|

|java_cd| |dotnet_core_cd| |nodejs_cd|

-----

.. contents::

.. section-numbering::

Usage
=====

Clone the source code
---------------------

.. code-block:: bash

    git clone https://github.com/yevgenykuz/service-discovery-demo-parent.git
    
| Specific instructions for every programming language can be found in each folder.
|
| **All docker related commands require docker to work with linux containers.**
| **This may be hard to achieve on docker installed on Windows Server.**
| **Please use linux/windows 10/macos for best results.**


Cross language flows
--------------------

| In addition to the possible flows in every programming language, there are some flows which run across applications
  written in different programming languages.
| Application launching can be done manually by following the instructions for every programming language, or by using
  docker compose files found below.
| An agent will be downloaded from the configured manager for each application before running.
| Depending on your machine, full environment startup may take a couple of minutes.
| Do the following steps before launching the applications:
|

* Start a local IAST manager instance
* Edit the provided ``.env`` file if needed or use ``.env.linux`` file in linux

Cross HTTP applications
~~~~~~~~~~~~~~~~~~~~~~~

Relevant applications:

* *bank-gateway*
* *bank-analysis*
* *dotnet-core-http-entry-point*
* *dotnet-core-http-propagator*
* *nodejs-http-entry-point*
* *nodejs-http-propagator*
* *nodejs-http-sink*

Control with docker compose:

.. code-block:: bash

    # Windows
    # pull latest:
    docker-compose -f docker-compose-cross-http.yml pull
    # start:
    docker-compose -f docker-compose-cross-http.yml up -d
    # stop:
    docker-compose -f docker-compose-cross-http.yml down

    # Linux
    # pull latest:
    sudo docker-compose -f docker-compose-cross-http.yml pull
    # start:
    sudo docker-compose -f docker-compose-cross-http.yml --env-file .env.linux up -d
    # stop:
    sudo docker-compose -f docker-compose-cross-http.yml down

To trigger HTTP flows you can send HTTP GET request as follows (change ``localhost`` if needed):

* | bank-gateway -> bank-analysis -> dotnet-http-entry-point -> dotnet-http-propagator ->
  | nodejs-http-entry-point -> nodejs-http-propagator -> nodejs-http-sink
  | ``http://localhost:8110/cross-http/?name=${text}``

Replace *${text}* with any string.

Meta
====

Networking information
----------------------

Components' ports are detailed below for clarity.

IAST manager
~~~~~~~~~~~~

* IAST manager IP should be accessible from the docker host machine
* Default expected IAST manager HTTP port is **8380** (without SSL)

Kafka
~~~~~

====  =========================
Port  App
====  =========================
9000  Kafka-manager
9001  Zookeeper
9002  Kafka (internal listener)
9003  Kafka (external listener)
====  =========================

RabbitMQ
~~~~~~~~

=====  =========================
Port   App
=====  =========================
15672  RabbitMQ management
5672   RabbitMQ server
=====  =========================

etcd
~~~~

=====  =========================
Port   App
=====  =========================
2379   etcd compose client
=====  =========================

k8s
~~~

=====  =========================
Port   App
=====  =========================
6443   k8s cluster API
8001   k8s management portal
=====  =========================

MySQL
~~~~~

=====  =========================
Port   App
=====  =========================
3306   MySQL DB
=====  =========================

Java applications
~~~~~~~~~~~~~~~~~

* HTTP access ports:

====  =============================  ========
Port  App                            Remarks
====  =============================  ========
8110  bank-gateway
8111  bank-analysis
8112  bank-storage
8113  java-kafka-http-entry-point
8114  java-kafka-entry-point		 Reserved
8115  java-kafka-propagator			 Reserved
8116  java-kafka-sink				 Reserved
8117  java-rabitmq-http-entry-point
8118  java-rabitmq-entry-point		 Reserved
8119  java-rabitmq-propagator		 Reserved
8120  java-rabitmq-sink				 Reserved
====  =============================  ========

* HTTP remote debug ports:

====  =============================
Port  App
====  =============================
8410  bank-gateway
8411  bank-analysis
8412  bank-storage
8413  java-kafka-http-entry-point
8414  java-kafka-entry-point
8415  java-kafka-propagator
8416  java-kafka-sink
8417  java-rabitmq-http-entry-point
8418  java-rabitmq-entry-point
8419  java-rabitmq-propagator
8420  java-rabitmq-sink
====  =============================

Node.js applications
~~~~~~~~~~~~~~~~~~~~

* HTTP access ports:

====  =============================
Port  App
====  =============================
5010  node-entry-point
5011  node-propagator
5012  node-sink
====  =============================

.NET CORE applications
~~~~~~~~~~~~~~~~~~~~

* HTTP access ports:

====  =============================
Port  App
====  =============================
5551  net-core-entry-point
5552  net-core-propagator
5553  net-core-sink
====  =============================

.NET FRAMEWORK applications
~~~~~~~~~~~~~~~~~~~~

* HTTP access ports:

====  =============================
Port  App
====  =============================
5561  net-framework-entry-point
5562  net-framework-propagator
5563  net-framework-sink
====  =============================

License
-------

`MIT License <https://github.com/yevgenykuz/service-discovery-demo-parent/blob/master/LICENSE>`_


-----


.. |java_cd| image:: https://github.com/yevgenykuz/service-discovery-demo-parent/workflows/Java%20CD/badge.svg
    :target: https://github.com/yevgenykuz/service-discovery-demo-parent/actions?query=workflow%3A%22Java+CD%22
    :alt: Java CD

.. |dotnet_core_cd| image:: https://github.com/yevgenykuz/service-discovery-demo-parent/workflows/.NET%20Core%20CD/badge.svg
    :target: https://github.com/yevgenykuz/service-discovery-demo-parent/actions?query=workflow%3A%22.NET+Core+CD%22
    :alt: .NET Core CD

.. |nodejs_cd| image:: https://github.com/yevgenykuz/service-discovery-demo-parent/workflows/NodeJS%20CD/badge.svg
    :target: https://github.com/yevgenykuz/service-discovery-demo-parent/actions?query=workflow%3A%22NodeJS+CD%22
    :alt: NodeJS CD
