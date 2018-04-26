package trapx00.tagx00.dataservice.pay;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.dataservice.account.RequesterInfoDataService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.vo.mission.pay.PayVo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class PayDataServiceTest {
    @Autowired
    private PayDataService payDataService;
    private UserDataService userDataService;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void updateUser(){
        try{
            payDataService.updateUser(new PayVo(100),"123");
            assertEquals(100,userDataService.getUserByUsername("123").getCredits());
        }
        catch (SystemException e){

        }

    }
}
