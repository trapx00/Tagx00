package trapx00.tagx00.dataservice.account.mission;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import trapx00.tagx00.data.mission.WorkerMissionDataServiceImpl;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;

import java.util.Date;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WorkerMissionDataServiceTest {
    private WorkerMissionDataService workerMissionDataService = new WorkerMissionDataServiceImpl();
    private MissionInstanceItemVo missionInstanceItem = new MissionInstanceItemVo(0,"张三", MissionInstanceState.SUBMITTED, new Date(), new Date(),100,100);

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void saveInstance() {
        workerMissionDataService.saveInstance(missionInstanceItem);
    }

    @Test
    public void getMissionByUsername() {
        workerMissionDataService.saveInstance(missionInstanceItem);
        assertEquals(1,workerMissionDataService.getMissionByUsername("张三").length);
    }

    @Test
    public void getInstanceByUsernameAndMissionId() {
        workerMissionDataService.saveInstance(missionInstanceItem);
        assertEquals(null,workerMissionDataService.getInstanceByUsernameAndMissionId("张三",1));
    }
}