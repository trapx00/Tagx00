package trapx00.tagx00.bl.mission;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import trapx00.tagx00.blservice.mission.PublicMissionBlService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PublicMissionBlServiceImplTest {
    @Autowired
    private PublicMissionBlService publicMissionBlService;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void getAllMissions() {
//        try {
//           assertEquals("凌尊", publicMissionBlService.getMissions(new PagingQueryVo(),"1","凌尊").getItems().get(0).getRequesterUsername());
//       } catch (Exception e) {
//            e.printStackTrace();
//       }
    }

    @Test
    public void getOneMissionDetail() {
//        try {
//            assertEquals("凌尊", publicMissionBlService.getOneMissionDetail("image_1").getDetail().getRequesterUsername());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }


}