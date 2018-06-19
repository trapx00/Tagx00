package trapx00.tagx00.springcontroller.admin;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import trapx00.tagx00.blservice.account.RequesterInfoBlService;
import trapx00.tagx00.blservice.admin.AdminInfoBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.user.AdminInfoResponse;
import trapx00.tagx00.response.user.AdminUserResponse;

@PreAuthorize(value = "hasRole('" + Role.ADMIN_NAME + "')")
@RestController
public class AdminInfoController {
    private final AdminInfoBlService adminInfoBlService;

    @Autowired
    public AdminInfoController(AdminInfoBlService adminInfoBlService) {
        this.adminInfoBlService = adminInfoBlService;
    }
    @Authorization("管理员")
    @ApiOperation(value = "管理员管理", notes = "管理员获得系统用户、任务信息")
    @RequestMapping(value = "account/admin", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = AdminInfoResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "not a admin", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> info() {
        return new ResponseEntity<>(adminInfoBlService.getAdminInfo(), HttpStatus.OK);
    }

    @Authorization("管理员")
    @ApiOperation(value = "管理员管理", notes = "管理员获得系统所有用户")
    @RequestMapping(value = "account/admin/users", method = RequestMethod.GET)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Success", response = AdminUserResponse.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
        @ApiResponse(code = 404, message = "not a admin", response = WrongResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> users() {
        return new ResponseEntity<>(adminInfoBlService.getUsers(), HttpStatus.OK);
    }

}
