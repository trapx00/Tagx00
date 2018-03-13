package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.entity.user.Role;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;

@PreAuthorize(value = "hasRole('" + Role.REQUESTOR_NAME + "')")
@RestController
public class RequesterMissionController {

    @RequestMapping(value = "/mission", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionCreateResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure")})
    @ResponseBody
    public ResponseEntity<Response> createMission(@RequestBody MissionCreateVo mission) {
        return null;
    }


    @RequestMapping(value = "/mission/requester", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns current user's missions", response = MissionQueryResponse.class),
            @ApiResponse(code = 401, message = "Not login"),
            @ApiResponse(code = 403, message = "Not requester")

    })
    @ResponseBody
    public ResponseEntity<Response> queryOnes() {
        return null;
    }

    @RequestMapping(value = "/mission/requester/{missionId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns the detail of the mission", response = MissionQueryDetailResponse.class),
            @ApiResponse(code = 401, message = "Not login"),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission"),
            @ApiResponse(code = 404, message = "mission not found")
    })
    @ResponseBody
    public ResponseEntity<Response> queryMissionDetail(@PathVariable("missionId") int missionId) {
        return null;
    }

    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns instances of the mission", response = MissionInstancesQueryResponse.class),
            @ApiResponse(code = 401, message = "Not login"),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission"),
            @ApiResponse(code = 404, message = "mission not found")
    })
    @ResponseBody
    public ResponseEntity<Response> queryInstances(@PathVariable("missionId") int missionId) {
        return null;
    }

    @RequestMapping(value = "/mission/requester/{missionId}/instances/{instanceId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns the instance", response = MissionInstanceQueryDetailResponse.class),
            @ApiResponse(code = 401, message = "Not login"),
            @ApiResponse(code = 403, message = "Not requester or not the author of the mission"),
            @ApiResponse(code = 404, message = "mission or instance not found")
    })
    @ResponseBody
    public ResponseEntity<Response> queryInstance(@PathVariable("missionId") int missionId, @PathVariable("instanceId") int instanceId) {
        return null;
    }

}
