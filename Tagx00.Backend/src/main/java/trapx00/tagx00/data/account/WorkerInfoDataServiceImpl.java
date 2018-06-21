package trapx00.tagx00.data.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.*;
import trapx00.tagx00.data.dao.mission.instance.*;
import trapx00.tagx00.dataservice.account.WorkerInfoDataService;
import trapx00.tagx00.entity.mission.instance.Instance;

import java.util.ArrayList;

@Service
public class WorkerInfoDataServiceImpl implements WorkerInfoDataService {

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
    public WorkerInfoDataServiceImpl(ImageInstanceDao imageInstanceDao, ImageMissionDao imageMissionDao
        , TextInstanceDao textInstanceDao, TextMissionDao textMissionDao, AudioMissionDao audioMissionDao, AudioInstanceDao audioInstanceDao, VideoMissionDao videoMissionDao, VideoInstanceDao videoInstanceDao, ThreeDimensionMissionDao threeDimensionMissionDao, ThreeDimensionInstanceDao threeDimensionInstanceDao) {
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
     *
     * @param workerUsername
     * @return
     */
    @Override
    public Instance[] getInstanceByWorkerUsername(String workerUsername) {
        ArrayList<Instance> instances = new ArrayList<>();

        //获得每个种类的instance列表
        instances.addAll(imageInstanceDao.findImageInstancesByWorkerUsername(workerUsername));
        instances.addAll(textInstanceDao.findTextInstancesByWorkerUsername(workerUsername));

        instances.addAll(audioInstanceDao.findAudioInstancesByWorkerUsername(workerUsername));
        instances.addAll(videoInstanceDao.findVideoInstancesByWorkerUsername(workerUsername));
        instances.addAll(threeDimensionInstanceDao.findThreeDimensionInstancesByWorkerUsername(workerUsername));

        Instance[] instances1 = new Instance[instances.size()];
        for (int i = 0; i < instances.size(); i++) {
            instances1[i] = instances.get(i);
        }
        return instances1;
    }
}
