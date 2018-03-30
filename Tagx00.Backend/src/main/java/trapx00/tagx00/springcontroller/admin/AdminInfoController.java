package trapx00.tagx00.springcontroller.admin;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.user.AdminInfoResponse;
import trapx00.tagx00.response.user.RequesterInfoResponse;

@RestController
public class AdminInfoController {
    @Authorization("管理员本人")
    @ApiOperation(value = "管理员管理", notes = "")
    @RequestMapping(value = "account/admin", method = RequestMethod.GET)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Success", response = AdminInfoResponse.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
        @ApiResponse(code = 404, message = "not a admin", response = WrongResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> info() {
        return null;
    }
}
