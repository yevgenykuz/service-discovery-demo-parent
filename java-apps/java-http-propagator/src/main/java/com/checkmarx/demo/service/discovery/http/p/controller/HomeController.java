package com.checkmarx.demo.service.discovery.http.p.controller;


import com.checkmarx.demo.service.discovery.http.p.properites.RelatedServicesProperties;
import lombok.extern.slf4j.Slf4j;
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
import java.util.Arrays;

/**
 * Home page controller class.
 */
@RestController
@Slf4j
public class HomeController {

    private final HttpServletRequest request;
    private final RelatedServicesProperties relatedServicesProperties;
    private final CloseableHttpClient httpClient;

    @Autowired
    public HomeController(HttpServletRequest request, RelatedServicesProperties relatedServicesProperties) {
        this.request = request;
        this.relatedServicesProperties = relatedServicesProperties;
        this.httpClient = HttpClients.createDefault();
    }

    @RequestMapping(path = "/name", method = RequestMethod.GET)
    @ResponseBody
    public String forwardInputToSqlService(@RequestParam("name") String name) {
        log.info("input entry point - name: " + name);
        sanitizeAndSend(name);
        return "ok";
    }

    private void sanitizeAndSend(String name) {
        String value = name.replace("'", "''");
        log.info("Sanitized");
        try {
            sendGet(value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void sendGet(String name) throws Exception {
        HttpGet request = new HttpGet(relatedServicesProperties.getJavaHttpSinkUrl() + "/projects/unsafe?name=" + name);
        // add request headers
        request.addHeader("custom-key", "checkmarx");
        request.addHeader(HttpHeaders.USER_AGENT, "Chrome");
        try (CloseableHttpResponse response = httpClient.execute(request)) {
            // Get HttpResponse Status
            log.info(response.getStatusLine().toString());
            HttpEntity entity = response.getEntity();
            Header headers = entity.getContentType();
            log.info(Arrays.toString(headers.getElements()));
            // return it as a String
            String result = EntityUtils.toString(entity);
            log.info(result);
        }
    }

    @RequestMapping("/home")
    public void propagatorExampleIndex() {
        log.info("propagator-example\n" + request.toString());
    }

    @RequestMapping("/")
    public String showWelcomePage() {
        return "propagatorExampleIndex";
    }
}
