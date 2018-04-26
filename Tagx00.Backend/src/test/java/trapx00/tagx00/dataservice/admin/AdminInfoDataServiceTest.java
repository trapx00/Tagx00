package trapx00.tagx00.dataservice.admin;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.dataservice.account.RequesterInfoDataService;

import static org.junit.Assert.assertEquals;

public class AdminInfoDataServiceTest {
    @Autowired
    private AdminInfoDataService adminInfoDataService;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void getUsers(){

        assertEquals(1,adminInfoDataService.getUsers().length);

    }
    @Test
    public void getMissions(){

        assertEquals(1,adminInfoDataService.getMissions().length);

    }
    @Test
    public void getInstances(){

        assertEquals(1,adminInfoDataService.getInstances().length);

    }
}
