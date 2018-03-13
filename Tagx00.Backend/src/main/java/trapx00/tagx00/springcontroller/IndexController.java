package trapx00.tagx00.springcontroller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class IndexController {
    @RequestMapping(method = RequestMethod.GET, path = "/")
    public RedirectView index() {
        return new RedirectView("/swagger-ui.html");
    }
}
