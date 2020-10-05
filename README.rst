Service Discovery Demo
######################

This project includes demo applications and configuration to demo Checkmarx service discovery on kubernetes.

-----

.. contents::

.. section-numbering::

Usage
=====

Clone the source code
---------------------

.. code-block:: bash

    git clone https://github.com/yevgenykuz/service-discovery-demo-parent.git

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

====  =============================  ========
Port  App                            Remarks
====  =============================  ========
8410  java-http-entry-point
8411  java-http-propagator
8412  java-http-sink
8413  java-kafka-http-entry-point    Reserved
8414  java-kafka-entry-point		 Reserved
8415  java-kafka-propagator			 Reserved
8416  java-kafka-sink				 Reserved
8417  java-rabitmq-http-entry-point  Reserved
8418  java-rabitmq-entry-point		 Reserved
8419  java-rabitmq-propagator		 Reserved
8420  java-rabitmq-sink				 Reserved
====  =============================  ======== 

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

Deploy in Minikube
------------------

Minikube - run apps and expose ports:

.. code-block:: bash

    kubectl run --generator=run-pod/v1 jpa-example --image=yevgenykcx/jpa-example --port=8183
    kubectl expose pod/jpa-example --type=LoadBalancer --port 8183
    kubectl run --generator=run-pod/v1 propagator-example --image=yevgenykcx/propagator-example --port=8182
    kubectl expose pod/propagator-example --type=LoadBalancer --port 8182
    kubectl run --generator=run-pod/v1 rest-entry-point-example --image=yevgenykcx/rest-entry-point-example --port=8181
    kubectl expose pod/rest-entry-point-example --type=LoadBalancer --port 8181

Minikube - access services easily using internal IPs and ports (opens chrome tab):

.. code-block:: bash

    minikube service jpa-example
    minikube service propagator-example
    minikube service rest-entry-point-example

Minikube - refresh internal routes of there is no access:

.. code-block:: bash

Minikube (optional) - allow access using the clusterIP (not to be used in production):

.. code-block:: bash

    minikube tunnel

Minikube - expose REST API on port 8080 (not to be used in production):

.. code-block:: bash

    kubectl proxy --port=8080

Minikube (debug) - list services to get cluster IP addresses:

.. code-block:: bash

    kubectl get services

Minikube (debug) - refresh internal routes of there is no access using minikube tunnel:

.. code-block:: bash

    minikube tunnel --cleanup

Minikube (cleanup) - remove all pods, deployments, and services:

.. code-block:: bash

    kubectl delete --all pods
    kubectl delete --all deployments
    kubectl delete --all services

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
