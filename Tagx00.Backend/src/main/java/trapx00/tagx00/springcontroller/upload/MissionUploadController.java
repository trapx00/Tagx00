package trapx00.tagx00.springcontroller.upload;

import io.swagger.annotations.*;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.entity.user.Role;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.upload.UploadMissionImageResponse;

@PreAuthorize(value = "hasRole('" + Role.REQUESTOR_NAME + "')")
@RestController
public class MissionUploadController {

    @Authorization(value = "发布者")
    @ApiOperation(value = "发布者上传文件", notes = "发布者上传本次任务的图片，传输时限为10min")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "multipartFile", value = "图片", required = true, dataType = "MultipartFile"),
            @ApiImplicitParam(name = "order", value = "图片顺序", required = true, dataType = "Integer"),
            @ApiImplicitParam(name = "isCover", value = "图片是否是封面图", required = true, dataType = "Boolean"),
            @ApiImplicitParam(name = "missionId", value = "任务ID", required = true, dataType = "Integer", paramType = "path")
    })
    @RequestMapping(value = "/upload/mission/image/{missionId}", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Image uploaded", response = UploadMissionImageResponse.class),
            @ApiResponse(code = 403, message = "Upload session timed out", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "Upload session id not exist", response = WrongResponse.class)
    })
    public ResponseEntity<Response> uploadFiles(@PathVariable("missionId") String missionId, @RequestBody MultipartFile multipartFile, @RequestParam("order") int order, @RequestParam("isCover") boolean isCover) {
        return null;
    }
}
