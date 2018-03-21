package trapx00.tagx00.integration.mission;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import trapx00.tagx00.blservice.account.UserBlService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.response.Response;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.util.UserInfoUtil;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RequesterMissionControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private UserBlService userBlService;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    private String getRoute(String route) {
        return "http://localhost:" + port + "/" + route;
    }

    @Test
    public void createMission() {
        String url = getRoute("mission");
        ResponseEntity<MissionCreateResponse> response = testRestTemplate.getForEntity(url,MissionCreateResponse.class);
        assertEquals(HttpStatus.OK,response.getStatusCode());
    }

    @Test
    public void queryOnesButNoRequester() {
        String url = getRoute("mission/requester");
        ResponseEntity<MissionQueryResponse> response = testRestTemplate.getForEntity(url,MissionQueryResponse.class);
        assertEquals(HttpStatus.FORBIDDEN,response.getStatusCode());
    }

    @Test
    public void queryMissionDetailButNoRequester() {
        String url = getRoute("mission/requester/0");
        ResponseEntity<MissionQueryDetailResponse> response = testRestTemplate.getForEntity(url,MissionQueryDetailResponse.class);
        assertEquals(HttpStatus.FORBIDDEN,response.getStatusCode());
    }

    @Test
    public void queryInstancesButNoRequester() {
        String url = getRoute("mission/requester/0/instances/");
        ResponseEntity<MissionInstancesQueryResponse> response = testRestTemplate.getForEntity(url,MissionInstancesQueryResponse.class);
        assertEquals(HttpStatus.FORBIDDEN,response.getStatusCode());
    }


     /*@Test
    public void queryOnesAndSucceed() {
        String url = getRoute("mission/requester");
        ResponseEntity<MissionQueryResponse> response = testRestTemplate.getForEntity(url,MissionQueryResponse.class);
        assertEquals(HttpStatus.OK,response.getStatusCode());
    }

    @Test
    public void queryMissionDetailAndSucceed() {
        String url = getRoute("mission/requester/0");
        ResponseEntity<MissionQueryDetailResponse> response = testRestTemplate.getForEntity(url,MissionQueryDetailResponse.class);
        assertEquals(HttpStatus.OK,response.getStatusCode());
    }

     @Test
    public void queryInstancesAndSucceed() {
        String url = getRoute("mission/requester/0/instances/");
        ResponseEntity<MissionInstancesQueryResponse> response = testRestTemplate.getForEntity(url,MissionInstancesQueryResponse.class);
        assertEquals(HttpStatus.OK,response.getStatusCode());
    }

     @Test
    public void queryInstanceButNoRequester() {
        String url = getRoute("mission/requester/0/instances/0");
        ResponseEntity<MissionInstanceQueryDetailResponse> response = testRestTemplate.getForEntity(url,MissionInstanceQueryDetailResponse.class);
        assertEquals(HttpStatus.OK,response.getStatusCode());
    }
    */
}