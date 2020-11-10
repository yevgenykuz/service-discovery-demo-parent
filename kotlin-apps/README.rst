Kotlin Applications
#################

This folder includes demo applications written in Kotlin.

-----

.. contents::

.. section-numbering::

Packaging
=========

Compile with Maven
------------------

In "*Kotlin-apps*" folder:

.. code-block:: bash

    .\mvnw clean install


Manually on Windows
~~~~~~~~~~~~~~~~~~~

* `Compile with Maven`_

* In "*kotlin-apps*" folder run "*runAllHttp.bat*"

This will run all applications with the following:

* IAST agent attached
* Agent auto-upgrade disabled
* Agent log level set to DEBUG
* Open port for remote debug (see individual "*run.bat*" files for exact port)

Flow Triggering
---------------

To test locally, make sure all relevant applications are running before triggering flows.

HTTP Flow
~~~~~~~~~

Relevant applications:

* *kotlin-http-middleman*

To trigger HTTP flows you can send HTTP GET request as follows:
  | ``http://localhost:9110/middleman?name=${text}``

Replace *${text}* with any string.

