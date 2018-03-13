package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.entity.user.Role;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.MissionQueryResponse;
import trapx00.tagx00.vo.mission.instance.MissionInstanceDetailVo;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

@PreAuthorize(value = "hasRole('" + Role.WORKER_NAME + "')")
@RestController
public class WorkerMissionController {
    @RequestMapping(value = "/mission/worker", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns current user's missions", response = MissionQueryResponse.class),
            @ApiResponse(code = 401, message = "Not login"),
            @ApiResponse(code = 403, message = "Not worker")

    })
    @ResponseBody
    public ResponseEntity<Response> queryOnesAllMissions() {
        return null;
    }


    @RequestMapping(value = "/mission/worker/{missionId}", method = RequestMethod.DELETE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Mission abandoned."),
            @ApiResponse(code = 401, message = "Not login"),
            @ApiResponse(code = 403, message = "Not worker"),
            @ApiResponse(code = 404, message = "mission id not found or mission isn't accepted")
    })
    @ResponseBody
    public ResponseEntity<Response> abandon(@PathVariable("missionId") int missionId) {
        return null;
    }

    @RequestMapping(value = "/mission/worker/{missionId}", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Returns the instance", response = MissionInstanceDetailVo.class),
            @ApiResponse(code = 401, message = "Not login"),
            @ApiResponse(code = 403, message = "Not worker"),
            @ApiResponse(code = 404, message = "mission id not found or mission isn't accepted")
    })
    @ResponseBody
    public ResponseEntity<Response> getInstanceInformation(@PathVariable("missionId") int missionId) {
        return null;
    }

    @RequestMapping(value = "/mission/worker/{missionId}", method = RequestMethod.PUT) // save progress
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Progress saved.", response = SuccessResponse.class),
            @ApiResponse(code = 401, message = "Not login"),
            @ApiResponse(code = 403, message = "Not worker"),
            @ApiResponse(code = 404, message = "mission id not found or mission isn't accepted")
    })
    @ResponseBody
    public ResponseEntity<Response> saveProgress(
            @PathVariable("missionId") int missionId, @RequestBody MissionVo mission) {
        return null;
    }

    @RequestMapping(value = "/mission/worker/{missionId}", method = RequestMethod.POST) // save progress
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Progress saved.", response = SuccessResponse.class),
            @ApiResponse(code = 401, message = "Not login"),
            @ApiResponse(code = 403, message = "Not worker"),
            @ApiResponse(code = 404, message = "mission id not found or mission isn't accepted")
    })
    @ResponseBody
    public ResponseEntity<Response> submit(
            @PathVariable("missionId") int missionId, @RequestBody MissionVo mission) {
        return null;
    }

}
