package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import trapx00.tagx00.entity.user.Role;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.mission.MissionQueryResponse;

@PreAuthorize(value = "hasRole('" + Role.WORKER_NAME +"')")
@RestController
public class WorkerMissionController {
    @RequestMapping(value = "/mission/worker", method = RequestMethod.GET)
    @ApiResponses(value = {
        @ApiResponse(code =200, message = "Returns current user's missions", response = MissionQueryResponse.class),
        @ApiResponse(code = 401, message = "Not login"),
        @ApiResponse(code = 403, message = "Not worker")

    })
    @ResponseBody
    public ResponseEntity<Response> queryOnes() {
        return null;
    }


}
