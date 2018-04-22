package trapx00.tagx00.bl.leaderboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.leaderboard.CreditRequesterLeaderboardBlService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.leaderboard.credit.CreditRequesterLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditSpecificRequesterLeaderboardResponse;
import trapx00.tagx00.vo.leaderboard.CreditLeaderboardRequesterVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

@Service
public class CreditRequesterLeaderboardBlServiceImpl implements CreditRequesterLeaderboardBlService {
    private final UserDataService userDataService;
    private final CommonLeaderboardBl<CreditRequesterLeaderboardResponse, CreditSpecificRequesterLeaderboardResponse, CreditLeaderboardRequesterVo> commonLeaderboardBl;

    @Autowired
    public CreditRequesterLeaderboardBlServiceImpl(UserDataService userDataService, CommonLeaderboardBl<CreditRequesterLeaderboardResponse, CreditSpecificRequesterLeaderboardResponse, CreditLeaderboardRequesterVo> commonLeaderboardBl) {
        this.userDataService = userDataService;
        this.commonLeaderboardBl = commonLeaderboardBl;
    }

    /**
     * get the paginginfo and the list of requester's credit
     *
     * @param pagingQueryVo
     * @return CreditRequesterLeaderboardResponse
     */
    @Override
    public CreditRequesterLeaderboardResponse creditLeaderboard(PagingQueryVo pagingQueryVo) throws SystemException {
        try {
            return commonLeaderboardBl.queryLeaderboard(pagingQueryVo, Role.REQUESTER, CreditRequesterLeaderboardResponse.class, User.class.getMethod("getCredits"), this.getClass().getMethod("generateCreditLeaderboardRequesterVo", User.class, int.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    /**
     * get the order and credit of the specific requester
     *
     * @param requesterUsername
     * @return CreditSpecificRequesterLeaderboardResponse
     */
    @Override
    public CreditSpecificRequesterLeaderboardResponse specificRequester(String requesterUsername) throws SystemException {
        try {
            return commonLeaderboardBl.querySpecificLeaderboard(requesterUsername, Role.REQUESTER, CreditSpecificRequesterLeaderboardResponse.class, User.class.getMethod("getCredits"), this.getClass().getMethod("generateCreditLeaderboardRequesterVo", User.class, int.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    public CreditLeaderboardRequesterVo generateCreditLeaderboardRequesterVo(User user, int order) {
        return new CreditLeaderboardRequesterVo(user.getUsername(), user.getCredits(), order);
    }
}
