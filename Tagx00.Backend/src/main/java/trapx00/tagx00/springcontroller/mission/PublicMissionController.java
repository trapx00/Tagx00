package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.blservice.mission.PublicMissionBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.NotMissionException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.mission.MissionDetailResponse;
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
        try {
            return new ResponseEntity(publicMissionBlService.getAllMissions(), HttpStatus.OK);
        } catch (NotMissionException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.CONFLICT);
        }

    }

    @PreAuthorize(value = "hasRole('" + Role.REQUESTOR_NAME + "') or hasRole('" + Role.WORKER_NAME + "')")
    @ApiOperation(value = "获得某一任务", notes = "获得某个任务信息")
    @RequestMapping(value = "/mission/{missionId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionDetailResponse.class),
            @ApiResponse(code = 401, message = "Not login", response = WrongResponse.class),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission", response = WrongResponse.class),
            @ApiResponse(code = 404, message = "mission not found", response = WrongResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> getOneMission(@PathVariable(name = "missionId") Integer missionId) {
        try {
            return new ResponseEntity(publicMissionBlService.getOneMissionDetail(missionId), HttpStatus.OK);
        } catch (NotMissionException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.CONFLICT);
        }

    }
}
