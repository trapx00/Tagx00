package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.exception.viewexception.MissionAlreadyAcceptedException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.UnmatchedUsernameAndMissionId;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.image.ImageInstanceVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkerMissionDataServiceImpl implements WorkerMissionDataService {
    private final ImageInstanceDao imageInstanceDao;
    private final ImageMissionDao imageMissionDao;

    @Autowired
    public WorkerMissionDataServiceImpl(ImageInstanceDao imageInstanceDao, ImageMissionDao imageMissionDao) {
        this.imageInstanceDao = imageInstanceDao;
        this.imageMissionDao = imageMissionDao;
    }

    /**
     * save the progress of the instance.
     * update instance
     * also use to abort the instance
     *
     * @param instanceDetailVo
     */
    @Override
    public int saveInstance(InstanceDetailVo instanceDetailVo) throws SystemException, MissionAlreadyAcceptedException, UnmatchedUsernameAndMissionId {
        MissionType missionType = instanceDetailVo.getMissionType();
        InstanceVo instanceVo = instanceDetailVo.getInstance();
        Instance result = null;
        if (this.getInstanceByUsernameAndMissionId(instanceVo.getWorkerUsername(),
                instanceVo.getMissionId(), missionType) == null) {
            throw new UnmatchedUsernameAndMissionId();
        } else {
            if (instanceVo.getInstanceId() == 0) {
                throw new MissionAlreadyAcceptedException();
            }
            switch (missionType) {
                case IMAGE:
                    ImageInstanceDetailVo imageInstanceDetailVo = (ImageInstanceDetailVo) instanceDetailVo;
                    ImageInstance imageInstance = generateImageInstance(instanceVo, imageInstanceDetailVo);
                    result = imageInstanceDao.saveInstance(imageInstance);
                    break;
            }
            if (result == null)
                throw new SystemException();
            return result.getInstanceId();
        }
    }


    /**
     * get mission id by username
     *
     * @param workerUsername
     * @return the list of  the MissionWorkerQueryItemVo
     */
    @Override
    public InstanceVo[] getInstanceByWorkerUsername(String workerUsername) {
        ArrayList<Instance> instances = new ArrayList<>();

        //获得每个种类的instance列表
        instances.addAll(imageInstanceDao.findImageInstancesByWorkerUsername(workerUsername));

        if (instances == null)
            return null;
        InstanceVo[] instanceVos = new InstanceVo[instances.size()];
        for (int i = 0; i < instances.size(); i++) {
            Instance instance = instances.get(i);
            int instanceResultIdsSize = 0;
            switch (instance.getMissionType()) {
                case IMAGE:
                    List<ImageResult> imageResults = ((ImageInstance) instance).getImageResults();
                    for (ImageResult imageResult : imageResults) {
                        if (imageResult.isDone()) {
                            instanceResultIdsSize++;
                        }
                    }
                    break;
            }
            instanceVos[i] = generateImageInstanceVo(instance, instanceResultIdsSize);
        }
        return instanceVos;

    }

    /**
     * get mission by mission id
     *
     * @param missionId   the id of the mission
     * @param missionType
     * @return the mission object
     */
    @Override
    public Mission getMissionByMissionId(int missionId, MissionType missionType) {
        Mission mission = null;
        switch (missionType) {
            case IMAGE:
                mission = imageMissionDao.findMissionByMissionId(missionId);
                break;
        }
        return mission;
    }

    /**
     * get the information of instance by username and missionId
     *
     * @param workerUsername
     * @param missionId
     * @param missionType
     * @return the instance matching username and missionId
     */
    @Override
    public InstanceDetailVo getInstanceByUsernameAndMissionId(String workerUsername, int missionId, MissionType missionType) {
        ArrayList<Instance> instances = new ArrayList<>();

        //获得每个种类的instance列表
        instances.addAll(imageInstanceDao.findImageInstancesByWorkerUsername(workerUsername));

        if (instances == null)
            return null;
        for (int i = 0; i < instances.size(); i++) {
            if (instances.get(i).getMissionId() == missionId && instances.get(i).getMissionType() == missionType) {
                Instance instance = instances.get(i);
                int instanceResultIdsSize = 0;
                switch (instance.getMissionType()) {
                    case IMAGE:
                        ImageInstance imageInstance = (ImageInstance) instance;
                        List<ImageResult> imageResults = imageInstance.getImageResults();
                        for (ImageResult imageResult : imageResults) {
                            if (imageResult.isDone()) {
                                instanceResultIdsSize++;
                            }
                        }
                        return generateImageInstanceDetailVo(imageInstance, instanceResultIdsSize);
                }
            }
        }
        return null;
    }

    @Override
    public boolean deleteInstanceByMissionIdAndUsername(int missionId, String username, MissionType missionType) {
        InstanceDetailVo instanceDetailVo = this.getInstanceByUsernameAndMissionId(username, missionId, missionType);
        switch (instanceDetailVo.getMissionType()) {
            case IMAGE:
                imageInstanceDao.deleteInstance(instanceDetailVo.getInstance().getInstanceId());
        }
        return true;
    }

    private ImageInstance generateImageInstance(InstanceVo instanceVo, ImageInstanceDetailVo instanceDetailVo) {
        return new ImageInstance(instanceVo.getInstanceId(), instanceVo.getWorkerUsername(), instanceVo.getMissionInstanceState(), MissionType.IMAGE, instanceVo.getAcceptDate(), instanceVo.getSubmitDate(), instanceVo.isSubmitted(), instanceVo.getMissionId(), instanceVo.getExp(), instanceVo.getExpRatio(), instanceVo.getCredits(), instanceVo.getComment(), instanceDetailVo.getImageResults());
    }

    private ImageInstanceVo generateImageInstanceVo(Instance instance, int completedCounts) {
        return new ImageInstanceVo(instance.getInstanceId(), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
                instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
                instance.isSubmitted(), completedCounts);
    }

    private ImageInstanceDetailVo generateImageInstanceDetailVo(ImageInstance imageInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(imageInstance.getInstanceId(), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(), imageInstance.getMissionId(), imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts);
        return new ImageInstanceDetailVo(imageInstance.getMissionType(), instanceVo, imageInstance.getImageResults());
    }

}
