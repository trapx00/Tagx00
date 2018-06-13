package trapx00.tagx00.mlservice;

import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.ml.KeysVo;
import trapx00.tagx00.vo.ml.RecommendTagsVo;

import java.io.IOException;
import java.util.List;

public interface PythonService {
    KeysVo extractKey(String content) throws SystemException;

    RecommendTagsVo getRecommendTag(RecommendTagsVo recommendTagsVo) throws SystemException;

    void trainRecommend(ImageInstanceDetailVo imageInstanceDetailVo) throws IOException, ClassNotFoundException;

    List<String> separateSentence(String content) throws SystemException;
}
