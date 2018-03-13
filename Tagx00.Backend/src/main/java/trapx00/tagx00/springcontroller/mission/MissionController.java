package trapx00.tagx00.springcontroller.mission;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.exception.viewexception.WrongUsernameOrPasswordException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.mission.MissionCreateResponse;
import trapx00.tagx00.response.user.UserLoginResponse;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;


@RestController
public class MissionController {
    @ApiOperation(value = "login", nickname = "login")
    @RequestMapping(value = "/mission", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = MissionCreateResponse.class),
            @ApiResponse(code = 401, message = "Unauthorized", response = WrongResponse.class),
            @ApiResponse(code = 500, message = "Failure")})
    @ResponseBody
    public ResponseEntity<Response> createMission(@RequestBody MissionVo mission) {
        return null;
    }

}
