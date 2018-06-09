package trapx00.tagx00.springcontroller.upload;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.blservice.upload.MissionUploadBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.upload.*;

@PreAuthorize(value = "hasRole('" + Role.REQUESTER_NAME + "')")
@RestController
public class MissionUploadController {
    private final MissionUploadBlService missionUploadBlService;

    @Autowired
    public MissionUploadController(MissionUploadBlService missionUploadBlService) {
        this.missionUploadBlService = missionUploadBlService;
    }


    @Authorization(value = "发布者")
    @ApiOperation(value = "发布者上传图片", notes = "发布者上传本次任务的图片，传输时限为10min")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "multipartFile", value = "图片", required = true, dataType = "MultipartFile"),
            @ApiImplicitParam(name = "order", value = "图片顺序", required = true, dataType = "int"),
            @ApiImplicitParam(name = "isCover", value = "图片是否是封面图", required = true, dataType = "bool"),
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/upload/mission/image/{missionId}", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Image uploaded", response = UploadMissionImageResponse.class),
            @ApiResponse(code = 403, message = "Upload session timed out", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "Upload session id not exist", response = WrongResponse.class),
            @ApiResponse(code = 503, message = "Failure", response = WrongResponse.class)
    })
    public ResponseEntity<Response> uploadImage(@PathVariable("missionId") String missionId, @RequestParam("files[]") MultipartFile multipartFile, @RequestParam("order") int order, @RequestParam("isCover") boolean isCover) {
        try {
            return new ResponseEntity<>(missionUploadBlService.uploadImage(missionId, multipartFile, order, isCover), HttpStatus.CREATED);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        } catch (MissionIdDoesNotExistException e) {
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

    @Authorization(value = "发布者")
    @ApiOperation(value = "发布者上传文本文件", notes = "发布者上传本次任务的文本文件，传输时限为10min")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "multipartFile", value = "文本压缩包", required = true, dataType = "MultipartFile"),
            @ApiImplicitParam(name = "order", value = "图片顺序", required = true, dataType = "int"),
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/upload/mission/text/{missionId}", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Text uploaded", response = UploadMissionTextResponse.class),
            @ApiResponse(code = 403, message = "Upload session timed out", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "Upload session id not exist", response = WrongResponse.class),
            @ApiResponse(code = 503, message = "Failure", response = WrongResponse.class)
    })
    public ResponseEntity<Response> uploadText(@PathVariable("missionId") String missionId, @RequestParam("files[]") MultipartFile multipartFile) {
        try {
            return new ResponseEntity<>(missionUploadBlService.uploadText(missionId, multipartFile), HttpStatus.CREATED);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (MissionIdDoesNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

    @Authorization(value = "发布者")

    @ApiOperation(value = "发布者上传本次任务音频文件", notes = "发布者上传本次任务的音频文件，传输时限为10min。存在本地，不要发到云端。")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "multipartFile", value = "音频文件", required = true, dataType = "MultipartFile"),
        @ApiImplicitParam(name = "order", value = "音频文件顺序", required = true, dataType = "int"),
        @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/upload/mission/audio/{missionId}", method = RequestMethod.POST)
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "Audio uploaded", response = UploadMissionAudioResponse.class),

        @ApiResponse(code = 403, message = "Upload session timed out", response = WrongResponse.class),
        @ApiResponse(code = 404, message = "Upload session id not exist", response = WrongResponse.class),
        @ApiResponse(code = 503, message = "Failure", response = WrongResponse.class)
    })
    public ResponseEntity<Response> uploadAudio(@PathVariable("missionId") String missionId, @RequestParam("file") MultipartFile file, @RequestParam("order") int order) {
        try {
            return new ResponseEntity<>(missionUploadBlService.uploadAudio(missionId, file, order), HttpStatus.CREATED);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        } catch (MissionIdDoesNotExistException e) {
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

    @Authorization(value = "发布者")
    @ApiOperation(value = "发布者上传本次任务视频文件", notes = "发布者上传本次任务的视频文件，传输时限为10min。存在本地，不要发到云端。")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "multipartFile", value = "视频文件", required = true, dataType = "MultipartFile"),
        @ApiImplicitParam(name = "order", value = "视频文件顺序", required = true, dataType = "int"),
        @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/upload/mission/video/{missionId}", method = RequestMethod.POST)
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "Video uploaded", response = UploadMissionVideoResponse.class),
        @ApiResponse(code = 403, message = "Upload session timed out", response = WrongResponse.class),
        @ApiResponse(code = 404, message = "Upload session id not exist", response = WrongResponse.class),
        @ApiResponse(code = 503, message = "Failure", response = WrongResponse.class)
    })
    public ResponseEntity<Response> uploadVideo(@PathVariable("missionId") String missionId, @RequestParam("file") MultipartFile file, @RequestParam("order") int order) {
        try {
            return new ResponseEntity<>(missionUploadBlService.uploadAudio(missionId, file, order), HttpStatus.CREATED);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.SERVICE_UNAVAILABLE);
        } catch (MissionIdDoesNotExistException e) {
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }

    @Authorization(value = "发布者")
    @ApiOperation(value = "发布者上传本次3D任务骨架和贴图文件", notes = "发布者上传本次任务的3D任务骨架（.obj）和贴图文件(.mtl)，传输时限为10min。" +
        "前端将会按照1个obj文件1个mtl文件的顺序来发送，同一个模型的文件名相同，按照order和文件名和扩展名区分文件。存在本地，不要发到云端。")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "multipartFile", value = "视频文件", required = true, dataType = "MultipartFile"),
        @ApiImplicitParam(name = "order", value = "视频文件顺序", required = true, dataType = "int"),
        @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "int", paramType = "path")
    })
    @RequestMapping(value = "/upload/mission/3d/{missionId}", method = RequestMethod.POST)
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "3D mission upload uploaded", response = UploadMissionThreeDimensionResponse.class),
        @ApiResponse(code = 403, message = "Upload session timed out", response = WrongResponse.class),
        @ApiResponse(code = 404, message = "Upload session id not exist", response = WrongResponse.class),
        @ApiResponse(code = 503, message = "Failure", response = WrongResponse.class)
    })
    public ResponseEntity<Response> upload3D(@PathVariable("missionId") String missionId, @RequestParam("file") MultipartFile file, @RequestParam("order") int order) {
        try {
            return new ResponseEntity<>(missionUploadBlService.uploadThreeDimension(missionId, file,order), HttpStatus.CREATED);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (MissionIdDoesNotExistException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.NOT_FOUND);
        }
    }


}
