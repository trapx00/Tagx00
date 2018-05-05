package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.image.ImageInstanceVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.requester.MissionFinalizeVo;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequesterMissionDataServiceImpl implements RequesterMissionDataService {

    private final ImageInstanceDao imageInstanceDao;
    private final ImageMissionDao imageMissionDao;

    @Autowired
    public RequesterMissionDataServiceImpl(ImageInstanceDao imageInstanceDao, ImageMissionDao imageMissionDao) {
        this.imageInstanceDao = imageInstanceDao;
        this.imageMissionDao = imageMissionDao;
    }

    /**
     * save mission
     *
     * @param mission
     */
    @Override
    public int saveMission(Mission mission) throws SystemException {
        Mission result = null;
        switch (mission.getMissionType()) {
            case IMAGE:
                if ((result = imageMissionDao.save((ImageMission) mission)) == null) {
                    throw new SystemException();
                }
        }
        return result.getMissionId();
    }

    /**
     * get instance by instanceId
     *
     * @param instanceId
     * @param missionType
     * @return the specific MissionInstanceItemVo
     */
    @Override
    public InstanceDetailVo getInstanceByInstanceId(int instanceId, MissionType missionType) {
        switch (missionType) {
            case IMAGE:
                ImageInstance imageInstance = imageInstanceDao.findInstanceByInstanceId(instanceId);
                if (imageInstance == null)
                    return null;
                else {
                    int imageResultSize = 0;
                    List<ImageResult> imageResults = imageInstance.getImageResults();
                    for (ImageResult imageResult : imageResults) {
                        if (imageResult.isDone()) {
                            imageResultSize++;
                        }
                    }
                    return generateImageInstanceDetailVo(imageInstance, imageResultSize);
                }
        }
        return null;
    }

    @Override
    public InstanceVo[] getInstancesByMissionId(int missionId, MissionType missionType) {
        ArrayList<Instance> instances = new ArrayList<>();
        InstanceVo[] instanceVos = null;
        switch (missionType) {
            case IMAGE:
                instances.addAll(imageInstanceDao.findInstancesByMissionId(missionId));
                if (instances.size() == 0)
                    return null;
                instanceVos = new InstanceVo[instances.size()];
                for (int i = 0; i < instanceVos.length; i++) {
                    Instance instanceVo = instances.get(i);
                    int imageResultSize = 0;
                    ImageInstance imageInstance = (ImageInstance) instanceVo;
                    List<ImageResult> imageResults = imageInstance.getImageResults();
                    for (ImageResult imageResult : imageResults) {
                        if (imageResult.isDone()) {
                            imageResultSize++;
                        }
                    }
                    instanceVos[i] = generateImageInstanceVo(imageInstance, imageResultSize);
                }
        }
        return instanceVos;
    }

    /**
     * get all instances
     *
     * @return the instances
     */
    @Override
    public InstanceVo[] getAllInstances() {
        ArrayList<InstanceVo> result = new ArrayList<>();

        for (ImageInstance imageInstance : imageInstanceDao.findAll()) {
            int imageResultSize = 0;
            List<ImageResult> imageResults = imageInstance.getImageResults();
            for (ImageResult imageResult : imageResults) {
                if (imageResult.isDone()) {
                    imageResultSize++;
                }
            }
            result.add(generateImageInstanceVo(imageInstance, imageResultSize));
        }
        return result.toArray(new InstanceVo[result.size()]);
    }

    /**
     * get mission by mission id
     *
     * @param missionId   the id of the mission
     * @param missionType the type of the mission
     * @return the mission object
     */
    @Override
    public Mission getMissionByMissionId(int missionId, MissionType missionType) {
        Mission mission = null;
        switch (missionType) {
            case IMAGE:
                mission = imageMissionDao.findImageMissionByMissionId(missionId);
                break;
        }
        return mission;
    }

    /**
     * update the mission's credits
     *
     * @param missionId
     * @param credits
     */
    @Override
    public void updateMission(int missionId, int credits, MissionType missionType) throws SystemException {
        Mission mission = null;
        switch (missionType) {
            case IMAGE:
                mission = imageMissionDao.findImageMissionByMissionId(missionId);
                break;
        }
        mission.setCredits(mission.getCredits() + credits);
        saveMission(mission);
    }

    /**
     * finlize the instance
     *
     * @param instanceId
     * @param missionFinalizeVo
     */
    @Override
    public void updateInstance(int instanceId, MissionFinalizeVo missionFinalizeVo, MissionType missionType) throws SystemException {
        Instance instance = null;
        Mission mission = null;
        switch (missionType) {
            case IMAGE:
                instance = imageInstanceDao.findInstanceByInstanceId(instanceId);
                int missionId = instance.getMissionId();
                mission = imageMissionDao.findImageMissionByMissionId(missionId);
        }
        instance.setMissionInstanceState(MissionInstanceState.FINALIZED);
        instance.setComment(missionFinalizeVo.getComment());
        instance.setExpRatio(missionFinalizeVo.getExpRatio());
        instance.setExp(missionFinalizeVo.getExpRatio() * mission.getLevel() * 20);
        instance.setCredits(missionFinalizeVo.getCredits());
        switch (instance.getMissionType()) {
            case IMAGE:
                if (imageInstanceDao.save((ImageInstance) instance) == null) {
                    throw new SystemException();
                }
        }
    }

    private ImageInstanceDetailVo generateImageInstanceDetailVo(ImageInstance imageInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(MissionUtil.addTypeToId(imageInstance.getInstanceId(), imageInstance.getMissionType()), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(), MissionUtil.addTypeToId(imageInstance.getMissionId(), imageInstance.getMissionType()), imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts);
        return new ImageInstanceDetailVo(imageInstance.getMissionType(), instanceVo, imageInstance.getImageResults());
    }

    private ImageInstanceVo generateImageInstanceVo(ImageInstance imageInstance, int completedCounts) {
        return new ImageInstanceVo(MissionUtil.addTypeToId(imageInstance.getInstanceId(), imageInstance.getMissionType()), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(),
                imageInstance.getMissionInstanceState(), MissionUtil.addTypeToId(imageInstance.getMissionId(), imageInstance.getMissionType()),
                imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts
        );
    }
}
