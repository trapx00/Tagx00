package trapx00.tagx00.data.upload;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import trapx00.tagx00.dataservice.upload.VideoDataService;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.util.PathUtil;

import java.io.File;
import java.io.FileOutputStream;

@Service
public class VideoDataServiceImpl implements VideoDataService {
    private final static String TEMP_PATH = PathUtil.getTmpPath();
    private static final long EXPIRATION = Long.MAX_VALUE;

    @Value("${oos.accessKey}")
    private String accessKey;
    @Value("${oos.secretKey}")
    private String secretKey;
    @Value("${oos.endPoint}")
    private String endPoint;
    @Value("${oos.bucketName}")
    private String bucketName;

    /**
     * upload the video to the oos cloud
     *
     * @param key   the id of the image
     * @param bytes the image content
     * @return the url of the uploaded image
     */
    @Override
    public String uploadVideo(String key, byte[] bytes) throws SystemException {
        try {
            File dir = new File(PathUtil.getStaticPath() + "video");
            System.out.println(dir.getAbsolutePath());
            if (!dir.exists()) {
                dir.mkdirs();
            }
            String fileLocation = dir.getAbsolutePath() + "/video/" + key;
            FileOutputStream fos = new FileOutputStream(fileLocation);
            fos.write(bytes);
            fos.close();

            String url = PathUtil.getResourceUrl("video/" + key);
            return url;
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }


    /**
     * delete the video
     *
     * @param key the id of the video
     */
    @Override
    public void deleteVideo(String key) {
        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        AmazonS3 oos = new AmazonS3Client(credentials);
        oos.setEndpoint(endPoint);
        oos.deleteObject(bucketName, key);
    }
}
