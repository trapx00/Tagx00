package trapx00.tagx00.dataservice.account.mission;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import trapx00.tagx00.data.mission.PublicMissionDataServiceImpl;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PublicMissionDataServiceTest {

    private PublicMissionDataService publicMissionDataService = new PublicMissionDataServiceImpl();

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void getMissions() {
        MissionPublicItemVo missionPublicItemVo = new MissionPublicItemVo("ImageMission", null, null,  new Date(), new Date());
        publicMissionDataService.getMissions();
    }
}