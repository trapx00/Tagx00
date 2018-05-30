package trapx00.tagx00.data.mission;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Encoder;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.dao.mission.TextMissionDao;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.data.dao.mission.instance.TextInstanceDao;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.TextMission;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.entity.mission.instance.TextInstance;
import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.entity.mission.instance.workresult.TextResult;
import trapx00.tagx00.exception.viewexception.MissionAlreadyAcceptedException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.util.ApiUtil;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.util.PathUtil;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.image.ImageInstanceVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.text.TextInstanceDetailVo;
import trapx00.tagx00.vo.mission.text.TextInstanceVo;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkerMissionDataServiceImpl implements WorkerMissionDataService {
    @Value("${aliyun.akId}")
    private String akId;
    @Value("${aliyun.akSecret}")
    private String akSecret;
    @Value("${aliyun.imageHostUrl}")
    private String imageHostUrl;
    private final ImageInstanceDao imageInstanceDao;
    private final ImageMissionDao imageMissionDao;
    private final TextInstanceDao textInstanceDao;
    private final TextMissionDao textMissionDao;

    @Autowired
    public WorkerMissionDataServiceImpl(ImageInstanceDao imageInstanceDao, ImageMissionDao imageMissionDao,
                                        TextMissionDao textMissionDao, TextInstanceDao textInstanceDao) {
        this.imageInstanceDao = imageInstanceDao;
        this.imageMissionDao = imageMissionDao;
        this.textInstanceDao = textInstanceDao;
        this.textMissionDao = textMissionDao;
    }

    /**
     * update the progress of the instance.
     *
     * @param
     */
    @Override
    public String updateInstanceDetailVo(InstanceDetailVo instanceDetailVo) throws SystemException, IOException {
        MissionType missionType = instanceDetailVo.getMissionType();
        InstanceVo instanceVo = instanceDetailVo.getInstance();
        Instance result = null;

        switch (missionType) {
            case IMAGE:
                ImageInstanceDetailVo imageInstanceDetailVo = (ImageInstanceDetailVo) instanceDetailVo;
                ImageInstance imageInstance = generateImageInstance(instanceVo, imageInstanceDetailVo);
                result = saveImageInstance(imageInstance);
                break;
            case TEXT:
                TextInstanceDetailVo textInstanceDetailVo = (TextInstanceDetailVo) instanceDetailVo;
                TextInstance textInstance = generateTextInstance(instanceVo, textInstanceDetailVo);
                result = saveTextInstance(textInstance);
        }
        if (result == null)
            throw new SystemException();
        return result.getInstanceId();
    }

    /**
     * save the progress of the instance.
     * update instance
     * also use to abort the instance
     *
     * @param instanceDetailVo
     */
    @Override
    public String saveInstanceDetailVo(InstanceDetailVo instanceDetailVo) throws SystemException, MissionAlreadyAcceptedException, IOException {
        MissionType missionType = instanceDetailVo.getMissionType();
        InstanceVo instanceVo = instanceDetailVo.getInstance();
        Instance result = null;

        switch (missionType) {
            case IMAGE:
                ImageInstanceDetailVo imageInstanceDetailVo = (ImageInstanceDetailVo) instanceDetailVo;
                ImageInstance imageInstance = generateImageInstance(instanceVo, imageInstanceDetailVo);
                imageInstance.setInstanceId(getNextId(imageInstanceDao.findAll(), MissionType.IMAGE));
                result = saveImageInstance(imageInstance);
                break;
            case TEXT:
                TextInstanceDetailVo textInstanceDetailVo = (TextInstanceDetailVo) instanceDetailVo;
                TextInstance textInstance = generateTextInstance(instanceVo, textInstanceDetailVo);
                textInstance.setInstanceId(getNextId(textInstanceDao.findAll(), MissionType.TEXT));
                result = saveTextInstance(textInstance);
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
    public int abortInstance(String instanceId, MissionType missionType) throws IOException {
        switch (missionType) {
            case IMAGE:
                ImageInstance imageInstance = imageInstanceDao.findImageInstanceByInstanceId(instanceId);
                imageInstance.setMissionInstanceState(MissionInstanceState.ABANDONED);
                saveImageInstance(imageInstance);
                break;
            case TEXT:
                TextInstance textInstance = textInstanceDao.findTextInstanceByInstanceId(instanceId);
                textInstance.setMissionInstanceState(MissionInstanceState.ABANDONED);
                saveTextInstance(textInstance);
                break;
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

        //获得每个种类的instance列表
        ArrayList<Instance> instances = new ArrayList<>(imageInstanceDao.findImageInstancesByWorkerUsername(workerUsername));
        instances.addAll(textInstanceDao.findTextInstancesByWorkerUsername(workerUsername));

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
                    instanceVos[i] = generateImageInstanceVo(instance, instanceResultIdsSize);
                    break;
                case TEXT:
                    List<TextResult> textResults = ((TextInstance) instance).getTextResults();
                    for (TextResult textResult : textResults) {
                        if (textResult.isDone()) {
                            instanceResultIdsSize++;
                        }
                    }
                    instanceVos[i] = generateTextInstanceVo(instance, instanceResultIdsSize);
                    break;
            }

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
    public InstanceDetailVo getInstanceDetailVoByUsernameAndMissionId(String workerUsername, String missionId, MissionType missionType) throws IOException, ClassNotFoundException {

        //获得每个种类的instance列表
        ArrayList<Instance> instances = new ArrayList<>(imageInstanceDao.findImageInstancesByWorkerUsername(workerUsername));
        instances.addAll(textInstanceDao.findTextInstancesByWorkerUsername(workerUsername));

        for (Instance instance1 : instances) {
            if (instance1.getMissionId().equals(missionId) && instance1.getMissionType() == missionType) {
                int instanceResultIdsSize = 0;
                switch (instance1.getMissionType()) {
                    case IMAGE:
                        ImageInstance imageInstance = getImageInstance(instance1.getInstanceId());
                        List<ImageResult> imageResults = imageInstance.getImageResults();
                        for (ImageResult imageResult : imageResults) {
                            if (imageResult.isDone()) {
                                instanceResultIdsSize++;
                            }
                        }
                        return generateImageInstanceDetailVo(imageInstance, instanceResultIdsSize);
                    case TEXT:
                        TextInstance textInstance = getTextInstance(instance1.getInstanceId());
                        List<TextResult> textResults = textInstance.getTextResults();
                        for (TextResult textResult : textResults) {
                            if (textResult.isDone())
                                instanceResultIdsSize++;
                        }
                        return generateTextInstanceDetailVo(textInstance, instanceResultIdsSize);
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
    public Instance getInstanceByUsernameAndMissionId(String workerUsername, String missionId, MissionType missionType) {

        //获得每个种类的instance列表
        ArrayList<Instance> instances = new ArrayList<>(imageInstanceDao.findImageInstancesByWorkerUsername(workerUsername));
        instances.addAll(textInstanceDao.findTextInstancesByWorkerUsername(workerUsername));

        for (Instance instance1 : instances) {
            if (instance1.getMissionId().equals(missionId) && instance1.getMissionType() == missionType)
                return instance1;
        }
        return null;
    }

    @Override
    public boolean deleteInstanceByMissionIdAndUsername(String missionId, String username, MissionType missionType) throws IOException, ClassNotFoundException {
        InstanceDetailVo instanceDetailVo = this.getInstanceDetailVoByUsernameAndMissionId(username, missionId, missionType);
        switch (instanceDetailVo.getMissionType()) {
            case IMAGE:
                imageInstanceDao.deleteById(instanceDetailVo.getInstance().getInstanceId());
                break;
            case TEXT:
                textInstanceDao.deleteById(instanceDetailVo.getInstance().getInstanceId());
        }
        return true;
    }

    /**
     * identify the image
     *
     * @param bytes
     * @return
     */
    @Override
    public JSONArray identifyImage(byte[] bytes) throws SystemException {
        BASE64Encoder base64Encoder = new BASE64Encoder();
        String bodys = "{\"type\":1," +
                "\"content\":\"" + base64Encoder.encode(bytes) + "\"}";
        try {
            return (JSONArray) JSONObject.fromObject(ApiUtil.sendPost(imageHostUrl, bodys, akId, akSecret)).get("tags");
        } catch (IOException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    private ImageInstance generateImageInstance(InstanceVo instanceVo, ImageInstanceDetailVo instanceDetailVo) {
        ImageMission imageMission = imageMissionDao.findImageMissionByMissionId(instanceVo.getMissionId());
        List<ImageResult> imageResults = instanceDetailVo.getImageResults() == null ? new ArrayList<>() : instanceDetailVo.getImageResults();
        return new ImageInstance(instanceVo.getInstanceId(), instanceVo.getWorkerUsername(),
                instanceVo.getMissionInstanceState(), MissionType.IMAGE,
                instanceVo.getAcceptDate(), instanceVo.getSubmitDate(),
                instanceVo.isSubmitted(), instanceVo.getMissionId(), instanceVo.getExp(),
                instanceVo.getExpRatio(), instanceVo.getCredits(), instanceVo.getComment(), imageResults, imageMission);
    }

    private TextInstance generateTextInstance(InstanceVo instanceVo, TextInstanceDetailVo instanceDetailVo) {
        TextMission textMission = textMissionDao.findTextMissionByMissionId(instanceVo.getMissionId());
        List<TextResult> textResults = instanceDetailVo.getTextResults() == null ? new ArrayList<>() : instanceDetailVo.getTextResults();
        return new TextInstance(instanceVo.getInstanceId(), instanceVo.getWorkerUsername(), instanceVo.getMissionInstanceState(),
                MissionType.TEXT, instanceVo.getAcceptDate(), instanceVo.getSubmitDate(),
                instanceVo.isSubmitted(), instanceVo.getMissionId(), instanceVo.getExp(),
                instanceVo.getExpRatio(), instanceVo.getCredits(), instanceVo.getComment(),
                textResults, textMission);
    }

    private ImageInstanceVo generateImageInstanceVo(Instance instance, int completedCounts) {
        return new ImageInstanceVo(instance.getInstanceId(), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
                instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
                instance.isSubmitted(), completedCounts);
    }

    private TextInstanceVo generateTextInstanceVo(Instance instance, int completedCounts) {
        return new TextInstanceVo(instance.getInstanceId(), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
                instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
                instance.isSubmitted(), completedCounts);
    }

    private ImageInstanceDetailVo generateImageInstanceDetailVo(ImageInstance imageInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(imageInstance.getInstanceId(), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(), imageInstance.getMissionId(), imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts);
        return new ImageInstanceDetailVo(imageInstance.getMissionType(), instanceVo, imageInstance.getImageResults());
    }

    private TextInstanceDetailVo generateTextInstanceDetailVo(TextInstance textinstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(textinstance.getInstanceId(), textinstance.getExpRatio(), textinstance.getExp(), textinstance.getCredits(), textinstance.getComment(), textinstance.getWorkerUsername(), textinstance.getMissionInstanceState(), textinstance.getMissionId(), textinstance.getAcceptDate(), textinstance.getSubmitDate(), textinstance.isSubmitted(), completedCounts);
        return new TextInstanceDetailVo(textinstance.getMissionType(), instanceVo, textinstance.getTextResults());
    }

    private <T extends Instance> String getNextId(List<T> instances, MissionType missionType) {
        int result = 0;
        Optional<T> maxId = instances.stream().max((x1, x2) -> (MissionUtil.getId(x1.getMissionId()) - MissionUtil.getId(x2.getMissionId())));
        if (maxId.isPresent()) {
            result = MissionUtil.getId(maxId.get().getInstanceId()) + 1;
        }
        return MissionUtil.addTypeToId(result, missionType);
    }

    private TextInstance saveTextInstance(TextInstance textInstance) throws IOException {
        TextInstance result = textInstanceDao.save(textInstance);
        FileOutputStream fileOut = new FileOutputStream(PathUtil.getSerPath() + "text_instance" + "_" + textInstance.getInstanceId());
        ObjectOutputStream out = new ObjectOutputStream(fileOut);
        out.writeObject(textInstance.getTextResults());
        out.close();
        fileOut.close();
        return result;
    }

    private ImageInstance saveImageInstance(ImageInstance imageInstance) throws IOException {
        ImageInstance result = imageInstanceDao.save(imageInstance);
        FileOutputStream fileOut = new FileOutputStream(PathUtil.getSerPath() + "image_instance" + "_" + imageInstance.getInstanceId());
        ObjectOutputStream out = new ObjectOutputStream(fileOut);
        out.writeObject(imageInstance.getImageResults());
        out.close();
        fileOut.close();
        return result;
    }

    private TextInstance getTextInstance(String instanceId) throws IOException, ClassNotFoundException {
        TextInstance textInstance = textInstanceDao.findTextInstanceByInstanceId(instanceId);
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "text_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<TextResult> textResults = (List<TextResult>) in.readObject();
        in.close();
        fileIn.close();
        textInstance.setTextResults(textResults);
        return textInstance;
    }

    private ImageInstance getImageInstance(String instanceId) throws IOException, ClassNotFoundException {
        ImageInstance imageInstance = imageInstanceDao.findImageInstanceByInstanceId(instanceId);
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "image_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<ImageResult> imageResults = (List<ImageResult>) in.readObject();
        in.close();
        fileIn.close();
        imageInstance.setImageResults(imageResults);
        return imageInstance;
    }

}
