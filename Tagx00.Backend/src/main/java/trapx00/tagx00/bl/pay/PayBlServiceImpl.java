package trapx00.tagx00.bl.pay;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.pay.PayBlService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.dataservice.pay.PayDataService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.UserDoesNotExistException;
import trapx00.tagx00.response.pay.PayQueryResponse;
import trapx00.tagx00.response.pay.PayResponse;
import trapx00.tagx00.vo.mission.pay.PayVo;

@Service
public class PayBlServiceImpl implements PayBlService {
    private final PayDataService payDataService;
    private final UserDataService userDataService;

    @Autowired
    public PayBlServiceImpl(PayDataService payDataService, UserDataService userDataService) {
        this.payDataService = payDataService;
        this.userDataService = userDataService;
    }

    /**
     * pay for account
     *
     * @param payVo
     * @param username
     * @return PayResponse
     */
    @Override
    public PayResponse pay(PayVo payVo, String username) throws SystemException {
        payDataService.updateUser(payVo, username);
        int credits = userDataService.getUserByUsername(username) == null ? 0 : userDataService.getUserByUsername(username).getCredits();
        return new PayResponse(credits);
    }

    /**
     * query the credits the user now has
     *
     * @param username the username
     * @return the credits
     */
    @Override
    public PayQueryResponse queryPay(String username) throws UserDoesNotExistException {
        User user = userDataService.getUserByUsername(username);
        if (user != null) {
            return new PayQueryResponse(userDataService.getUserByUsername(username).getCredits());
        } else {
            throw new UserDoesNotExistException();
        }
    }
}
