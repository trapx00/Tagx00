package trapx00.tagx00.dataservice.account;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionType;

import static org.junit.Assert.assertEquals;

public class RequesterInfoDataServiceTest {

    @Autowired
    private RequesterInfoDataService requesterInfoDataService;


    @Before
    public void setUp() throws Exception {

    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void getMissionsByRequesterUsername(){

        assertEquals(1,requesterInfoDataService.getMissionsByRequesterUsername("秦牧").length);

    }

    @Test
    public void getInstancesByMissionId(){

        assertEquals(1,requesterInfoDataService.getInstancesByMissionId(1, MissionType.IMAGE).length);

    }

}
