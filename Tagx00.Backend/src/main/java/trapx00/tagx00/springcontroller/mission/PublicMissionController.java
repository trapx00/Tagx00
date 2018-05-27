package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.blservice.mission.PublicMissionBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.IllegalUriException;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.mission.MissionDetailResponse;
import trapx00.tagx00.response.mission.MissionPublicResponse;
import trapx00.tagx00.vo.paging.PagingQueryVo;

@RestController
public class PublicMissionController {
    private final PublicMissionBlService publicMissionBlService;

    @Autowired
    public PublicMissionController(PublicMissionBlService publicMissionBlService) {
        this.publicMissionBlService = publicMissionBlService;
    }

    @ApiOperation(value = "获得任务", notes = "根据搜索关键词获得任务")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageSize", value = "页面信息数", required = true, dataType = "int"),
            @ApiImplicitParam(name = "pageNumber", value = "页数", required = true, dataType = "int"),
            @ApiImplicitParam(name = "searchTarget", value = "搜索关键词", required = true, dataType = "String")
    })
    @RequestMapping(value = "/mission", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionPublicResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> getMissions(@RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
                                                @RequestParam(value = "pageNumber", defaultValue = "1") Integer pageNumber,
                                                @RequestParam(value = "searchTarget", defaultValue = "") String searchTarget,
                                                @RequestParam(value = "requester", defaultValue = "") String requesterUsername) {
        return new ResponseEntity<>(publicMissionBlService.getMissions(new PagingQueryVo(pageSize, pageNumber), searchTarget, requesterUsername), HttpStatus.OK);
    }


    @PreAuthorize(value = "hasRole('" + Role.REQUESTER_NAME + "') or hasRole('" + Role.WORKER_NAME + "') or hasRole('" + Role.ADMIN_NAME + "')")
    @Authorization(value = "工人、发布者、管理员")
    @ApiOperation(value = "获得某一任务", notes = "获得某个任务信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/mission/{missionId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionDetailResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> getOneMission(@PathVariable(name = "missionId") String missionId) {
        try {
            return new ResponseEntity<>(publicMissionBlService.getOneMissionDetail(missionId), HttpStatus.OK);
        } catch (MissionIdDoesNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }

    }

    //    @PreAuthorize(value = "hasRole('" + Role.REQUESTER_NAME + "') or hasRole('" + Role.WORKER_NAME + "') or hasRole('" + Role.ADMIN_NAME + "')")
    @Authorization(value = "工人、发布者、管理员")
    @ApiOperation(value = "获得文本", notes = "通过base64后的url获得文本")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "string", paramType = "path"),
            @ApiImplicitParam(name = "textToken", value = "base64后的url", required = true, dataType = "string", paramType = "path")
    })
    @RequestMapping(value = "/mission/text", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionDetailResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> getText(@RequestParam(name = "token") String token) {
        try {
            return new ResponseEntity<>(publicMissionBlService.getText(token), HttpStatus.OK);
        } catch (IllegalUriException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }

    }

}
