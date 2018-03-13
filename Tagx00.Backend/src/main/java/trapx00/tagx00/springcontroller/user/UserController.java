package trapx00.tagx00.springcontroller.user;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.blservice.user.UserBlService;
import trapx00.tagx00.entity.user.Role;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.UserAlreadyExistsException;
import trapx00.tagx00.exception.viewexception.WrongUsernameOrPasswordException;
import trapx00.tagx00.vo.response.Response;
import trapx00.tagx00.vo.response.SuccessResponse;
import trapx00.tagx00.vo.user.UserSaveVo;

import java.util.ArrayList;
import java.util.Arrays;

@RestController
public class UserController {
    private final UserBlService userBlService;

    @Autowired
    public UserController(UserBlService userBlService) {
        this.userBlService = userBlService;
    }

    @PreAuthorize("hasRole('" + Role.WORKER_NAME + "')")
    @ApiOperation(value = "try", nickname = "try")
    @RequestMapping(value = "/try", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Success", response = String.class),
            @ApiResponse(code = 401, message = "Unauthorized"),
            @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Failure")})
    @ResponseBody
    public String trial() {
        return "123";
    }


    @ApiOperation(value = "createAuthenticationToken", nickname = "createAuthentication")
    @RequestMapping(value = "${jwt.route.authentication.login}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Success", response = Response.class),
            @ApiResponse(code = 401, message = "Unauthorized"),
            @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Failure")})
    @ResponseBody
    public ResponseEntity<Response> login(
            @RequestParam("username") String username, @RequestParam("password") String password) {
        try {
            final String token = userBlService.login(username, password);
            Response response = new Response(10000, token);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (WrongUsernameOrPasswordException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "register", nickname = "register")
    @RequestMapping(method = RequestMethod.POST, path = "${jwt.route.authentication.register}", produces = "application/json")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Success", response = Response.class),
            @ApiResponse(code = 401, message = "Unauthorized"),
            @ApiResponse(code = 403, message = "Forbidden"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Failure")})
    @ResponseBody
    public ResponseEntity<Response> register(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("email") String email) {
        try {
            ArrayList<Role> roles = new ArrayList<>();
            roles.add(Role.WORKER);
            userBlService.signUp(new UserSaveVo(username, password, email, roles));
            return new ResponseEntity<>(new SuccessResponse(), HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.CONFLICT);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
