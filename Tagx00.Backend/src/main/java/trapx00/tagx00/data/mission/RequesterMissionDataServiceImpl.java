package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.data.dao.mission.TextMissionDao;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.data.dao.mission.instance.TextInstanceDao;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.TextMission;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.entity.mission.instance.TextInstance;
import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.entity.mission.instance.workresult.TextResult;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.image.ImageInstanceVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.requester.MissionFinalizeVo;
import trapx00.tagx00.vo.mission.text.TextInstanceDetailVo;
import trapx00.tagx00.vo.mission.text.TextInstanceVo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RequesterMissionDataServiceImpl implements RequesterMissionDataService {

    private final MissionDao missionDao;
    private final ImageInstanceDao imageInstanceDao;
    private final ImageMissionDao imageMissionDao;
    private final TextInstanceDao textInstanceDao;
    private final TextMissionDao textMissionDao;

    @Autowired
    public RequesterMissionDataServiceImpl(MissionDao missionDao, ImageInstanceDao imageInstanceDao, ImageMissionDao imageMissionDao,
                                           TextMissionDao textMissionDao, TextInstanceDao textInstanceDao) {
        this.missionDao = missionDao;
        this.imageInstanceDao = imageInstanceDao;
        this.imageMissionDao = imageMissionDao;
        this.textInstanceDao = textInstanceDao;
        this.textMissionDao = textMissionDao;
    }

    /**
     * update mission
     *
     * @param mission
     */
    @Override
    public String updateMission(Mission mission) throws SystemException {
        Mission result = null;
        switch (mission.getMissionType()) {
            case IMAGE:
                if ((result = imageMissionDao.save((ImageMission) mission)) == null) {
                    throw new SystemException();
                }
                break;
            case TEXT:
                if ((result = textMissionDao.save((TextMission) mission)) == null) {
                    throw new SystemException();
                }
                break;
        }
        return result.getMissionId();
    }

    /**
     * save mission
     *
     * @param mission
     */
    @Override
    public String saveMission(Mission mission) throws SystemException {
        Mission result = null;
        switch (mission.getMissionType()) {
            case IMAGE:
                mission.setMissionId(getNextId(imageMissionDao.findAll(), MissionType.IMAGE));
                if ((result = imageMissionDao.save((ImageMission) mission)) == null) {
                    throw new SystemException();
                }
                break;
            case TEXT:
                mission.setMissionId(getNextId(textMissionDao.findAll(), MissionType.TEXT));
                if ((result = textMissionDao.save((TextMission) mission)) == null) {
                    throw new SystemException();
                }
                break;
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
    public InstanceDetailVo getInstanceByInstanceId(String instanceId, MissionType missionType) {
        switch (missionType) {
            case IMAGE:
                ImageInstance imageInstance = imageInstanceDao.findImageInstanceByInstanceId(instanceId);
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
            case TEXT:
                TextInstance textInstance = textInstanceDao.findTextInstanceByInstanceId(instanceId);
                if (textInstance == null)
                    return null;
                else {
                    int textResultSize = 0;
                    List<TextResult> textResults = textInstance.getTextResults();
                    for (TextResult textResult : textResults) {
                        if (textResult.isDone()) {
                            textResultSize++;
                        }
                    }
                    return generateTextInstanceDetailVo(textInstance, textResultSize);
                }
        }
        return null;
    }

    @Override
    public InstanceVo[] getInstancesByMissionId(String missionId, MissionType missionType) {
        ArrayList<Instance> instances = new ArrayList<>();
        InstanceVo[] instanceVos = null;
        switch (missionType) {
            case IMAGE:
                instances.addAll(imageInstanceDao.findImageInstancesByMissionId(missionId));
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
                break;
            case TEXT:
                instances.addAll(textInstanceDao.findTextInstancesByMissionId(missionId));
                if (instances.size() == 0)
                    return null;
                instanceVos = new InstanceVo[instances.size()];
                for (int i = 0; i < instanceVos.length; i++) {
                    Instance instanceVo = instances.get(i);
                    int textResultSize = 0;
                    TextInstance textInstance = (TextInstance) instanceVo;
                    List<TextResult> textResults = textInstance.getTextResults();
                    for (TextResult textResult : textResults) {
                        if (textResult.isDone()) {
                            textResultSize++;
                        }
                    }
                    instanceVos[i] = generateTextInstanceVo(textInstance, textResultSize);
                }
                break;
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
        for (TextInstance textInstance : textInstanceDao.findAll()) {
            int textResultSize = 0;
            List<TextResult> textResults = textInstance.getTextResults();
            for (TextResult textResult : textResults) {
                if (textResult.isDone())
                    textResultSize++;
            }
            result.add(generateTextInstanceVo(textInstance, textResultSize));
        }
        return result.toArray(new InstanceVo[result.size()]);
    }

    /**
     * get mission by id
     *
     * @param missionId
     * @return
     */
    @Override
    public Mission getMissionByMissionId(String missionId) throws MissionIdDoesNotExistException {
        Optional<Mission> optionalMission = missionDao.findById(missionId);
        if (optionalMission.isPresent()) {
            return optionalMission.get();
        } else {
            throw new MissionIdDoesNotExistException();
        }
    }

    /**
     * update the mission's credits
     *
     * @param missionId
     * @param credits
     */
    @Override
    public void updateMission(String missionId, int credits, MissionType missionType) throws SystemException {
        Mission mission = null;
        switch (missionType) {
            case IMAGE:
                mission = imageMissionDao.findImageMissionByMissionId(missionId);
                break;
            case TEXT:
                mission = textMissionDao.findTextMissionByMissionId(missionId);
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
    public void updateInstance(String instanceId, MissionFinalizeVo missionFinalizeVo, MissionType missionType) throws SystemException {
        Instance instance = null;
        Mission mission = null;
        switch (missionType) {
            case IMAGE:
                instance = imageInstanceDao.findImageInstanceByInstanceId(instanceId);
                String missionId = instance.getMissionId();
                mission = imageMissionDao.findImageMissionByMissionId(missionId);
                break;
            case TEXT:
                instance = textInstanceDao.findTextInstanceByInstanceId(instanceId);
                String missionId1 = instance.getMissionId();
                mission = textMissionDao.findTextMissionByMissionId(missionId1);
                break;
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
                break;
            case TEXT:
                if (textInstanceDao.save((TextInstance) instance) == null) {
                    throw new SystemException();
                }
                break;
        }
    }

    /**
     * get the latest mission's id
     *
     * @param missionType
     * @return
     */
    @Override
    public int getLatestMissionId(MissionType missionType) {

        return 0;
    }

    private ImageInstanceDetailVo generateImageInstanceDetailVo(ImageInstance imageInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(imageInstance.getInstanceId(), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(), imageInstance.getMissionId(), imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts);
        return new ImageInstanceDetailVo(imageInstance.getMissionType(), instanceVo, imageInstance.getImageResults());
    }

    private ImageInstanceVo generateImageInstanceVo(ImageInstance imageInstance, int completedCounts) {
        return new ImageInstanceVo(imageInstance.getInstanceId(), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(),
                imageInstance.getMissionInstanceState(), imageInstance.getMissionId(),
                imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts
        );
    }

    private TextInstanceDetailVo generateTextInstanceDetailVo(TextInstance textinstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(textinstance.getInstanceId(), textinstance.getExpRatio(), textinstance.getExp(), textinstance.getCredits(), textinstance.getComment(), textinstance.getWorkerUsername(), textinstance.getMissionInstanceState(), textinstance.getMissionId(), textinstance.getAcceptDate(), textinstance.getSubmitDate(), textinstance.isSubmitted(), completedCounts);
        return new TextInstanceDetailVo(textinstance.getMissionType(), instanceVo, textinstance.getTextResults());
    }

    private TextInstanceVo generateTextInstanceVo(Instance instance, int completedCounts) {
        return new TextInstanceVo(instance.getInstanceId(), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
                instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
                instance.isSubmitted(), completedCounts);
    }

    private <T extends Mission> String getNextId(List<T> missions, MissionType missionType) {
        int result = 0;
        Optional<T> maxId = missions.stream().max((x1, x2) -> (MissionUtil.getId(x1.getMissionId()) - MissionUtil.getId(x2.getMissionId())));
        if (maxId.isPresent()) {
            result = MissionUtil.getId(maxId.get().getMissionId()) + 1;
        }
        return MissionUtil.addTypeToId(result, missionType);
    }


}
