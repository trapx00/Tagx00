package trapx00.tagx00.ml;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.datacollect.DataObject;
import trapx00.tagx00.entity.mission.MissionAsset;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.mlservice.PythonService;
import trapx00.tagx00.parameters.ExtractKeyParameter;
import trapx00.tagx00.publicdatas.mission.TagTuple;
import trapx00.tagx00.publicdatas.mission.image.whole.ImageWholeJob;
import trapx00.tagx00.util.PathUtil;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.ml.KeysVo;
import trapx00.tagx00.vo.ml.RecommendTagsVo;
import trapx00.tagx00.vo.ml.WordsVo;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class PythonServiceImpl implements PythonService {
    @Value("${ml.address}")
    private String mlAddress;
    @Value("${ml.apiExtractKey}")
    private String apiExtractKey;
    @Value("${ml.apiSeparateSentence}")
    private String apiSeparateSentence;
    @Value("${ml.apiGetRecommend}")
    private String apiGetRecommend;
    @Value("${ml.apiTrainRecommend}")
    private String apiTrainRecommend;

    private final ImageInstanceDao imageInstanceDao;

    @Autowired
    public PythonServiceImpl(ImageInstanceDao imageInstanceDao) {
        this.imageInstanceDao = imageInstanceDao;
    }

    @Override
    public KeysVo extractKey(String content) throws SystemException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<ExtractKeyParameter> entity = new HttpEntity<>(new ExtractKeyParameter(content), headers);
        String url = mlAddress + apiExtractKey;
        ResponseEntity<KeysVo> keysVoResponseEntity = restTemplate.exchange(url, HttpMethod.POST, entity, KeysVo.class);

        if (keysVoResponseEntity.getStatusCode() == HttpStatus.OK) {
            return keysVoResponseEntity.getBody();
        } else {
            throw new SystemException();
        }
    }

    @Override
    public RecommendTagsVo getRecommendTag(RecommendTagsVo recommendTagsVo) throws SystemException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<RecommendTagsVo> entity = new HttpEntity<>(recommendTagsVo, headers);
        String url = mlAddress + apiGetRecommend;
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            Gson g = new Gson();
            return g.fromJson(responseEntity.getBody(), RecommendTagsVo.class);
        } else {
            throw new SystemException();
        }
    }

    @Override
    public void trainRecommend(ImageInstanceDetailVo imageInstanceDetailVo) throws IOException, ClassNotFoundException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        List<DataObject> dataObjects = new ArrayList<>();
        ImageInstance imageInstanceWithResults = getImageInstance(imageInstanceDetailVo.getInstance().getInstanceId());
        List<MissionAsset> missionAssets = imageInstanceWithResults.getImageMission().getMissionAssets();
        for (int i = 0; i < missionAssets.size(); i++) {
            List<TagTuple> tagTuples = ((ImageWholeJob) imageInstanceWithResults.getImageResults().get(i).getImageJob()).getTuple().getTagTuples();
            List<String> tags = tagTuples.stream().collect(ArrayList::new, (list, tagTuple) -> list.add(tagTuple.getTag()), ArrayList::addAll);
            DataObject dataObject = new DataObject(missionAssets.get(i).getUrl(), tags, missionAssets.get(i).getTagConfTuple());
            dataObjects.add(dataObject);
        }
        HttpEntity<List<DataObject>> entity = new HttpEntity<>(dataObjects, headers);
        String url = mlAddress + apiTrainRecommend;
        restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
    }

    @Override
    public List<String> separateSentence(String content) throws SystemException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(content, headers);
        String url = mlAddress + apiSeparateSentence;
        ResponseEntity<WordsVo> wordsVoResponseEntity = restTemplate.exchange(url, HttpMethod.POST, entity, WordsVo.class);

        if (wordsVoResponseEntity.getStatusCode() == HttpStatus.OK) {
            return wordsVoResponseEntity.getBody().getWords();
        } else {
            throw new SystemException();
        }
    }

    private ImageInstance getImageInstance(String instanceId) throws IOException, ClassNotFoundException {
        return getImageInstance(instanceId, imageInstanceDao.findImageInstanceByInstanceId(instanceId));
    }

    private static ImageInstance getImageInstance(String instanceId, ImageInstance imageInstanceByInstanceId) throws IOException, ClassNotFoundException {
        ImageInstance imageInstance = imageInstanceByInstanceId;
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "image_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<ImageResult> imageResults = (List<ImageResult>) in.readObject();
        in.close();
        fileIn.close();
        imageInstance.setImageResults(imageResults);
        return imageInstance;
    }
}
