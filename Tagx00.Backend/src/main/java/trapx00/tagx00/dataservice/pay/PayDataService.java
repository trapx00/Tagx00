package trapx00.tagx00.dataservice.pay;

import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.vo.mission.pay.PayVo;

public interface PayDataService {


    /**
     * pay for account
     * @param payVo
     * @param username
     */
    void updateUser(PayVo payVo,String username)throws SystemException;
}
