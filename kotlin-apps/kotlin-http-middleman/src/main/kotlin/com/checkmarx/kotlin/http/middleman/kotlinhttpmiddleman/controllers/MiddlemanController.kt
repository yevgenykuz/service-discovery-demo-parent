package com.checkmarx.kotlin.http.middleman.kotlinhttpmiddleman.controllers

import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.net.HttpURLConnection
import java.net.InetSocketAddress
import java.net.Proxy
import java.net.URL
import javax.servlet.http.HttpServletRequest


@RestController
class MiddlemanController
{
    @Value("\${target-url}")
    lateinit var targetUrl:String

    @GetMapping("/middleman")
    fun getRequest(@RequestParam(value = "name") name: String, request: HttpServletRequest)
    {
        println("********* Http Request into ********")
        println("Method " + request.method)
        println("Headers:")
        val headerNames = request.headerNames
        while (headerNames.hasMoreElements()) {
            val headerName = headerNames.nextElement()
            println("Name - " + headerName + ", Value - " + request.getHeader(headerName))
        }

        println("Take query parameters and send it to next service")
        sendGet(name)
        println("====================================")
    }

    fun sendGet(name: String) {
        val url = URL("$targetUrl/name?name=$name")
        val proxy = Proxy(Proxy.Type.HTTP, InetSocketAddress("localhost", 1337))

        with(url.openConnection(proxy) as HttpURLConnection) {
            requestMethod = "GET"  // optional default is GET

            println("\nSent 'GET' request to URL : $url; Response Code : $responseCode")

            inputStream.bufferedReader().use {
                it.lines().forEach { line ->
                    println(line)
                }
            }
        }
    }
}