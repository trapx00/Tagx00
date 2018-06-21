package trapx00.tagx00.ml;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.AsyncRestTemplate;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.data.mission.InstanceService;
import trapx00.tagx00.datacollect.DataObject;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.MissionAsset;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.mlservice.PythonService;
import trapx00.tagx00.parameters.ExtractKeyParameter;
import trapx00.tagx00.parameters.SegmentWordParameter;
import trapx00.tagx00.publicdatas.mission.TagTuple;
import trapx00.tagx00.publicdatas.mission.image.whole.ImageWholeJob;
import trapx00.tagx00.response.mission.ImageIdentificationResponse;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.image.ImageMissionType;
import trapx00.tagx00.vo.ml.*;

import java.io.IOException;
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

    @Value("${ml.apiBaidu}")
    private String baiduApi;

    @Value("${ml.apiGetRecommend}")
    private String apiGetRecommend;
    @Value("${ml.apiTrainRecommend}")
    private String apiTrainRecommend;

    private final ImageInstanceDao imageInstanceDao;
    private final ImageMissionDao imageMissionDao;
    private final InstanceService instanceService;

    @Autowired
    public PythonServiceImpl(ImageInstanceDao imageInstanceDao, ImageMissionDao imageMissionDao, InstanceService instanceService) {
        this.imageInstanceDao = imageInstanceDao;
        this.imageMissionDao = imageMissionDao;
        this.instanceService = instanceService;
    }

    @Override
    public KeysVo extractKey(String content) throws SystemException {
        RestTemplate restTemplate = new RestTemplate();


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
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
    public RecommendTagsVo getRecommendTag(RecommendRequestVo request) throws SystemException {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        HttpEntity<RecommendRequestVo> entity = new HttpEntity<>(request, headers);
        String url = mlAddress + apiGetRecommend;
        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            if (responseEntity.getStatusCode().equals(HttpStatus.OK)) {
                Gson g = new Gson();
                return g.fromJson(responseEntity.getBody(), RecommendTagsVo.class);
            } else {
                throw new SystemException();
            }
        } catch (HttpServerErrorException e) {
            return new RecommendTagsVo(request.getRecommendTagItemList());
        }

    }

    @Override
    public void trainRecommend(ImageInstanceDetailVo imageInstanceDetailVo) throws IOException, ClassNotFoundException {
        AsyncRestTemplate restTemplate = new AsyncRestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);

        List<DataObject> dataObjects = new ArrayList<>();

        ImageInstance imageInstanceWithResults = instanceService.getImageInstance(imageInstanceDetailVo.getInstance().getInstanceId());
        ImageMission imageMission = imageMissionDao.findImageMissionByMissionId(imageInstanceDetailVo.getInstance().getMissionId());

        List<MissionAsset> missionAssets = imageMission.getMissionAssets();
        for (int i = 0; i < missionAssets.size(); i++) {
            if (imageInstanceWithResults.getImageResults().get(i).getImageJob().getType() == ImageMissionType.WHOLE) {

                List<TagTuple> tagTuples = ((ImageWholeJob) imageInstanceWithResults.getImageResults().get(i).getImageJob()).getTuple().getTagTuples();
                List<String> tags = tagTuples.stream().collect(ArrayList::new, (list, tagTuple) -> list.add(tagTuple.getTag()), ArrayList::addAll);

                DataObject dataObject = new DataObject(
                        missionAssets.get(i).getUrl(),
                        tags,
                        missionAssets.get(i).getTagConfTuple(),
                        missionAssets.get(i).getBaiduTagConfTuple()
                );

                dataObjects.add(dataObject);
            }
        }
        HttpEntity<List<DataObject>> entity = new HttpEntity<>(dataObjects, headers);
        String url = mlAddress + apiTrainRecommend;
        restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
    }

    @Override
    public List<String> separateSentence(String content) throws SystemException {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        HttpEntity<SegmentWordParameter> entity = new HttpEntity<>(new SegmentWordParameter(content), headers);
        String url = mlAddress + apiSeparateSentence;
        ResponseEntity<WordsVo> wordsVoResponseEntity = restTemplate.exchange(url, HttpMethod.POST, entity, WordsVo.class);

        if (wordsVoResponseEntity.getStatusCode() == HttpStatus.OK) {
            return wordsVoResponseEntity.getBody().getWords();
        } else {
            throw new SystemException();
        }
    }

    @Override
    public ImageIdentificationResponse getBaiduResults(String imageUrl) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        String url = mlAddress + baiduApi;
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        HttpEntity<BaiduRequestVo> entity = new HttpEntity<>(new BaiduRequestVo(imageUrl

        ), headers);


        ResponseEntity<ImageIdentificationResponse> response = restTemplate.exchange(url, HttpMethod.POST, entity, ImageIdentificationResponse.class);

        return response.getBody();

    }


}
