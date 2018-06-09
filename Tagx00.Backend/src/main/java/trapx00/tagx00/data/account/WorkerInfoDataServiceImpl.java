package trapx00.tagx00.data.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.dao.mission.TextMissionDao;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.data.dao.mission.instance.TextInstanceDao;
import trapx00.tagx00.dataservice.account.WorkerInfoDataService;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkerInfoDataServiceImpl implements WorkerInfoDataService {

    private final ImageInstanceDao imageInstanceDao;
    private final ImageMissionDao imageMissionDao;
    private final TextInstanceDao textInstanceDao;
    private final TextMissionDao textMissionDao;

    @Autowired
    public WorkerInfoDataServiceImpl(ImageInstanceDao imageInstanceDao, ImageMissionDao imageMissionDao
    ,TextInstanceDao textInstanceDao,TextMissionDao textMissionDao) {
        this.imageInstanceDao = imageInstanceDao;
        this.imageMissionDao = imageMissionDao;
        this.textInstanceDao=textInstanceDao;
        this.textMissionDao=textMissionDao;
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
        if (instances == null)
            return null;
        Instance[] instances1 = new Instance[instances.size()];
        for (int i = 0; i < instances.size(); i++) {
            instances1[i] = instances.get(i);
        }
        return instances1;
    }
}
