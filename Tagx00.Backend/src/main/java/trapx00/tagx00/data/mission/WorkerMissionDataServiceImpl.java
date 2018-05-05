package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.exception.viewexception.MissionAlreadyAcceptedException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.util.MissionUtil;
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
    public int saveInstanceDetailVo(InstanceDetailVo instanceDetailVo) throws SystemException, MissionAlreadyAcceptedException {
        if (MissionUtil.getId(instanceDetailVo.getInstance().getInstanceId()) == 0) {
            instanceDetailVo.setMissionType(imageMissionDao.findImageMissionByMissionId(MissionUtil.getId(instanceDetailVo.getInstance().getMissionId())).getMissionType());
            instanceDetailVo = new ImageInstanceDetailVo(instanceDetailVo.getMissionType(), instanceDetailVo.getInstance(), new ArrayList<>());
        }
        MissionType missionType = instanceDetailVo.getMissionType();
        InstanceVo instanceVo = instanceDetailVo.getInstance();
        Instance result = null;

        switch (missionType) {
            case IMAGE:
                ImageInstanceDetailVo imageInstanceDetailVo = (ImageInstanceDetailVo) instanceDetailVo;
                ImageInstance imageInstance = generateImageInstance(instanceVo, imageInstanceDetailVo);
                result = imageInstanceDao.save(imageInstance);
                break;
        }
        if (result == null)
            throw new SystemException();
        return result.getInstanceId();
    }

    /**
     * save the instance
     *
     * @param instanceId
     * @param missionType
     */
    @Override
    public int abortInstance(int instanceId, MissionType missionType) {
        switch (missionType) {
            case IMAGE:
                ImageInstance imageInstance = imageInstanceDao.findInstancesByMissionId(instanceId).get(0);
                imageInstance.setMissionInstanceState(MissionInstanceState.ABANDONED);
                imageInstanceDao.save(imageInstance);
        }
        return 0;
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
     * get the information of instance by username and missionId
     *
     * @param workerUsername
     * @param missionId
     * @param missionType
     * @return the instance matching username and missionId
     */
    @Override
    public InstanceDetailVo getInstanceDetailVoByUsernameAndMissionId(String workerUsername, int missionId, MissionType missionType) {
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

    /**
     * get the information of  instance by username and missionId
     *
     * @param workerUsername
     * @param missionId
     * @param missionType
     * @return the instance matching username and missionId
     */
    @Override
    public Instance getInstanceByUsernameAndMissionId(String workerUsername, int missionId, MissionType missionType) {
        ArrayList<Instance> instances = new ArrayList<>();

        //获得每个种类的instance列表
        instances.addAll(imageInstanceDao.findImageInstancesByWorkerUsername(workerUsername));

        if (instances == null)
            return null;
        for (int i = 0; i < instances.size(); i++) {
            if (instances.get(i).getMissionId() == missionId && instances.get(i).getMissionType() == missionType) {
                Instance instance = instances.get(i);
                return instance;
            }
        }
        return null;
    }

    @Override
    public boolean deleteInstanceByMissionIdAndUsername(int missionId, String username, MissionType missionType) {
        InstanceDetailVo instanceDetailVo = this.getInstanceDetailVoByUsernameAndMissionId(username, missionId, missionType);
        switch (instanceDetailVo.getMissionType()) {
            case IMAGE:
                imageInstanceDao.deleteById(MissionUtil.getId(instanceDetailVo.getInstance().getInstanceId()));
        }
        return true;
    }

    private ImageInstance generateImageInstance(InstanceVo instanceVo, ImageInstanceDetailVo instanceDetailVo) {
        return new ImageInstance(MissionUtil.getId(instanceVo.getInstanceId()), instanceVo.getWorkerUsername(), instanceVo.getMissionInstanceState(), MissionType.IMAGE, instanceVo.getAcceptDate(), instanceVo.getSubmitDate(), instanceVo.isSubmitted(), MissionUtil.getId(instanceVo.getMissionId()), instanceVo.getExp(), instanceVo.getExpRatio(), instanceVo.getCredits(), instanceVo.getComment(), instanceDetailVo.getImageResults());
    }

    private ImageInstanceVo generateImageInstanceVo(Instance instance, int completedCounts) {
        return new ImageInstanceVo(MissionUtil.addTypeToId(instance.getInstanceId(), instance.getMissionType()), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
                MissionUtil.addTypeToId(instance.getMissionId(), instance.getMissionType()), instance.getAcceptDate(), instance.getSubmitDate(),
                instance.isSubmitted(), completedCounts);
    }

    private ImageInstanceDetailVo generateImageInstanceDetailVo(ImageInstance imageInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(MissionUtil.addTypeToId(imageInstance.getInstanceId(), imageInstance.getMissionType()), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(), MissionUtil.addTypeToId(imageInstance.getMissionId(), imageInstance.getMissionType()), imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts);
        return new ImageInstanceDetailVo(imageInstance.getMissionType(), instanceVo, imageInstance.getImageResults());
    }

}
