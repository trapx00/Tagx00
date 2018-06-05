package trapx00.tagx00.springcontroller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;
import springfox.documentation.annotations.ApiIgnore;
import trapx00.tagx00.response.Response;

@ApiIgnore
@RestController
public class IndexController {
    @RequestMapping(method = RequestMethod.GET, path = "/")
    public RedirectView index() {
        return new RedirectView("/swagger-ui.html");
    }
}
