Node.js Micro service Test Applications
#######################################

This folder includes 3 demo applications written in Node.js

-----

.. contents::

.. section-numbering::

Prerequisites
=============
Node.js v6 and up and matching npm version
Mysql 5.7 configured with user `root` and password `root`.

Deployment
==========
Under nodejs-apps folder, run the following commands for all test applications, see example for node-entry-point:

.. code-block:: shell

    cd node-entry-point
    npm install && npm install <MANAGER_ORIGIN>/iast/nodejs

Build, tag, and push with docker
--------------------------------

To push docker images to a different location, change *yevgenykcx* to your needs.

.. code-block:: bash

    # in node-entry-point folder:
    docker build -t yevgenykcx/node-http-entry-point .
    docker push yevgenykcx/node-http-entry-point
    # in node-propagator folder:
    docker build -t yevgenykcx/node-http-propagator .
    docker push yevgenykcx/node-http-propagator
    # in node-sink folder:
    docker build -t yevgenykcx/node-http-sink .
    docker push yevgenykcx/node-http-sink

Launch
======

In case not all applications are running on the same machine please define the following
environment variables on all machines so that they can find each other and the DB:

``NODEJS_REST_ENTRY_POINT_EXAMPLE_URL`` - Entry point app URL (e.g. http://localhost:5010)

``NODEJS_REST_PROPAGATOR_EXAMPLE_URL`` - Propagator app URL (e.g. http://localhost:5011)

``NODEJS_REST_SINK_EXAMPLE_URL``  - Sink app URL (e.g. http://localhost:5012)

``MYSQL_URL`` - MySQL URL (e.g. localhost)

Choose one of the following options to launch the applications:

Manual
------
From every one of the test applications run ``npx cxiast index.js`` from its corresponding folder.

Docker
------
Under nodejs-apps folder, run the following command to build a docker image for each test application, see example for node-entry-point:

.. code-block:: shell

  cd node-entry-point
  sudo docker build --build-arg IAST_MANAGER_IP="http://10.32.11.145:8380" -t node-entry-point .

Run the following command to run the docker container for each test application, see example for node-entry-point:

.. code-block:: shell

  sudo docker run --rm -it -p 5010:5010 node-entry-point

Docker-compose
--------------

.. code-block:: bash

    # Windows
    # pull latest:
    docker-compose -f docker-compose-nodejs-http.yml pull
    # start:
    docker-compose -f docker-compose-nodejs-http.yml up -d
    # stop:
    docker-compose -f docker-compose-nodejs-http.yml down

    # Linux
    # pull latest:
    sudo docker-compose -f docker-compose-nodejs-http.yml pull
    # start:
    sudo docker-compose -f docker-compose-nodejs-http.yml --env-file .env.linux up -d
    # stop:
    sudo docker-compose -f docker-compose-nodejs-http.yml down

Test
====
To start a flow including all services send the following GET request:
``<ENTRY_POINT_ORIGIN>/sendToService2?id=1``

To start a flow including Entry point and Sink send the following GET request:
``<ENTRY_POINT_ORIGIN>/sendToService3?id=1``

To start a flow including Propagator and Sink send the following POST request:
``<PROPAGATOR_ORIGIN>/sendToService3`` with {id: 1} as POST body.
