package trapx00.tagx00.springcontroller.account;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.blservice.account.RequesterInfoBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.NotMissionException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.user.RequesterInfoResponse;
import trapx00.tagx00.vo.paging.PagingQueryVo;

@PreAuthorize(value = "hasRole('" + Role.REQUESTER_NAME + "')")
@RestController
public class RequesterInfoController {

    private final RequesterInfoBlService requesterInfoBlService;

    @Autowired
    public RequesterInfoController(RequesterInfoBlService requesterInfoBlService) {
        this.requesterInfoBlService = requesterInfoBlService;
    }
    @Authorization("发起者本人")
    @ApiOperation(value = "发起者个人中心", notes = "发起者获得自己的个人信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "username", value = "发起者用户名", required = true, dataType = "String", paramType = "path")
    })
    @RequestMapping(value = "account/requester/{username}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = RequesterInfoResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "not a worker", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> info(@PathVariable("username") String username) {
        return new ResponseEntity(requesterInfoBlService.getRequesterInfo(username), HttpStatus.OK);

    }

}
