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

Deploy in minikube
------------------

Docker images, build, tag, push:

.. code-block:: bash

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

Run images without kubernetes to test (after building):

.. code-block:: bash

    docker run --rm -it -p 8183:8183 jpa-example
    docker run --rm -it -p 8182:8182 propagator-example
    docker run --rm -it -p 8181:8181 rest-entry-point-example

Minikube - run apps and expose ports:

.. code-block:: bash

    kubectl run jpa-example --image=yevgenykcx/jpa-example --port=8183
    kubectl expose deployment/jpa-example --type=LoadBalancer --port 8183
    kubectl run propagator-example --image=yevgenykcx/propagator-example --port=8182
    kubectl expose deployment/propagator-example --type=LoadBalancer --port 8182
    kubectl run rest-entry-point-example --image=yevgenykcx/rest-entry-point-example --port=8181
    kubectl expose deployment/rest-entry-point-example --type=LoadBalancer --port 8181

Minikube - access services easily (opens chrome tab):

.. code-block:: bash

    minikube service jpa-example
    minikube service propagator-example
    minikube service rest-entry-point-example

Minikube - refresh internal routes of there is no access:

.. code-block:: bash

    minikube tunnel --cleanup

Minikube (optional) - allow access using the clusterIP (not to be used in production):

.. code-block:: bash

    minikube tunnel

Minikube - expose REST API on port 8080 (not to be used in production):

.. code-block:: bash

    kubectl proxy --port=8080

Meta
====

Authors
-------

* `yevgenykuz <https://github.com/yevgenykuz>`_
* `ofertavivcx <https://github.com/ofertavivcx>`_

License
-------

`MIT License <https://github.com/yevgenykuz/service-discovery-demo/blob/master/LICENSE>`_


-----
