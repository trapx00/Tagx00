package trapx00.tagx00.bl.upload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.blservice.upload.MissionUploadBlService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.dataservice.upload.ImageDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.response.upload.UploadMissionImageResponse;

import java.io.IOException;
import java.util.List;


@Service
public class MissionUploadBlServiceImpl implements MissionUploadBlService {

    private final ImageDataService imageDataService;
    private final RequesterMissionDataService requesterMissionDataService;

    @Autowired
    public MissionUploadBlServiceImpl(ImageDataService imageDataService, RequesterMissionDataService requesterMissionDataService) {
        this.imageDataService = imageDataService;
        this.requesterMissionDataService = requesterMissionDataService;
    }

    /**
     * Upload the image of the mission
     *
     * @param missionId
     * @param multipartFile
     * @param order
     * @param isCover
     * @return the url of the image
     */
    @Override
    public UploadMissionImageResponse uploadFiles(int missionId, MultipartFile multipartFile, int order, boolean isCover) throws SystemException, MissionIdDoesNotExistException {
        try {
            Mission mission = requesterMissionDataService.getMissionByMissionId(missionId);
            if (mission != null) {
                if (mission.getMissionType().equals(MissionType.IMAGE)) {
                    Mission imageMission = mission;
                    String url = imageDataService.uploadImage(generateImageKey(missionId, order, isCover), multipartFile.getBytes());
                    List<String> urls = imageMission.getImageUrls();
                    if (isCover) {
                        mission.setCoverUrl(url);
                    } else {
                        urls.add(url);
                        mission.setImageUrls(urls);
                    }
                    requesterMissionDataService.saveMission(mission);
                    return new UploadMissionImageResponse(url);
                }

            } else {
                throw new MissionIdDoesNotExistException();
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new SystemException();
        }
        return null;
    }

    private String generateImageKey(int missionId, int order, boolean isCover) {
        if (isCover) {
            return "image_cover" + missionId;
        } else {
            return "image_" + missionId + "_" + order;
        }
    }
}
