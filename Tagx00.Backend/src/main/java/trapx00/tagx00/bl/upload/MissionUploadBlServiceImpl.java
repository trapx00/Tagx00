package trapx00.tagx00.bl.upload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.blservice.mission.WorkerMissionBlService;
import trapx00.tagx00.blservice.upload.MissionUploadBlService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.dataservice.upload.*;
import trapx00.tagx00.entity.mission.*;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.mlservice.PythonService;
import trapx00.tagx00.response.upload.*;
import trapx00.tagx00.util.Converter;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.util.PathUtil;

import javax.imageio.stream.FileImageOutputStream;
import javax.sql.rowset.serial.SerialBlob;
import java.io.*;
import java.sql.SQLException;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;


@Service
public class MissionUploadBlServiceImpl implements MissionUploadBlService {

    private final ImageDataService imageDataService;
    private final TextDataService textDataService;
    private final VideoDataService videoDataService;
    private final AudioDataService audioDataService;
    private final ThreeDimensionDataService threeDimensionDataService;
    private final RequesterMissionDataService requesterMissionDataService;
    private final WorkerMissionBlService workerMissionBlService;
    private final PythonService pythonService;
    private final static java.lang.String TEMP_PATH = PathUtil.getTmpPath();

    @Autowired
    public MissionUploadBlServiceImpl(ImageDataService imageDataService, TextDataService textDataService,
                                      RequesterMissionDataService requesterMissionDataService, WorkerMissionBlService workerMissionBlService
            , VideoDataService videoDataService, AudioDataService audioDataService, ThreeDimensionDataService threeDimensionDataService, PythonService pythonService) {
        this.imageDataService = imageDataService;
        this.textDataService = textDataService;
        this.requesterMissionDataService = requesterMissionDataService;
        this.workerMissionBlService = workerMissionBlService;
        this.videoDataService = videoDataService;
        this.audioDataService = audioDataService;
        this.threeDimensionDataService = threeDimensionDataService;
        this.pythonService = pythonService;
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
    public UploadMissionImageResponse uploadImage(java.lang.String missionId, MultipartFile multipartFile, int order, boolean isCover) throws SystemException, MissionIdDoesNotExistException {
        try {
            switch (MissionUtil.getType(missionId)) {
                case TEXT:
                    TextMission textMission = (TextMission) requesterMissionDataService.getMissionByMissionId(missionId);
                    java.lang.String url = imageDataService.uploadImage(generateImageKey(missionId, order, isCover), multipartFile.getBytes());
                    if (isCover) {
                        textMission.setCoverUrl(url);
                    }
                    requesterMissionDataService.updateMission(textMission);
                    return new UploadMissionImageResponse(url);
                case IMAGE:
                    ImageMission imageMission = (ImageMission) requesterMissionDataService.getMissionByMissionId(missionId);
                    url = imageDataService.uploadImage(generateImageKey(missionId, order, isCover), multipartFile.getBytes());
                    List<MissionAsset> missionAssets = new ArrayList<>(imageMission.getMissionAssets());
                    if (isCover) {
                        imageMission.setCoverUrl(url);
                    } else {
                        Map<java.lang.String, Double> tagConfTuple = new HashMap<>();
                        if (imageMission.isAllowCustomTag()) {
                            Map<String, Double> apiTagConfTuple = workerMissionBlService.identifyImage(multipartFile).getObjects();
                            apiTagConfTuple.forEach((key, value) -> {
                                tagConfTuple.put(key, value * 0.01);
                            });
                        }
                        missionAssets.add(new MissionAsset(url, Converter.MapToTagConfTupleList(tagConfTuple), imageMission));
                    }
                    imageMission.setMissionAssets(missionAssets);
                    requesterMissionDataService.updateMission(imageMission);
                    return new UploadMissionImageResponse(url);
                case THREE_DIMENSION:
                    ThreeDimensionMission threeDimensionMission = (ThreeDimensionMission) requesterMissionDataService.getMissionByMissionId(missionId);
                    java.lang.String url1 = imageDataService.uploadImage(generateImageKey(missionId, order, isCover), multipartFile.getBytes());
                    if (isCover) {
                        threeDimensionMission.setCoverUrl(url1);
                    }
                    requesterMissionDataService.updateMission(threeDimensionMission);
                    return new UploadMissionImageResponse(url1);
                case VIDEO:
                    VideoMission videoMission = (VideoMission) requesterMissionDataService.getMissionByMissionId(missionId);
                    java.lang.String url2 = imageDataService.uploadImage(generateImageKey(missionId, order, isCover), multipartFile.getBytes());
                    if (isCover) {
                        videoMission.setCoverUrl(url2);
                    }
                    requesterMissionDataService.updateMission(videoMission);
                    return new UploadMissionImageResponse(url2);
                case AUDIO:
                    AudioMission audioMission = (AudioMission) requesterMissionDataService.getMissionByMissionId(missionId);
                    java.lang.String url3 = imageDataService.uploadImage(generateImageKey(missionId, order, isCover), multipartFile.getBytes());
                    if (isCover) {
                        audioMission.setCoverUrl(url3);
                    }
                    requesterMissionDataService.updateMission(audioMission);
                    return new UploadMissionImageResponse(url3);
            }
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new SystemException();
        }
        return null;
    }

    /**
     * Upload the text of the mission
     *
     * @param missionId
     * @param multipartFile
     * @return the urls of the texts
     */
    @Override
    public UploadMissionTextResponse uploadText(java.lang.String missionId, MultipartFile multipartFile) throws SystemException, MissionIdDoesNotExistException {
        //保存到临时文件
        try {
            TextMission textMission = (TextMission) requesterMissionDataService.getMissionByMissionId(missionId);
            List<TextToken> textTokens = new ArrayList<>();

            String id = missionId + "-" + multipartFile.getName();

            File file = new File(TEMP_PATH + "/" + id);
            FileImageOutputStream fileWriter = new FileImageOutputStream(file);
            fileWriter.write(multipartFile.getBytes());
            fileWriter.close();

            java.lang.String descDir = TEMP_PATH + "/" + id + "zip";
            File pathFile = new File(descDir);
            if (!pathFile.exists()) {
                pathFile.mkdirs();
            } else {
                pathFile.delete();
                pathFile.mkdirs();
            }
            ZipFile zip = new ZipFile(file);
            int index = 0;
            for (Enumeration entries = zip.entries(); entries.hasMoreElements(); ) {
                ZipEntry entry = (ZipEntry) entries.nextElement();
                java.lang.String zipEntryName = entry.getName();
                InputStream in = zip.getInputStream(entry);
                java.lang.String outPath = (descDir + "/" + zipEntryName).replaceAll("\\*", "/");

                //判断路径是否存在,不存在则创建文件路径
                file = new File(outPath.substring(0, outPath.lastIndexOf('/')));
                if (!file.exists()) {
                    file.mkdirs();
                }
                //判断文件全路径是否为文件夹,如果是上面已经上传,不需要解压
                if (new File(outPath).isDirectory()) {
                    continue;
                }
                //输出文件路径信息
                System.out.println(outPath);

                OutputStream out = new FileOutputStream(outPath);
                byte[] buf1 = new byte[1024];
                int len;
                while ((len = in.read(buf1)) > 0) {
                    out.write(buf1, 0, len);
                }
                in.close();
                out.close();

                StringBuilder result = new StringBuilder();
                BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(outPath), "UTF-8"));
                String line;
                while ((line = br.readLine()) != null) {
                    result.append(line);
                }
                br.close();
                List<String> words = pythonService.separateSentence(new String(result));
                String url = generateTextKey(missionId, index);
                textTokens.add(new TextToken(url, new SerialBlob(new String(result).getBytes("GBK")), words, textMission));

                index++;
            }
            textMission.setTextTokens(new HashSet<>(textTokens));
            requesterMissionDataService.updateMission(textMission);
            System.out.println("******************解压完毕********************");
            return new UploadMissionTextResponse("success");
        } catch (IOException | ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    /**
     * Upload the video of the mission
     *
     * @param missionId
     * @param multipartFile
     * @return the urls of the videos
     */
    @Override
    public UploadMissionVideoResponse uploadVideo(java.lang.String missionId, MultipartFile multipartFile, int order) throws SystemException, MissionIdDoesNotExistException {
        try {
            //非压缩
            VideoMission videoMission = (VideoMission) requesterMissionDataService.getMissionByMissionId(missionId);
            String url = videoDataService.uploadVideo(generateVideoKey(missionId, order), multipartFile.getBytes());
            List<String> urls = videoMission.getVideoUrls();
            urls.add(url);
            videoMission.setVideoUrls(urls);
            requesterMissionDataService.updateMission(videoMission);
            return new UploadMissionVideoResponse(url);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    /**
     * Upload the audio of the mission
     *
     * @param missionId
     * @param multipartFile
     * @return the urls of the audios
     */
    @Override
    public UploadMissionAudioResponse uploadAudio(java.lang.String missionId, MultipartFile multipartFile, int order) throws SystemException, MissionIdDoesNotExistException {
        try {
            //非压缩
            AudioMission audioMission = (AudioMission) requesterMissionDataService.getMissionByMissionId(missionId);
            String url = audioDataService.uploadAudio(generateAudioKey(missionId, order), multipartFile.getBytes());
            List<String> urls = audioMission.getAudioUrls();
            urls.add(url);
            audioMission.setAudioUrls(urls);
            requesterMissionDataService.updateMission(audioMission);
            return new UploadMissionAudioResponse(url);

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    /**
     * Upload the 3d of the mission
     *
     * @param missionId
     * @param
     * @return the urls of the 3ds
     */
    @Override
    public UploadMissionThreeDimensionResponse uploadThreeDimension(String missionId, MultipartFile mtl, MultipartFile obj, int order) throws SystemException, MissionIdDoesNotExistException {
        //1.obj, 1.mtl, 2.obj, 2.mtl……的顺序上传。同一个模型的两个文件名字相同，order相同
        try {
            //非压缩
            ThreeDimensionMission threeDimensionMission = (ThreeDimensionMission) requesterMissionDataService.getMissionByMissionId(missionId);
            String token = threeDimensionDataService.upload3d(generateThreeDimensionKey(missionId, order), mtl.getBytes(), obj.getBytes());
            List<String> tokentemp = threeDimensionMission.getTokens();
            tokentemp.add(token);
            threeDimensionMission.setTokens(tokentemp);
            requesterMissionDataService.updateMission(threeDimensionMission);
            return new UploadMissionThreeDimensionResponse("success");

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    private java.lang.String generateImageKey(java.lang.String missionId, int order, boolean isCover) {
        if (isCover) {
            return "image_cover" + missionId;
        } else {
            return "image_" + missionId + "_" + order;
        }
    }

    private java.lang.String generateTextKey(java.lang.String missionId, int order) {
        return "text_" + missionId + "_" + order;
    }

    private java.lang.String generateVideoKey(java.lang.String missionId, int order) {
        return "video_" + missionId + "_" + order;
    }

    private java.lang.String generateAudioKey(java.lang.String missionId, int order) {
        return "audio_" + missionId + "_" + order;
    }

    private java.lang.String generateThreeDimensionKey(java.lang.String missionId, int order) {
        return "threeDimension_" + missionId + "_" + order;
    }


}
