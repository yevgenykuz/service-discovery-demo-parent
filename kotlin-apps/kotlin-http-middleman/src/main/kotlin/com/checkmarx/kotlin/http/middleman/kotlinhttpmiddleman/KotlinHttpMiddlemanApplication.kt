package com.checkmarx.kotlin.http.middleman.kotlinhttpmiddleman

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class KotlinHttpMiddlemanApplication

fun main(args: Array<String>) {
	runApplication<KotlinHttpMiddlemanApplication>(*args)
}
