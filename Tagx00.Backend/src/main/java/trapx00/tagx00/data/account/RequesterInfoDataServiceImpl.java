package trapx00.tagx00.data.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.*;
import trapx00.tagx00.data.dao.mission.instance.*;
import trapx00.tagx00.dataservice.account.RequesterInfoDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.ArrayList;

@Service
public class RequesterInfoDataServiceImpl implements RequesterInfoDataService {
    private final ImageInstanceDao imageInstanceDao;
    private final ImageMissionDao imageMissionDao;
    private final TextInstanceDao textInstanceDao;
    private final TextMissionDao textMissionDao;
    private final AudioMissionDao audioMissionDao;
    private final AudioInstanceDao audioInstanceDao;
    private final VideoMissionDao videoMissionDao;
    private final VideoInstanceDao videoInstanceDao;
    private final ThreeDimensionMissionDao threeDimensionMissionDao;
    private final ThreeDimensionInstanceDao threeDimensionInstanceDao;

    @Autowired
    public RequesterInfoDataServiceImpl(ImageInstanceDao imageInstanceDao, ImageMissionDao imageMissionDao,
                                        TextMissionDao textMissionDao, TextInstanceDao textInstanceDao, AudioMissionDao audioMissionDao, AudioInstanceDao audioInstanceDao, VideoMissionDao videoMissionDao, VideoInstanceDao videoInstanceDao, ThreeDimensionMissionDao threeDimensionMissionDao, ThreeDimensionInstanceDao threeDimensionInstanceDao) {
        this.imageInstanceDao = imageInstanceDao;
        this.imageMissionDao = imageMissionDao;
        this.textInstanceDao=textInstanceDao;
        this.textMissionDao=textMissionDao;
        this.audioMissionDao = audioMissionDao;
        this.audioInstanceDao = audioInstanceDao;
        this.videoMissionDao = videoMissionDao;
        this.videoInstanceDao = videoInstanceDao;
        this.threeDimensionMissionDao = threeDimensionMissionDao;
        this.threeDimensionInstanceDao = threeDimensionInstanceDao;
    }

    /**
     * get missions by requesterUsername
     *
     * @param requesterUsername
     * @return
     */
    @Override
    public Mission[] getMissionsByRequesterUsername(String requesterUsername) {



        ArrayList<Mission> missions = new ArrayList<>();
        //image
        missions.addAll(imageMissionDao.findImageMissionsByRequesterUsername(requesterUsername));
        //text
        missions.addAll(textMissionDao.findTextMissionsByRequesterUsername(requesterUsername));

        missions.addAll(audioMissionDao.findAudioMissionsByRequesterUsername(requesterUsername));

        missions.addAll(videoMissionDao.findVideoMissionsByRequesterUsername(requesterUsername));

        missions.addAll(threeDimensionMissionDao.findThreeDimensionMissionsByRequesterUsername(requesterUsername));


        Mission[] mission = new Mission[missions.size()];
        for (int i = 0; i < missions.size(); i++)
            mission[i] = missions.get(i);
        return mission;
    }

    /**
     * get instances by missionId
     *
     * @param missionId
     * @return
     */
    @Override
    public Instance[] getInstancesByMissionId(String missionId, MissionType missionType) {
        ArrayList<Instance> instances = new ArrayList<>();
        switch (missionType) {
            case IMAGE:
                instances.addAll(imageInstanceDao.findImageInstancesByMissionId(missionId));
                break;
            case TEXT:
                instances.addAll(textInstanceDao.findTextInstancesByMissionId(missionId));
                break;
            case AUDIO:
                instances.addAll(audioInstanceDao.findAudioInstancesByMissionId(missionId));
                break;
            case VIDEO:
                instances.addAll(videoInstanceDao.findVideoInstancesByMissionId(missionId));
                break;
            case THREE_DIMENSION:
                instances.addAll(threeDimensionInstanceDao.findThreeDimensionInstancesByMissionId(missionId));
                break;

        }
        return instances.toArray(new Instance[instances.size()]);
    }


}
