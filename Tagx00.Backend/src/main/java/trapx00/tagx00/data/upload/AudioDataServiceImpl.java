package trapx00.tagx00.data.upload;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import trapx00.tagx00.dataservice.upload.AudioDataService;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.util.PathUtil;

import javax.imageio.stream.FileImageOutputStream;
import java.io.File;
import java.net.URL;
import java.util.Date;

@Service
public class AudioDataServiceImpl implements AudioDataService{


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
     * upload the image to the oos cloud
     *
     * @param key   the id of the image
     * @param bytes the image content
     * @return the url of the uploaded image
     */
    @Override
    public String uploadAudio(String key, byte[] bytes) throws SystemException {
        try {
            //保存到临时文件
            File file = new File(TEMP_PATH + "/audio");
            FileImageOutputStream fileWriter = new FileImageOutputStream(file);
            fileWriter.write(bytes);
            fileWriter.close();

            //上传文件
            AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
            AmazonS3 oos = new AmazonS3Client(credentials);
            oos.setEndpoint(endPoint);
            oos.putObject(bucketName, key, file);

            //生成共享地址
            GeneratePresignedUrlRequest generatePresignedUrlRequest =
                    new GeneratePresignedUrlRequest(bucketName, key);
            generatePresignedUrlRequest.setExpiration(new Date(EXPIRATION));
            URL url = oos.generatePresignedUrl(generatePresignedUrlRequest);
            return url.toURI().toString();
        } catch (Exception e) {
            throw new SystemException();
        }
    }



    /**
     * delete the audio
     *
     * @param key the id of the audio
     */
    @Override
    public void deleteAudio(String key) {
        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        AmazonS3 oos = new AmazonS3Client(credentials);
        oos.setEndpoint(endPoint);
        oos.deleteObject(bucketName, key);
    }
}
