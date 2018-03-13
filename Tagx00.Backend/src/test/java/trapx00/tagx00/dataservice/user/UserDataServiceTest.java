package trapx00.tagx00.dataservice.user;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import trapx00.tagx00.entity.user.Role;
import trapx00.tagx00.entity.user.User;
import trapx00.tagx00.exception.viewexception.SystemException;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserDataServiceTest {
    @Autowired
    private UserDataService userDataService;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void isTheUserExists() {
        assertEquals(true, userDataService.isUserExistent("123"));
    }

    @Test
    public void saveUser() {
        System.out.println(userDataService);
        User user = new User("123", "345","test@tagx00.ml", Arrays.asList(Role.WORKER));
        try {
            userDataService.saveUser(user);
        } catch (SystemException e) {
            e.printStackTrace();
        }
    }
}