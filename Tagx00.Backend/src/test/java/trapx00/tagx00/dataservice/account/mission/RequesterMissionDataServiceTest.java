package trapx00.tagx00.dataservice.account.mission;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import trapx00.tagx00.data.mission.RequesterMissionDataServiceImpl;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

import java.util.Date;

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RequesterMissionDataServiceTest {
    @Autowired
    private RequesterMissionDataService requesterMissionDataService;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    private MissionVo missionVo = new MissionVo(MissionType.IMAGE);
    private MissionInstanceItemVo missionInstanceItem = new MissionInstanceItemVo(0,"张三", MissionInstanceState.SUBMITTED, new Date(), new Date(),100,100);

    @Test
    public void saveMission() {
        requesterMissionDataService.saveMission(missionVo);
    }

    @Test
    public void getMissionByUsername() {
        requesterMissionDataService.saveMission(missionVo);
        assertEquals(0,requesterMissionDataService.getMissionByUsername("123").length);
    }

    @Test
    public void getInstanceById() {
        requesterMissionDataService.saveMission(missionVo);
        assertEquals(null,requesterMissionDataService.getInstanceById(0));
    }

    @Test
    public void getInstanceByUsername() {
        requesterMissionDataService.saveMission(missionVo);
        assertEquals(0,requesterMissionDataService.getInstanceByUsername("123").length);
    }

    @Test
    public void getInstanceByUsernameAndMissionId() {
        requesterMissionDataService.saveMission(missionVo);
        assertEquals(null,requesterMissionDataService.getInstanceByUsernameAndMissionId("123",0));
    }
}