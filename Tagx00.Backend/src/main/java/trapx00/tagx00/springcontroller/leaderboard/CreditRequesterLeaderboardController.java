package trapx00.tagx00.springcontroller.leaderboard;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditRequesterLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditSpecificRequesterLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditSpecificWorkerLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditWorkerLeaderboardResponse;

@RestController
public class CreditRequesterLeaderboardController {
    @Authorization("发起者、工人、管理员")
    @ApiOperation(value = "发起者富人榜", notes = "以积分从高到低排名")
    @RequestMapping(value = "leaderboard/credits/requester", method = RequestMethod.GET)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Success", response = CreditRequesterLeaderboardResponse.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> creditLeaderboard(
        @RequestParam("pageSize") Integer pageSize, @RequestParam("pageNumber") Integer pageNumber
    ) {
        return null;
    }

    @ApiOperation(value = "查询某个发起者的财富排名", notes = "以财富排名")
    @RequestMapping(value = "leaderboard/credits/requester/{username}", method = RequestMethod.GET)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Success", response = CreditSpecificRequesterLeaderboardResponse.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
        @ApiResponse(code = 403, message = "not a worker or a requester or an admin", response = WrongResponse.class),
        @ApiResponse(code = 404, message = "worker id not found or id is not a worker", response = WrongResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> specificRequester(@PathVariable("username") String username) {
        return null;
    }
}
