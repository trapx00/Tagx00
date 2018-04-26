package trapx00.tagx00.dataservice.account;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.image.ImageMissionType;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.ArrayList;
import java.util.Date;

import static org.junit.Assert.assertEquals;

public class RequesterInfoDataServiceTest {

    @Autowired
    private RequesterInfoDataService requesterInfoDataService;
    private RequesterMissionDataService requesterMissionDataService;

    private ImageMission mission;
    private MissionProperties missionProperties;
    private MissionInstanceItemVo missionInstanceItem;

    @Before
    public void setUp() throws Exception {
        missionProperties = new MissionProperties(MissionType.IMAGE);
        ArrayList<String> topics = new ArrayList<>();
        topics.add("风景画");
        topics.add("灾难画");
        ArrayList<String> allowedTags = new ArrayList<>();
        allowedTags.add("风景画");
        allowedTags.add("灾难画");
        ArrayList<ImageMissionType> imageMissionTypes = new ArrayList<>();
        imageMissionTypes.add(ImageMissionType.PART);
        imageMissionTypes.add(ImageMissionType.DISTRICT);
        ArrayList<String> urls = new ArrayList<>();
        urls.add("https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/0E/00/ChMkJlnJ4TOIAyeVAJqtjV-XTiAAAgzDAE7v40Amq2l708.jpg");
        urls.add("http://pic1.16xx8.com/allimg/170801/1-1FP116442T62.jpg");
        urls.add("http://pic1.16xx8.com/allimg/170801/1-1FP116442T62.jpg");
        mission = new ImageMission("123",
                "123123", topics, false, allowedTags,
                MissionType.IMAGE, MissionState.ACTIVE, new Date(), new Date(),
                "http://pic1.16xx8.com/allimg/170801/1-1FP116442T62.jpg", "凌尊", 1, 10, 1, urls, imageMissionTypes);

    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void getMissionsByRequesterUsername(){
        try{
            requesterMissionDataService.saveMission(mission);
            assertEquals("123",requesterInfoDataService.getMissionsByRequesterUsername("凌尊")[0].getTitle());
        }catch (SystemException e){

        }

    }

    @Test
    public void getInstancesByMissionId(){

        assertEquals(0,requesterInfoDataService.getInstancesByMissionId(1, MissionType.IMAGE).length);

    }

}
