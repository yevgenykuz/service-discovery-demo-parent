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

Launch
======

In case not all applications are running on the same machine please define the following 
environment variables on all machines so that they can find each other:

``NODEJS_REST_ENTRY_POINT_EXAMPLE_URL`` - Entry point app URL (e.g. http://localhost:5010)

``NODEJS_REST_PROPAGATOR_EXAMPLE_URL`` - Propagator app URL (e.g. http://localhost:5011)

``NODEJS_REST_SINK_EXAMPLE_URL``  - Sink app URL (e.g. http://localhost:5012)

Choose one of the following options to launch the applications:

Manual
------
From every one of the test applications run ``npx cxiast index.js`` from its corresponding folder.

Docker
------
TBD

Test
====
To start a flow including all services send the following GET request:
``<ENTRY_POINT_ORIGIN>/sendToService2?id=1``

To start a flow including Entry point and Sink send the following GET request:
``<ENTRY_POINT_ORIGIN>/sendToService3?id=1``

To start a flow including Propagator and Sink send the following POST request:
``<PROPAGATOR_ORIGIN>/sendToService3`` with {id: 1} as POST body.
