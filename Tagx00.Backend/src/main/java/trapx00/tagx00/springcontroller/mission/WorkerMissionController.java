package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.blservice.mission.WorkerMissionBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.*;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.mission.ImageIdentificationResponse;
import trapx00.tagx00.response.mission.InstanceDetailResponse;
import trapx00.tagx00.response.mission.InstanceResponse;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.util.UserInfoUtil;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.util.Date;

@PreAuthorize(value = "hasRole('" + Role.WORKER_NAME + "')")
@RestController
public class WorkerMissionController {
    private final WorkerMissionBlService workerMissionBlService;

    @Autowired
    public WorkerMissionController(WorkerMissionBlService workerMissionBlService) {
        this.workerMissionBlService = workerMissionBlService;
    }

    @Authorization(value = "工人")
    @ApiOperation(value = "工人查看所有任务的实例", notes = "工人查看自己已接的所有任务的实例")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageSize", value = "页面信息数", required = true, dataType = "int"),
            @ApiImplicitParam(name = "pageNumber", value = "页数", required = true, dataType = "int"),
    })
    @RequestMapping(value = "/mission/worker", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns current user's instances", response = InstanceResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not worker", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "No more instances", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> queryOnesAllMissions(@RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
                                                         @RequestParam(value = "pageNumber", defaultValue = "1") Integer pageNumber) {
        try {
            return new ResponseEntity<>(workerMissionBlService.queryOnesAllMissions(UserInfoUtil.getUsername(), new PagingQueryVo(pageSize, pageNumber)), HttpStatus.OK);
        } catch (MissionDoesNotExistFromUsernameException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.FORBIDDEN);
        }
    }


    @Authorization(value = "工人")
    @ApiOperation(value = "工人放弃任务", notes = "工人放弃自己已接的任务")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/mission/worker/{missionId}", method = RequestMethod.DELETE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Mission abandoned.", response = SuccessResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not worker", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission id not found or mission isn't accepted", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> abort(@PathVariable("missionId") String missionId) {
        try {
            return new ResponseEntity<>(workerMissionBlService.abort(missionId, UserInfoUtil.getUsername()), HttpStatus.OK);
        } catch (Exception e) {
            return null;
        }
    }

    @Authorization(value = "工人")
    @ApiOperation(value = "工人保存任务进度", notes = "工人保存当前任务的实例的进度")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "dataType", value = "任务类型", required = true, dataType = "MissionType"),
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/mission/worker/{missionId}", method = RequestMethod.PUT)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Progress saved.", response = SuccessResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not worker", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission id not found or mission isn't accepted", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> saveProgress(@RequestBody InstanceDetailVo instanceDetailVo, @PathVariable("missionId") String missionId) {
        try {
            return new ResponseEntity<>(workerMissionBlService.saveProgress(instanceDetailVo), HttpStatus.OK);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        } catch (MissionAlreadyAcceptedException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);//to edit api
        } catch (UnmatchedUsernameAndMissionId e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.FORBIDDEN);
        }
    }

    @Authorization(value = "工人")
    @ApiOperation(value = "工人识别图片内容", notes = "工人识别图片内容")
    @RequestMapping(value = "/mission/worker/image/identify", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Progress saved.", response = ImageIdentificationResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not worker", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission id not found or mission isn't accepted", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> identifyImage(@RequestParam("file") MultipartFile multipartFile) {
        return new ResponseEntity<>(workerMissionBlService.identifyImage(multipartFile), HttpStatus.OK);
    }

    @Authorization(value = "工人")
    @ApiOperation(value = "工人提交任务", notes = "工人用当前的进度提交任务,如果是空的就是接受任务")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "dataType", value = "任务类型", required = true, dataType = "MissionType"),
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/mission/worker/{missionId}", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Progress saved.", response = SuccessResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not worker", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission id not found or mission isn't accepted", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> submit(
            @RequestBody InstanceDetailVo instanceDetailVo, @PathVariable(name = "missionId") String missionId) {
        try {
            if (instanceDetailVo == null || instanceDetailVo.getInstance() == null) {
                InstanceVo instanceVo = new InstanceVo(MissionUtil.addTypeToId(0, instanceDetailVo.getMissionType()), 0, 0, 0, "", UserInfoUtil.getUsername(), MissionInstanceState.IN_PROGRESS, missionId, new Date(), null, false, 0);
                if (instanceDetailVo != null) {
                    instanceDetailVo.setInstance(instanceVo);
                }
            }
            return new ResponseEntity<>(workerMissionBlService.submit(instanceDetailVo), HttpStatus.OK);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        } catch (MissionAlreadyAcceptedException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);//to edit api
        }
    }

    @Authorization(value = "工人")
    @ApiOperation(value = "工人获取任务信息", notes = "工人获取自己领取任务的实例的信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/mission/worker/{missionId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns the instance", response = InstanceDetailResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not worker", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission id not found or mission isn't accepted", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> getInstanceInformation(@PathVariable("missionId") String missionId) {
        try {
            InstanceDetailResponse instanceDetailResponse = workerMissionBlService.getInstanceInformation(missionId, UserInfoUtil.getUsername());
            return new ResponseEntity<>(instanceDetailResponse, HttpStatus.OK);
        } catch (InstanceNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }
}
