package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import trapx00.tagx00.blservice.mission.PublicMissionBlService;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.mission.MissionPublicResponse;

@RestController
public class PublicMissionController {
    private final PublicMissionBlService publicMissionBlService;

    @Autowired
    public PublicMissionController(PublicMissionBlService publicMissionBlService) {
        this.publicMissionBlService = publicMissionBlService;
    }

    @ApiOperation(value = "获得所有任务", notes = "获得本站所有现有有的任务信息")
    @RequestMapping(value = "/mission", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionPublicResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> getMissions() {
        return new ResponseEntity(publicMissionBlService.getAllMissions(), HttpStatus.OK);
    }


}
