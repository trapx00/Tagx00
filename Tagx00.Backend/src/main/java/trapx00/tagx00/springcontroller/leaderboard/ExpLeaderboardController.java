package trapx00.tagx00.springcontroller.leaderboard;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.blservice.leaderboard.ExpLeaderboardBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.leaderboard.exp.ExpLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.exp.ExpSpecificWorkerLeaderboardResponse;
import trapx00.tagx00.vo.paging.PagingQueryVo;

//@PreAuthorize(value = "hasRole('" + Role.REQUESTER_NAME + "') or hasRole('" + Role.WORKER_NAME + "') or hasRole('" + Role.ADMIN_NAME + "')")
@RestController
public class ExpLeaderboardController {
    private final ExpLeaderboardBlService expLeaderboardBlService;

    @Autowired
    public ExpLeaderboardController(ExpLeaderboardBlService expLeaderboardBlService) {
        this.expLeaderboardBlService = expLeaderboardBlService;
    }

    @Authorization("发起者、工人、管理员")
    @ApiOperation(value = "经验排名", notes = "以经验从高到低排名")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageSize", value = "页面信息数", required = true, dataType = "int"),
            @ApiImplicitParam(name = "pageNumber", value = "页数", required = true, dataType = "int"),
    })
    @RequestMapping(value = "leaderboard/exp", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = ExpLeaderboardResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> expLeaderboard(
            @RequestParam(value = "pageSize", defaultValue = "100000") Integer pageSize,
            @RequestParam(value = "pageNumber", defaultValue = "1") Integer pageNumber
    ) {
        try {
            return new ResponseEntity<>(expLeaderboardBlService.expLeaderboard(new PagingQueryVo(pageSize, pageNumber)), HttpStatus.OK);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Authorization("发起者、工人、管理员")
    @ApiOperation(value = "查询某个工人的经验值排名", notes = "以经验排名")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "username", value = "用户名", required = true, dataType = "String", paramType = "path")
    })
    @RequestMapping(value = "leaderboard/exp/{username}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = ExpSpecificWorkerLeaderboardResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "not a worker or a requester or an admin", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "worker id not found or id is not a worker", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> specificWorker(@PathVariable("username") String username) {
        try {
            return new ResponseEntity<>(expLeaderboardBlService.specificWorker(username), HttpStatus.OK);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }


}
