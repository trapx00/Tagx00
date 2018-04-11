package trapx00.tagx00.springcontroller.topic;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import trapx00.tagx00.blservice.topic.TopicBlService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.WrongResponse;
import trapx00.tagx00.response.topic.TopicFetchResponse;
import trapx00.tagx00.vo.mission.topic.TopicDeleteVo;
import trapx00.tagx00.vo.mission.topic.TopicSaveVo;

@RestController
public class TopicController {
    private final TopicBlService topicBlService;

    public TopicController(TopicBlService topicBlService) {
        this.topicBlService = topicBlService;
    }

    @ApiOperation(value = "获得主题词", notes = "获得所有主题词")
    @RequestMapping(value = "mission/topics", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = TopicFetchResponse.class),
            @ApiResponse(code = 500, message = "Failure", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> fetchTopics() {
        return new ResponseEntity<>(topicBlService.getAllTopics(), HttpStatus.OK);
    }

    @PreAuthorize(value = "hasRole('" + Role.ADMIN_NAME + "')")
    @Authorization("管理员")
    @ApiOperation(value = "删除主题词", notes = "删除主题词")
    @RequestMapping(value = "mission/topics", method = RequestMethod.DELETE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = SuccessResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> deleteTopics(@RequestBody TopicDeleteVo topicDeleteVo) {
        topicBlService.deleteTopic(topicDeleteVo);
        return new ResponseEntity<>(new SuccessResponse("delete successfully"), HttpStatus.OK);
    }

    @PreAuthorize(value = "hasRole('" + Role.ADMIN_NAME + "')")
    @Authorization("管理员")
    @ApiOperation(value = "新增主题词", notes = "新增主题词")
    @RequestMapping(value = "mission/topics", method = RequestMethod.PUT)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success", response = SuccessResponse.class),
            @ApiResponse(code = 500, message = "System error", response = WrongResponse.class)})
    @ResponseBody
    public ResponseEntity<Response> addTopics(@RequestBody TopicSaveVo topicSaveVo) {
        try {
            topicBlService.saveTopic(topicSaveVo);
            return new ResponseEntity<>(new SuccessResponse("save successfully"), HttpStatus.OK);
        } catch (SystemException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getResponse(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
