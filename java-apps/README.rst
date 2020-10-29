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

    .\mvnw clean install

Build, tag, and push with docker
--------------------------------

To push docker images to a different location, change *yevgenykcx* to your needs.

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
    # in java-rabbitmq-http-entry-point folder:
    docker build -t yevgenykcx/java-rabbitmq-http-entry-point .
    docker push yevgenykcx/java-rabbitmq-http-entry-point
    # in java-rabbitmq-entry-point folder:
    docker build -t yevgenykcx/java-rabbitmq-entry-point .
    docker push yevgenykcx/java-rabbitmq-entry-point
    # in java-rabbitmq-propagator folder:
    docker build -t yevgenykcx/java-rabbitmq-propagator .
    docker push yevgenykcx/java-rabbitmq-propagator
    # in java-rabbitmq-sink folder:
    docker build -t yevgenykcx/java-rabbitmq-sink .
    docker push yevgenykcx/java-rabbitmq-sink

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
  
* In "*java-apps*" folder run "*runAllHttp.bat*"/"*runAllKafka.bat*"/"*runAllRabbitMQ.bat*"

This will run all applications with the following:

* IAST agent attached
* Agent auto-upgrade disabled
* Agent log level set to DEBUG
* Open port for remote debug (see individual "*run.bat*" files for exact port)

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

    # start:
    docker-compose -f docker-compose-java-http.yml up -d
    # check status:
    docker-compose -f docker-compose-java-http.yml ps
    # check logs:
    docker-compose -f docker-compose-java-http.yml logs
    # stop:
    docker-compose -f docker-compose-java-http.yml down

* Kafka flow environment:

.. code-block:: bash

    # start:
    docker-compose -f docker-compose-java-kafka.yml up -d
    # check status:
    docker-compose -f docker-compose-java-kafka.yml ps
    # check logs:
    docker-compose -f docker-compose-java-kafka.yml logs
    # stop:
    docker-compose -f docker-compose-java-kafka.yml down
    # to manually access Kafka server, use port 9003 in your consumer/producer

Kubernetes on docker desktop
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| An agent will be downloaded from the configured manager for each application before running.
| Depending on your machine, full environment startup may take a couple of minutes.
| Do the following steps:
|

* Make sure Kubernetes is enabled in docker desktop - ``https://docs.docker.com/docker-for-windows/#kubernetes``
* Make sure kubectl is installed - ``https://kubernetes.io/docs/tasks/tools/install-kubectl/``
* Make sure helm is installed - ``https://helm.sh/docs/intro/install/``
* Download compose-for-kubernetes installer from ``https://github.com/docker/compose-on-kubernetes/releases``
* Create a compose namespace by running ``kubectl create namespace compose``
* Deploy an etcd instance:

.. code-block:: bash

    helm repo add stable https://kubernetes-charts.storage.googleapis.com/
    helm repo update
    helm install etcd-operator stable/etcd-operator --namespace compose
    kubectl apply -f k8s-etcd.yml

* Deploy Compose on Kubernetes ``installer-[darwin|linux|windows.exe] -namespace=compose -etcd-servers=http://compose-etcd-client:2379``
* Get k8s dashboard, create a default account:

.. code-block:: bash

    kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.4/aio/deploy/recommended.yaml
    kubectl apply -f k8s-create-account.yml
    kubectl apply -f k8s-create-role.yml

* Get the token of the user you've created:

.. code-block:: bash

    # linux (bash):
    kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')

.. code-block:: shell

    # Windows (Powershell):
    kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | sls admin-user | ForEach-Object { $_ -Split '\s+' } | Select -First 1)

* Launch the dashboard and login with your token:

.. code-block:: bash

    # Launch
    kubectl proxy
    # Access
    http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
    # Login with your token

* Set ``KUBERNETES_TRUST_CERTIFICATES=true`` environment variable
* Start a local IAST manager instance
* In the "Service Discovery" page, should the auto-connection using .kube config won't work - enter:

.. code-block:: bash

    # Select API Key authentication method
    # Cluster URL
    https://kubernetes.docker.internal:6443
    # API Key
    *your_key*

* Set ``IAST_MANAGER_URL=http://host.docker.internal:8380`` manually in the relevant docker-compose.yml file
* HTTP flow environment:

.. code-block:: bash

    # create k8s namespace for this flow:
    kubectl create namespace java-http-apps
    # start:
    docker stack deploy --namespace java-http-apps --orchestrator kubernetes --compose-file docker-compose-java-http.yml java-http-stack
    # check status:
    docker stack ps --namespace java-http-apps java-http-stack
    # stop and cleanup:
    docker stack rm --namespace java-http-apps java-http-stack
    kubectl delete namespace java-http-apps

* Kafka flow environment:

.. code-block:: bash

    # create k8s namespace for this flow:
    kubectl create namespace java-kafka-apps
    # start:
    docker stack deploy --namespace java-kafka-apps --orchestrator kubernetes --compose-file docker-compose-java-kafka.yml java-kafka-stack
    # check status:
    docker stack ps --namespace java-kafka-apps java-kafka-stack
    # stop and cleanup:
    docker stack rm --namespace java-kafka-apps java-kafka-stack
    kubectl delete namespace java-kafka-apps
    # to manually access Kafka server, use port 9003 in your consumer/producer

* General cleanup

Remove all pods and services by clicking the ``Reset Kubernetes Cluster`` button in docker desktop k8s settings page.

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
  | ``http://localhost:8110/prop-name/?name=${text}``
* | entry-point -> sink:
  | ``http://localhost:8110/name/?name=${text}``
* | propagator -> sink:
  | ``http://localhost:8111/name?name=${text}``
* | sink:
  | ``http://localhost:8112/projects/unsafe?name=${text}``

Replace *${text}* with any string.

Kafka Flow
~~~~~~~~~~

Relevant applications:

* *java-kafka-http-entry-point*
* *java-kafka-entry-point*
* *java-kafka-propagator*
* *java-kafka-sink*

To trigger Kafka flows you can do one of the following:

* Send HTTP GET request to ``http://localhost:8113/kafka/send?message=${text}``
* Produce *${text}* to Kafka (topic: entry_point), for example:

.. code-block:: batch

    # in Windows, after navigating to downloaded Kafka folder, run:
    bin\windows\kafka-console-producer.bat --broker-list localhost:9003 --topic entry_point
    # then, send ${text}

Replace *${text}* with the following input to get the relevant vulnerability:

* *sqli* -> SQL injection
* *commandi* -> Command injection
* *sanitized* -> Sanitized SQL call from *java-kafka-sink*
* *loop* -> Sanitized SQL call from *java-kafka-sink* and then a Kafka message back to both *entry-point* apps
* *any other text* -> Log forging
* *split* - **HTTP GET only** -> Split flow from kafka-http-entry-point to kafka-entry-point and kafka-propagator
