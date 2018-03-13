package trapx00.tagx00.springcontroller.upload;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.upload.UploadMissionImageResponse;

@RestController
public class MissionUploadController {

    @RequestMapping(value = "/upload/mission/image/{id}", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Image uploaded", response = UploadMissionImageResponse.class),
            @ApiResponse(code = 403, message = "Upload session timed out"),
            @ApiResponse(code = 404, message = "Upload session id not exist")
    })
    public ResponseEntity<Response> uploadFiles(@PathVariable("id") String id, @RequestParam("order") int order,
        @RequestParam("isCover") boolean isCover) {
        return null;
    }
}
