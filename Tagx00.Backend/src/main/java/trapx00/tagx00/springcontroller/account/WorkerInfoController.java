package trapx00.tagx00.springcontroller.account;

import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.exception.viewexception.WrongUsernameOrPasswordException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.user.UserLoginResponse;
import trapx00.tagx00.response.user.WorkerInfoResponse;

@RestController
public class WorkerInfoController {

    @Authorization("工人本人")
    @ApiOperation(value = "工人个人中心", notes = "验证用户登录并返回token")
    @RequestMapping(value = "account/worker/{username}", method = RequestMethod.GET)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Success", response = WorkerInfoResponse.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
        @ApiResponse(code = 404, message = "not a worker", response = WrongResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> info(@PathVariable("username") String username) {
        return null;
    }

}
