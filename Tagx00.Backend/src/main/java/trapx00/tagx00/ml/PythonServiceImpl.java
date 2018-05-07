package trapx00.tagx00.ml;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.mlservice.PythonService;
import trapx00.tagx00.parameters.ExtractKeyParameter;
import trapx00.tagx00.vo.ml.KeysVo;

@Service
public class PythonServiceImpl implements PythonService {
    @Value("${ml.address}")
    private String mlAddress;
    @Value("${ml.apiExtractKey}")
    private String apiExtractKey;

    @Override
    public KeysVo extractKey(String content) throws SystemException {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<KeysVo> entity = restTemplate.postForEntity(mlAddress + apiExtractKey, new ExtractKeyParameter(content), KeysVo.class);
        if (entity.getStatusCode() == HttpStatus.ACCEPTED) {
            return entity.getBody();
        } else {
            throw new SystemException();
        }
    }
}
