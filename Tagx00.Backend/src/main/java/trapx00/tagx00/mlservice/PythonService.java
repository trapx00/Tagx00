package trapx00.tagx00.mlservice;

import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.vo.ml.KeysVo;

public interface PythonService {
    KeysVo extractKey(String content) throws SystemException;
}
