package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.mission.MissionCreateResponse;
import trapx00.tagx00.response.mission.MissionPublicResponse;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

@RestController
public class PublicMissionController {
    @ApiOperation(value = "获得所有任务", notes = "获得本站所有现有有的任务信息")
    @RequestMapping(value = "/mission", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionPublicResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> getAllMissions() {
        return null;
    }


}
