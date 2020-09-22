package kafkahttpentrypoint.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Home page hybrid.controller class.
 */
@RestController
public class HomeController {

    @RequestMapping("/")
    public String showWelcomePage() {
        return "Kafka web sender example application";
    }
}
