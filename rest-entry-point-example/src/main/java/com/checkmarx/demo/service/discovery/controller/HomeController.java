package com.checkmarx.demo.service.discovery.controller;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Home page controller class.
 */
@RestController
public class HomeController {
    private static final String USER_AGENT = "Mozilla/5.0";

    @Autowired
    private HttpServletRequest request;

    private final CloseableHttpClient httpClient = HttpClients.createDefault();

    @RequestMapping(path = "/name", method = RequestMethod.GET)
    public @ResponseBody String forwardInputToNextService(@RequestParam("name") String name, @RequestParam(required = false) String forwardRequestMethod) {
        System.out.println("input entry point - name=" + name + ", forwardRequestMethod=" + forwardRequestMethod);
        if (StringUtils.isEmpty(forwardRequestMethod)) {
            forwardRequestMethod = "GET"; //Backward compatibility
        }

        try {
            if (forwardRequestMethod.equals("GET")) {
                sendGet(name);
            } else if (forwardRequestMethod.equals("POST")) {
                sendPost(name);
            } else if (forwardRequestMethod.equals("GET2")) {
                sendGet2(name);
            } else if (forwardRequestMethod.equals("POST2")) {
                sendGet2(name);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return e.toString();
        }
        return "Forward input to next service: name=" + name + ", forwardRequestMethod=" + forwardRequestMethod;
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
        execute(httpClient.execute(request));
    }

    private void sendPost(String name) throws Exception {
        HttpPost request = new HttpPost("http://localhost:8183/projects/safe");
        // add request headers
        request.addHeader("custom-key", "checkmarx");
        request.addHeader(HttpHeaders.USER_AGENT, "Chrome");
        ArrayList<NameValuePair> postParameters = new ArrayList<>();
        postParameters.add(new BasicNameValuePair("name", name));

        request.setEntity(new UrlEncodedFormEntity(postParameters, "UTF-8"));

        execute(httpClient.execute(request));
    }

    private void execute(CloseableHttpResponse execute) throws IOException {
        try (CloseableHttpResponse response = execute) {
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

    private void sendGet2(String name) throws IOException {
        String targetURL = "http://localhost:8183/projects/safe?name=" + name;
        URL obj = new URL(targetURL);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", USER_AGENT);
        int responseCode = con.getResponseCode();
        System.out.println("GET Response Code :: " + responseCode);
        if (responseCode == HttpURLConnection.HTTP_OK) { // success
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // print result
            System.out.println(response.toString());
        } else {
            System.out.println("GET request not worked");
        }
    }

    private void sendPost2(String name) throws IOException {
        String targetURL = "http://localhost:8183/projects/safe";
        HttpURLConnection connection = null;
        Map<String, String> parameters = new HashMap<>();
        parameters.put("name", name);
        String paramsString = getParamsString(parameters);
        try {
            //Create connection
            URL url = new URL(targetURL);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type",
                    "application/x-www-form-urlencoded");

            connection.setRequestProperty("Content-Length",
                    Integer.toString(paramsString.getBytes().length));
            connection.setRequestProperty("Content-Language", "en-US");

            connection.setUseCaches(false);
            connection.setDoOutput(true);

            //Send request
            DataOutputStream wr = new DataOutputStream (
                    connection.getOutputStream());
            wr.writeBytes(paramsString);
            wr.close();

            //Get Response
            InputStream is = connection.getInputStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            StringBuilder response = new StringBuilder(); // or StringBuffer if Java version 5+
            String line;
            while ((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();
            System.out.println(response.toString());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }

    }

    public static String getParamsString(Map<String, String> params)
            throws UnsupportedEncodingException{
        StringBuilder result = new StringBuilder();

        for (Map.Entry<String, String> entry : params.entrySet()) {
            result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
            result.append("=");
            result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
            result.append("&");
        }

        String resultString = result.toString();
        return resultString.length() > 0
                ? resultString.substring(0, resultString.length() - 1)
                : resultString;
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
