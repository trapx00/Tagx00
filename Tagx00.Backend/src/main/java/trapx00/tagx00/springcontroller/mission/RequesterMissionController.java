package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.blservice.mission.RequesterMissionBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.util.UserInfoUtil;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;

@PreAuthorize(value = "hasRole('" + Role.REQUESTOR_NAME + "')")
@RestController
public class RequesterMissionController {
    private final RequesterMissionBlService requesterMissionBlService;

    @Autowired
    public RequesterMissionController(RequesterMissionBlService requesterMissionBlService) {
        this.requesterMissionBlService = requesterMissionBlService;
    }


    @Authorization(value = "发布者")
    @ApiOperation(value = "发布任务", notes = "发布者发布一个任务")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "title", value = "任务标题", required = true, dataType = "String"),
            @ApiImplicitParam(name = "description", value = "任务描述", required = true, dataType = "String"),
            @ApiImplicitParam(name = "topics", value = "任务主题", required = true, dataType = "List<String>"),
            @ApiImplicitParam(name = "allowedTags", value = "允许的标注", required = true, dataType = "List<String>"),
            @ApiImplicitParam(name = "missionVo", value = "任务种类", required = true, dataType = "MissionVo"),
            @ApiImplicitParam(name = "start", value = "开始时间", required = true, dataType = "Date"),
            @ApiImplicitParam(name = "end", value = "结束时间", required = true, dataType = "Date")
    })
    @RequestMapping(value = "/mission", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionCreateResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> createMission(@RequestBody MissionCreateVo mission) {
        try {
            return new ResponseEntity<>(requesterMissionBlService.createMission(mission), HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
    }


    @Authorization(value = "发布者")
    @ApiOperation(value = "获得已发布的任务", notes = "获得本发布者已发布的所有任务")
    @RequestMapping(value = "/mission/requester", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns current user's missions", response = MissionQueryResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> queryOnes() {
        try {
            return new ResponseEntity<>(requesterMissionBlService.queryOnes(UserInfoUtil.getUsername()), HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
    }

    @Authorization(value = "发布者")
    @ApiOperation(value = "查看任务细节", notes = "查询该任务细节")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/mission/requester/{missionId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns the detail of the mission", response = MissionQueryDetailResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> queryMissionDetail(@PathVariable("missionId") int missionId) {
        try {
            return new ResponseEntity<>(requesterMissionBlService.queryMissionDetail(missionId), HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
    }

    @Authorization(value = "发布者")
    @ApiOperation(value = "查看任务的实例", notes = "查询任务实例")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/mission/requester/{missionId}/instances/", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns instances of the mission", response = MissionInstancesQueryResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> queryInstances(@PathVariable("missionId") int missionId) {
        try {
            return new ResponseEntity<>(requesterMissionBlService.queryInstances(missionId), HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
    }

    @Authorization(value = "发布者")
    @ApiOperation(value = "查看任务实例详情", notes = "查询任务实例的详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path"),
            @ApiImplicitParam(name = "instanceId", value = "实例ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/mission/requester/{missionId}/instances/{instanceId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns the instance", response = MissionInstanceQueryDetailResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission or instance not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> queryInstance(@PathVariable("missionId") int missionId, @PathVariable("instanceId") int instanceId) {
        try {
            return new ResponseEntity<>(requesterMissionBlService.queryInstance(instanceId), HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
    }

}
