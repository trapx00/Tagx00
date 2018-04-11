package trapx00.tagx00.bl.pay;

import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.blservice.pay.PayBlSerivce;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.dataservice.pay.PayDataService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.pay.PayResponse;
import trapx00.tagx00.vo.mission.pay.PayVo;

public class PayBlServiceImpl implements PayBlSerivce {
    private final PayDataService payDataService;
    private final UserDataService userDataService;
    @Autowired
    public PayBlServiceImpl (PayDataService payDataService, UserDataService userDataService) {
        this.payDataService = payDataService;
        this.userDataService=userDataService;
    }

    /**
     * pay for account
     * @param payVo
     * @param username
     * @return PayResponse
     */
    @Override
    public PayResponse pay(PayVo payVo, String username) throws SystemException {
        payDataService.updateUser(payVo,username);
        int credits=userDataService.getUserByUsername(username)==null?0:userDataService.getUserByUsername(username).getCredits();
        return new PayResponse(credits);
    }
}
