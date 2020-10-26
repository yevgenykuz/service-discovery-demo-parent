Service Discovery Demo
######################

| This project includes demo applications and configuration to demo Checkmarx service discovery on kubernetes.
| **Security note: These applications are vulnerable by design. Do not use them as reference for secured applications.**
|

|ci|

-----

.. contents::

.. section-numbering::

Usage
=====

Clone the source code
---------------------

.. code-block:: bash

    git clone https://github.com/yevgenykuz/service-discovery-demo-parent.git
    
Specific instructions for every programming language can be found in each folder.

Networking information
----------------------

Components' ports are detailed below for clarity.

IAST manager
~~~~~~~~~~~~

* IAST manager IP should be accessible from the docker host machine
* Expected IAST manager HTTP port is **8380** (without SSL)

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
8110  java-http-entry-point
8111  java-http-propagator
8112  java-http-sink
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
8410  java-http-entry-point
8411  java-http-propagator
8412  java-http-sink
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

Meta
====

Contributors
------------

* `yevgenykuz <https://github.com/yevgenykuz>`_
* `ofertavivcx <https://github.com/ofertavivcx>`_
* `asafHalely <https://github.com/asafHalely>`_
* `snirshemtov <https://github.com/snirshemtov>`_
* `idantsadok <https://github.com/idantsadok>`_

License
-------

`MIT License <https://github.com/yevgenykuz/service-discovery-demo-parent/blob/master/LICENSE>`_


-----


.. |ci| image:: https://github.com/yevgenykuz/service-discovery-demo-parent/workflows/Java%20-%20all%20JDKs%20on%20all%20OSs/badge.svg
    :target: https://github.com/yevgenykuz/service-discovery-demo-parent/actions
    :alt: Github CI
