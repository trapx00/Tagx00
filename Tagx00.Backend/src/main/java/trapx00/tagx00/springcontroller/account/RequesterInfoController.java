package trapx00.tagx00.springcontroller.account;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.user.RequesterInfoResponse;
import trapx00.tagx00.response.user.WorkerInfoResponse;

@RestController
public class RequesterInfoController {

    @Authorization("发起者本人")
    @ApiOperation(value = "发起者个人中心", notes = "")
    @RequestMapping(value = "account/requester/{username}", method = RequestMethod.GET)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Success", response = RequesterInfoResponse.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
        @ApiResponse(code = 404, message = "not a worker", response = WrongResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> info(@PathVariable("username") String username) {
        return null;
    }

}
