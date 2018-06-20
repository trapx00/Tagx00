package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.instance.*;
import trapx00.tagx00.entity.mission.instance.*;
import trapx00.tagx00.entity.mission.instance.workresult.*;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.mlservice.PythonService;
import trapx00.tagx00.util.PathUtil;

import javax.rmi.CORBA.Util;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class InstanceService {


    private final ImageInstanceDao imageInstanceDao;
    private final TextInstanceDao textInstanceDao;
    private final AudioInstanceDao audioInstanceDao;
    private final VideoInstanceDao videoInstanceDao;
    private final ThreeDimensionInstanceDao threeDimensionInstanceDao;
    private final PythonService pythonService;

    @Autowired
    public InstanceService(ImageInstanceDao imageInstanceDao, TextInstanceDao textInstanceDao, AudioInstanceDao audioInstanceDao, VideoInstanceDao videoInstanceDao, ThreeDimensionInstanceDao threeDimensionInstanceDao, PythonService pythonService) {
        this.imageInstanceDao = imageInstanceDao;
        this.textInstanceDao = textInstanceDao;
        this.audioInstanceDao = audioInstanceDao;
        this.videoInstanceDao = videoInstanceDao;
        this.threeDimensionInstanceDao = threeDimensionInstanceDao;
        this.pythonService = pythonService;
    }

    public TextInstance getTextInstance(String instanceId) throws IOException, ClassNotFoundException {
        TextInstance textInstance = textInstanceDao.findTextInstanceByInstanceId(instanceId);
        try {
            FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "text_instance" + "_" + instanceId);
            ObjectInputStream in = new ObjectInputStream(fileIn);
            List<TextResult> textResults = (List<TextResult>) in.readObject();
            in.close();
            fileIn.close();
            textInstance.setTextResults(textResults);
        } catch (IOException e) {
            System.out.println("Results for " + instanceId + "not found. Returns empty list.");
            textInstance.setTextResults(new ArrayList<>());
        }
        return textInstance;

    }

    public ImageInstance getImageInstance(String instanceId) throws IOException, ClassNotFoundException, SystemException {
        ImageInstance imageInstance = imageInstanceDao.findImageInstanceByInstanceId(instanceId);
        try {
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "image_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<ImageResult> imageResults = (List<ImageResult>) in.readObject();
        in.close();
        fileIn.close();
        imageInstance.setImageResults(imageResults);

//        ImageMission imageMission = imageInstance.getImageMission();
//        List<MissionAsset> missionAssets = new ArrayList<>(imageMission.getMissionAssets());
//        List<RecommendTagItem> recommendTagItems = new ArrayList<>();
//        for (int i = 0; i < missionAssets.size(); i++) {
//            recommendTagItems.add(new RecommendTagItem(missionAssets.get(i).getTagConfTuple()));
//        }
//        RecommendTagsVo recommendTagsVo = pythonService.getRecommendTag(new RecommendTagsVo(recommendTagItems));
//        List<RecommendTagItem> resultRecommendTagItemList = recommendTagsVo.getRecommendTagItemList();
//        for (int i = 0; i < missionAssets.size(); i++) {
//            MissionAsset missionAsset = missionAssets.get(i);
//            missionAsset.setTagConfTuple(resultRecommendTagItemList.get(i).getTagConfTuples());
//            missionAssets.set(i, missionAsset);
//        }
//
//        ImageMission returnImageMission = new ImageMission(imageMission.getMissionId(), imageMission.getTitle(), imageMission.getDescription(), imageMission.getTopics(), imageMission.getMissionState(), imageMission.getStart(), imageMission.getEnd(), imageMission.getCoverUrl(), imageMission.getRequesterUsername(), imageMission.getLevel(), imageMission.getCredits(), imageMission.getMinimalWorkerLevel(), imageMission.isAllowCustomTag(), imageMission.getAllowedTags(), missionAssets, imageMission.getImageMissionTypes(), imageMission.getImageInstances());
//        ImageInstance returnImageInstance = new ImageInstance(imageInstance.getInstanceId(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(), MissionType.IMAGE, imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), imageMission.getMissionId(), imageInstance.getExp(), imageInstance.getExpRatio(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getImageResults(), returnImageMission);
//        return returnImageInstance;
        } catch (IOException e) {
            System.out.println("Results for " + instanceId + "not found. Returns empty list.");
            imageInstance.setImageResults(new ArrayList<>());
        }
        return imageInstance;
    }

    public VideoInstance getVideoInstance(String instanceId) throws IOException, ClassNotFoundException {
        VideoInstance videoInstance = videoInstanceDao.findVideoInstanceByInstanceId(instanceId);
        try {
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "video_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<VideoResult> videoResults = (List<VideoResult>) in.readObject();
        in.close();
        fileIn.close();
        videoInstance.setVideoResults(videoResults);
        } catch (IOException e) {
            System.out.println("Results for " + instanceId + "not found. Returns empty list.");
            videoInstance.setVideoResults(new ArrayList<>());
        }
        return videoInstance;
    }

    public AudioInstance getAudioInstance(String instanceId) throws IOException, ClassNotFoundException {
        AudioInstance audioInstance = audioInstanceDao.findAudioInstanceByInstanceId(instanceId);
        try {
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "audio_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<AudioResult> audioResults = (List<AudioResult>) in.readObject();
        in.close();
        fileIn.close();
        audioInstance.setAudioResults(audioResults);
        } catch (IOException e) {
            System.out.println("Results for " + instanceId + "not found. Returns empty list.");
            audioInstance.setAudioResults(new ArrayList<>());
        }
        return audioInstance;
    }

    public ThreeDimensionInstance getThreeDimensionInstance(String instanceId) throws IOException, ClassNotFoundException {
        ThreeDimensionInstance threeDimensionInstance = threeDimensionInstanceDao.findThreeDimensionInstanceByInstanceId(instanceId);
        try {
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "threeDimension_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<ThreeDimensionResult> threeDimensionResults = (List<ThreeDimensionResult>) in.readObject();
        in.close();
        fileIn.close();
        threeDimensionInstance.setThreeDimensionResults(threeDimensionResults);
        } catch (IOException e) {
            System.out.println("Results for " + instanceId + "not found. Returns empty list.");
            threeDimensionInstance.setThreeDimensionResults(new ArrayList<>());
        }
        return threeDimensionInstance;
    }
}
