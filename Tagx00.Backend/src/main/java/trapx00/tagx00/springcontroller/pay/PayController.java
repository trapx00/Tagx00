package trapx00.tagx00.springcontroller.pay;

import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.mission.MissionCreateResponse;
import trapx00.tagx00.response.pay.PayResponse;
import trapx00.tagx00.vo.mission.pay.PayVo;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;

@PreAuthorize(value = "hasRole('" + Role.REQUESTOR_NAME + "')")
@RestController
public class PayController {

    @Authorization(value = "发布者")
    @ApiOperation(value = "给账号充值", notes = "发布者给账号充值")
    @RequestMapping(value = "/pay", method = RequestMethod.POST)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Success", response = PayResponse.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
        @ApiResponse(code = 403, message = "not requester", response = WrongResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> pay(@RequestBody PayVo payVo) {
        return null;
    }
}
