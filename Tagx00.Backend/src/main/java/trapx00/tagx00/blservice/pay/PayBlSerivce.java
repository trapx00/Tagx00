package trapx00.tagx00.blservice.pay;

import trapx00.tagx00.response.pay.PayResponse;
import trapx00.tagx00.vo.mission.pay.PayVo;

public interface PayBlSerivce {

    /**
     * pay for account
     * @param payVo
     * @param username
     * @return PayResponse
     */
    PayResponse pay(PayVo payVo,String username);

}
