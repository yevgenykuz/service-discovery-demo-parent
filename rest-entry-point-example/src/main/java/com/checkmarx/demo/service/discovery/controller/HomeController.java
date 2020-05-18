package com.checkmarx.demo.service.discovery.controller;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * Home page controller class.
 */
@RestController
public class HomeController {

    @Autowired
    private HttpServletRequest request;

    private final CloseableHttpClient httpClient = HttpClients.createDefault();

    @RequestMapping(path = "/name", method = RequestMethod.GET)
    public @ResponseBody String forwardInputToSqlService(@RequestParam("name") String name) {
        System.out.println("input entry point - name: " + name);
        try {
            sendGet("http://localhost:8183/projects/safe?name=" + name);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "ok";
    }

    @RequestMapping(path = "/prop-name", method = RequestMethod.GET)
    public @ResponseBody String forwardInputToPropagatorAndThenToSqlService(@RequestParam("name") String name) {
        System.out.println("input entry point - prop-name: " + name);
        try {
            sendGet("http://localhost:8182/name?name=" + name);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "ok";
    }

    private void sendGet(String uri) throws Exception {
        HttpGet request = new HttpGet(uri);
        // add request headers
        request.addHeader("custom-key", "checkmarx");
        request.addHeader(HttpHeaders.USER_AGENT, "Chrome");
        try (CloseableHttpResponse response = httpClient.execute(request)) {
            // Get HttpResponse Status
            System.out.println(response.getStatusLine().toString());
            HttpEntity entity = response.getEntity();
            Header headers = entity.getContentType();
            System.out.println(headers);
            // return it as a String
            String result = EntityUtils.toString(entity);
            System.out.println(result);
        }
    }

    @RequestMapping("/home")
    public void restEntryPointExample() {
        System.out.println("rest-entry-point-example\n" + request.toString());
    }

    @RequestMapping("/")
    public String showWelcomePage() {
        return "restEntryPointExample";
    }
}
