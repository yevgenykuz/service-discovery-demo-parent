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

Compile with Maven
------------------

.. code-block:: bash

    mvn clean install

Deploy in Minikube
------------------

Docker images - build, tag, push:

.. code-block:: bash

    Manually with docker commands:
    # jpa-example - port 8183
    docker build . -t jpa-example
    docker tag jpa-example yevgenykcx/jpa-example
    docker push yevgenykcx/jpa-example
    # propagator-example - port 8182
    docker build . -t propagator-example
    docker tag propagator-example yevgenykcx/propagator-example
    docker push yevgenykcx/propagator-example
    # rest-entry-point-example - port 8181
    docker build . -t rest-entry-point-example
    docker tag rest-entry-point-example yevgenykcx/rest-entry-point-example
    docker push yevgenykcx/rest-entry-point-example

    Using the JIB maven plugin, run the following for each application:
    mvn docker:build

Run images without kubernetes to test (after building):

.. code-block:: bash

    docker run --rm -it -p 8183:8183 jpa-example
    docker run --rm -it -p 8182:8182 propagator-example
    docker run --rm -it -p 8181:8181 rest-entry-point-example

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

License
-------

`MIT License <https://github.com/yevgenykuz/service-discovery-demo/blob/master/LICENSE>`_


-----
