package trapx00.tagx00.ml;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
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
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<ExtractKeyParameter> entity = new HttpEntity<>(new ExtractKeyParameter(content), headers);
        String url = mlAddress + apiExtractKey;
        ResponseEntity<KeysVo> keysVoResponseEntity = restTemplate.exchange(url, HttpMethod.POST, entity, KeysVo.class);

        if (keysVoResponseEntity.getStatusCode() == HttpStatus.ACCEPTED) {
            return keysVoResponseEntity.getBody();
        } else {
            throw new SystemException();
        }
    }
}
