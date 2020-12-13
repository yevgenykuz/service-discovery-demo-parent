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

    private final RelatedServicesProperties relatedServicesProperties;
    private final CloseableHttpClient httpClient;

    @Autowired
    public HomeController(RelatedServicesProperties relatedServicesProperties) {
        this.relatedServicesProperties = relatedServicesProperties;
        this.httpClient = HttpClients.createDefault();
    }

    @RequestMapping(path = "/name", method = RequestMethod.GET)
    @ResponseBody
    public String forwardInputToSqlService(@RequestParam("name") String name) {
        log.info("input propagator - name: " + name);
        sanitizeAndSend(relatedServicesProperties.getJavaHttpSinkUrl() + "/projects/unsafe?name=", name);
        return "ok";
    }

    @RequestMapping(path = "/cross-http", method = RequestMethod.GET)
    @ResponseBody
    public String forwardInputToDotnetCoreEntryPoint(@RequestParam("name") String name) {
        log.info("input propagator - cross-http: " + name);
        sanitizeAndSend(relatedServicesProperties.getDotnetCoreHttpEntryPointUrl() + "/Entry/Prop?name=", name);
        return "ok";
    }


    private void sanitizeAndSend(String url, String name) {
        String sanitized = name.replace("'", "''");
        log.info("Sanitized");
        try {
            sendGet(url, sanitized);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void sendGet(String url, String name) throws Exception {
        HttpGet request = new HttpGet(url + name);
        // add request headers
        request.addHeader("custom-key", "checkmarx");
        request.addHeader(HttpHeaders.USER_AGENT, "Chrome");
        try (CloseableHttpResponse response = httpClient.execute(request)) {
            log.info("sent: " + request.getURI().toURL());
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
    public void bankAnalysisIndex(HttpServletRequest request) {
        log.info("bank-analysis-home\n" + request.toString());
    }

    @RequestMapping("/")
    public String showWelcomePage() {
        return "bankAnalysisIndex";
    }
}
