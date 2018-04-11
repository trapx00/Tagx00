package trapx00.tagx00.springcontroller.leaderboard;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.blservice.leaderboard.CreditRequesterLeaderboardBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditRequesterLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditSpecificRequesterLeaderboardResponse;
import trapx00.tagx00.vo.paging.PagingQueryVo;

@PreAuthorize(value = "hasRole('" + Role.REQUESTER_NAME + "') or hasRole('" + Role.WORKER_NAME + "') or hasRole('" + Role.ADMIN_NAME + "')")
@RestController
public class CreditRequesterLeaderboardController {
    private final CreditRequesterLeaderboardBlService creditRequesterLeaderboardBlService;

    @Autowired
    public CreditRequesterLeaderboardController(CreditRequesterLeaderboardBlService creditRequesterLeaderboardBlService) {
        this.creditRequesterLeaderboardBlService = creditRequesterLeaderboardBlService;
    }
    @Authorization("发起者、工人、管理员")
    @ApiOperation(value = "发起者富人榜", notes = "以积分从高到低排名")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageSize", value = "页面信息数", required = true, dataType = "int"),
            @ApiImplicitParam(name = "pageNumber", value = "页数", required = true, dataType = "int"),
    })
    @RequestMapping(value = "leaderboard/credits/requester", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = CreditRequesterLeaderboardResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> creditLeaderboard(
            @RequestParam("pageSize") Integer pageSize, @RequestParam("pageNumber") Integer pageNumber
    ) {
        try {
            return new ResponseEntity(creditRequesterLeaderboardBlService.creditLeaderboard(new PagingQueryVo(pageSize,pageNumber)), HttpStatus.OK);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Authorization("发起者、工人、管理员")
    @ApiOperation(value = "查询某个发起者的财富排名", notes = "以财富排名")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "username", value = "用户名", required = true, dataType = "String", paramType = "path")
    })
    @RequestMapping(value = "leaderboard/credits/requester/{username}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = CreditSpecificRequesterLeaderboardResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "not a worker or a requester or an admin", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "worker id not found or id is not a worker", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> specificRequester(@PathVariable("username") String username) {
        try {
            return new ResponseEntity(creditRequesterLeaderboardBlService.specificRequester(username), HttpStatus.OK);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
