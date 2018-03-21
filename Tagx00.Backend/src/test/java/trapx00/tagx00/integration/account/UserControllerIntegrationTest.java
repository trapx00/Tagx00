package trapx00.tagx00.integration.account;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.response.user.UserLoginResponse;
import trapx00.tagx00.response.user.UserRegisterResponse;

import static org.junit.Assert.*;

// integration test

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private UserDataService dataService;

    @Value("${jwt.route.authentication.login}")
    private String loginRoute;

    @Value("${jwt.route.authentication.register}")
    private String registerRoute;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void trial() {
        RestTemplate restTemplate = testRestTemplate.getRestTemplate();
        HttpEntity<String> entity = new HttpEntity<>(getAuthenticatedHeaders());
        ResponseEntity<String> response = restTemplate.exchange(getRoute("try"), HttpMethod.GET, entity, String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("123", response.getBody());
    }

    @Test
    public void registerShouldSucceedAndReturnToken() {
        ResponseEntity<UserRegisterResponse> response = register();
        assertEquals(HttpStatus.OK,response.getStatusCode());
        assertEquals("Authorization",response.getBody().getToken());
    }

    @Test
    public void loginShouldSuccess() {
        ResponseEntity<UserLoginResponse> response = login();
        assertEquals(HttpStatus.OK,response.getStatusCode());
    }

    public HttpHeaders getAuthenticatedHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+login().getBody().getToken());
        return headers;
    }

    private String getRoute(String route) {
        return "http://localhost:" + port + "/" + route;
    }

    private ResponseEntity<UserLoginResponse> login() {
        String url = getRoute(loginRoute) + "?username=test&password=test";
        return testRestTemplate.getForEntity(url, UserLoginResponse.class);
    }

    private ResponseEntity<UserRegisterResponse> register() {
        String url = getRoute(registerRoute) + "?username=test&password=test";
        return testRestTemplate.getForEntity(url,UserRegisterResponse.class);
    }




}