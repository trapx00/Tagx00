package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.mission.MissionCreateResponse;
import trapx00.tagx00.response.mission.MissionPublicResponse;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

@RestController
public class PublicMissionController {
    @RequestMapping(value = "/mission", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionPublicResponse.class)
    })
    @ResponseBody
    public ResponseEntity<Response> getAllMissions() {
        return null;
    }


}
