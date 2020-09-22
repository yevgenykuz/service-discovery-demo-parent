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

License
-------

`MIT License <https://github.com/yevgenykuz/service-discovery-demo/blob/master/LICENSE>`_


-----
