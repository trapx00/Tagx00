package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.blservice.mission.PublicMissionBlService;
import trapx00.tagx00.blservice.mission.WorkerMissionBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.TextNotExistException;
import trapx00.tagx00.exception.viewexception.ThreeDimensionNotExistException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.io.IOException;

@RestController
public class PublicMissionController {
    private final PublicMissionBlService publicMissionBlService;

    private final WorkerMissionBlService workerMissionBlService;

    @Autowired
    public PublicMissionController(PublicMissionBlService publicMissionBlService, WorkerMissionBlService workerMissionBlService) {
        this.publicMissionBlService = publicMissionBlService;
        this.workerMissionBlService = workerMissionBlService;
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
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }

    }

    @PreAuthorize(value = "hasRole('" + Role.REQUESTER_NAME + "') or hasRole('" + Role.WORKER_NAME + "') or hasRole('" + Role.ADMIN_NAME + "')")
    @Authorization(value = "工人、发布者、管理员")
    @ApiOperation(value = "识别图片内容", notes = "识别图片内容")
    @RequestMapping(value = "/mission/worker/image/identify", method = RequestMethod.POST)
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "Progress saved.", response = ImageIdentificationResponse.class),
        @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
        @ApiResponse(code = 404, message = "mission id not found or mission isn't accepted", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> identifyImage(@RequestParam("file") MultipartFile multipartFile) {
        try {
            return new ResponseEntity<>(workerMissionBlService.identifyImage(multipartFile), HttpStatus.OK);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PreAuthorize(value = "hasRole('" + Role.REQUESTER_NAME + "') or hasRole('" + Role.WORKER_NAME + "') or hasRole('" + Role.ADMIN_NAME + "')")
    @Authorization(value = "工人、发布者、管理员")
    @ApiOperation(value = "文本分词", notes = "文本分词")
    @RequestMapping(value = "/mission/worker/wordSegment", method = RequestMethod.GET)
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "Returns segmented words.", response = WordSegmentationResponse.class),
        @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
    })
    @ResponseBody
    public ResponseEntity<Response> segmentWords(@RequestParam("missionId") String missionId, @RequestParam("token") String token) {
        try {
            return new ResponseEntity<>(workerMissionBlService.segmentWords(missionId, token), HttpStatus.OK);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new WrongResponse(10001, "system error"), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (MissionIdDoesNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

//    @PreAuthorize(value = "hasRole('" + Role.REQUESTER_NAME + "') or hasRole('" + Role.WORKER_NAME + "') or hasRole('" + Role.ADMIN_NAME + "')")
//    @Authorization(value = "工人、发布者、管理员")
//    @ApiOperation(value = "获得某一任务各情况实例", notes = "获得某个任务各情况实例分布")
//    @ApiImplicitParams({
//            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
//    })
//    @RequestMapping(value = "/mission/{missionId}", method = RequestMethod.GET)
//    @ApiResponses(value = {
//            @ApiResponse(code = 200, message = "Success", response = MissionDetailResponse.class),
//            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
//            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
//            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class)
//    })
//    @ResponseBody
//    public ResponseEntity<Response> getMissionStateSituation(@PathVariable(name = "missionId") String missionId) {
//        try {
//            return new ResponseEntity<>(publicMissionBlService.getNumOfMissionState(missionId), HttpStatus.OK);
//        } catch (MissionIdDoesNotExistException e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
//        } catch (SystemException e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
//        }
//
//    }

    //    @PreAuthorize(value = "hasRole('" + Role.REQUESTER_NAME + "') or hasRole('" + Role.WORKER_NAME + "') or hasRole('" + Role.ADMIN_NAME + "')")
    @Authorization(value = "工人、发布者、管理员")
    @ApiOperation(value = "获得文本", notes = "通过base64后的url获得文本")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "string", paramType = "path"),
            @ApiImplicitParam(name = "textToken", value = "base64后的url", required = true, dataType = "string", paramType = "path")
    })
    @RequestMapping(value = "/mission/text", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = TextGetResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> getText(@RequestParam(name = "token") String token) {
        try {
            return new ResponseEntity<>(publicMissionBlService.getText(token), HttpStatus.OK);
        } catch (TextNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Authorization(value = "工人、发布者、管理员")
    @ApiOperation(value = "获得obj和mtl文件", notes = "通过base64后的两个url获得文本,以;分隔")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "string", paramType = "path"),
            @ApiImplicitParam(name = "3dToken", value = "base64后的url", required = true, dataType = "string", paramType = "path")
    })
    @RequestMapping(value = "/mission/3dmodel", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = ThreeModelGetResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> get3d(@RequestParam(name = "token") String tokens) {
        try {
            return new ResponseEntity<>(publicMissionBlService.get3d(tokens), HttpStatus.OK);
        } catch (ThreeDimensionNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
