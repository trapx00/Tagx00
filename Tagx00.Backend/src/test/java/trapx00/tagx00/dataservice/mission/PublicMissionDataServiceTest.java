package trapx00.tagx00.dataservice.mission;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import trapx00.tagx00.publicdatas.mission.MissionType;

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest
public class PublicMissionDataServiceTest {
    @Autowired
    private PublicMissionDataService publicMissionDataService;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void getMissions() {
        assertEquals("凌尊", publicMissionDataService.getMissions()[0].getRequesterUsername());

    }
    @Test
    public void getOneMissionDetail() {
        assertEquals("凌尊", publicMissionDataService.getOneMissionDetail(1, MissionType.IMAGE).getPublicItem().getRequesterUsername());

    }


}