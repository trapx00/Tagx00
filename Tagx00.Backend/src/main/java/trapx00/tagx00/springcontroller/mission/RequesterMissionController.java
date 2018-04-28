package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.blservice.mission.RequesterMissionBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.InstanceNotExistException;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.mission.InstanceDetailResponse;
import trapx00.tagx00.response.mission.InstanceResponse;
import trapx00.tagx00.response.mission.MissionCreateResponse;
import trapx00.tagx00.response.mission.requester.MissionChargeResponse;
import trapx00.tagx00.response.mission.requester.MissionRequestQueryResponse;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;
import trapx00.tagx00.vo.mission.requester.MissionFinalizeVo;

@PreAuthorize(value = "hasRole('" + Role.REQUESTER_NAME + "')")
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
            @ApiImplicitParam(name = "end", value = "结束时间", required = true, dataType = "Date"),
            @ApiImplicitParam(name = "level", value = "任务等级", required = true, dataType = "int"),
            @ApiImplicitParam(name = "credits", value = "积分", required = true, dataType = "int"),
            @ApiImplicitParam(name = "minimalWorkerLevel", value = "需求的用户最低等级", required = true, dataType = "int")
    })
    @RequestMapping(value = "/mission", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionCreateResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> createMission(@RequestBody MissionCreateVo missionCreateVo) {
        try {
            return new ResponseEntity<>(requesterMissionBlService.createMission(missionCreateVo), HttpStatus.OK);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Authorization(value = "发布者")
    @ApiOperation(value = "给任务充值", notes = "发布者在任务发布后给任务充值")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path"),
            @ApiImplicitParam(name = "credits", value = "积分", required = true, dataType = "int"),
    })
    @RequestMapping(value = "/mission/requester/mission/{missionId}", method = RequestMethod.PATCH)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionChargeResponse.class),
            @ApiResponse(code = 400, message = "mission not active or remaining credits not enough", response = WrongResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "not requester of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> chargeMission(@PathVariable("missionId") String missionId, @RequestParam("credits") int credits) {
        try {
            return new ResponseEntity<>(requesterMissionBlService.chargeMission(missionId, credits), HttpStatus.OK);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }


    @Authorization(value = "发布者")
    @ApiOperation(value = "查看剩余积分", notes = "查看剩余积分")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/mission/requester/mission/{missionId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionRequestQueryResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> queryMissionCredits(@PathVariable("missionId") String missionId) {
        try {
            return new ResponseEntity<>(requesterMissionBlService.queryMissionCredits(missionId), HttpStatus.OK);
        } catch (MissionIdDoesNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

    // /mission?requesterUsername=""

//    @Authorization(value = "发布者")
//    @ApiOperation(value = "获得已发布的任务", notes = "获得本发布者已发布的所有任务")
//    @RequestMapping(value = "/mission/requester", method = RequestMethod.GET)
//    @ApiResponses(value = {
//            @ApiResponse(code = 200, message = "Returns current user's missions", response = MissionQueryResponse.class),
//            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
//            @ApiResponse(code = 403, message = "Not requester", response = WrongResponse.class)
//    })
//    @ResponseBody
//    public ResponseEntity<Response> queryOnes() {
//        try {
//            return new ResponseEntity<>(requesterMissionBlService.queryOnes(UserInfoUtil.getUsername()), HttpStatus.OK);
//        } catch (MissionDoesNotExistFromUsernameException e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(e.getResponse(), HttpStatus.CONFLICT);
//        }
//    }

//    @Authorization(value = "发布者")
//    @ApiOperation(value = "查看任务细节", notes = "查询该任务细节")
//    @ApiImplicitParams({
//            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
//    })
//    @RequestMapping(value = "/mission/requester/{missionId}", method = RequestMethod.GET)
//    @ApiResponses(value = {
//            @ApiResponse(code = 200, message = "Returns the detail of the mission", response = MissionQueryDetailResponse.class),
//            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
//            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
//            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class)
//    })
//    @ResponseBody
//    public ResponseEntity<Response> queryMissionDetail(@PathVariable("missionId") int missionId) {
//        try {
//            return new ResponseEntity<>(requesterMissionBlService.queryMissionDetail(missionId), HttpStatus.OK);
//        } catch (MissionIdDoesNotExistException e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(e.getResponse(), HttpStatus.CONFLICT);
//        }
//    }

    @Authorization(value = "发布者")
    @ApiOperation(value = "查看任务的实例", notes = "查询任务实例")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = false, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/mission/requester/instances", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns instances of the mission", response = InstanceResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> queryInstances(@RequestParam(value = "missionId", defaultValue = "") String missionId) {
        return new ResponseEntity<>(requesterMissionBlService.queryInstances(missionId), HttpStatus.OK);
    }

    @Authorization(value = "发布者")
    @ApiOperation(value = "查看任务实例详情", notes = "查询任务实例的详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path"),
            @ApiImplicitParam(name = "instanceId", value = "实例ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/mission/requester/instances/{instanceId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns the instance", response = InstanceDetailResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission or instance not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> queryInstance(@PathVariable("instanceId") String instanceId) {
        try {
            return new ResponseEntity<>(requesterMissionBlService.queryInstance(instanceId), HttpStatus.OK);
        } catch (InstanceNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }


    @Authorization(value = "发布者")
    @ApiOperation(value = "评价任务实例", notes = "评价任务示例并结束实例")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path"),
            @ApiImplicitParam(name = "instanceId", value = "实例ID", required = true, dataType = "int", paramType = "path")
            //to add
    })
    @RequestMapping(value = "/mission/requester/instances/{instanceId}", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Complete", response = InstanceDetailResponse.class),
            @ApiResponse(code = 400, message = "Instance not submitted"),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission or instance not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> finalize(@PathVariable("instanceId") String instanceId, @RequestBody MissionFinalizeVo missionFinalizeVo) {
        try {
            return new ResponseEntity<>(requesterMissionBlService.finalize(instanceId, missionFinalizeVo), HttpStatus.OK);
        } catch (InstanceNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

}
