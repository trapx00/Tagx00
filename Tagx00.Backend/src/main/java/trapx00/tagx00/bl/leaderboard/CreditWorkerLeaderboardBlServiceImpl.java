package trapx00.tagx00.bl.leaderboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.leaderboard.CreditWorkerLeaderboardBlService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.leaderboard.credit.CreditSpecificWorkerLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.credit.CreditWorkerLeaderboardResponse;
import trapx00.tagx00.vo.leaderboard.CreditLeaderboardWorkerVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

@Service
public class CreditWorkerLeaderboardBlServiceImpl implements CreditWorkerLeaderboardBlService {
    private final UserDataService userDataService;
    private final CommonLeaderboardBl<CreditWorkerLeaderboardResponse, CreditSpecificWorkerLeaderboardResponse, CreditLeaderboardWorkerVo> commonLeaderboardBl;

    @Autowired
    public CreditWorkerLeaderboardBlServiceImpl(UserDataService userDataService, CommonLeaderboardBl<CreditWorkerLeaderboardResponse, CreditSpecificWorkerLeaderboardResponse, CreditLeaderboardWorkerVo> commonLeaderboardBl) {
        this.userDataService = userDataService;
        this.commonLeaderboardBl = commonLeaderboardBl;
    }

    /**
     * get the paginginfo and the list of worker's credit
     *
     * @param pagingQueryVo
     * @return CreditWorkerLeaderboardResponse
     */
    @Override
    public CreditWorkerLeaderboardResponse creditLeaderboard(PagingQueryVo pagingQueryVo) throws SystemException {
        try {
            return commonLeaderboardBl.queryLeaderboard(pagingQueryVo, Role.WORKER, CreditWorkerLeaderboardResponse.class, User.class.getMethod("getCredits"), this.getClass().getMethod("generateCreditLeaderboardWorkerVo", User.class, int.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    /**
     * get the order and credit of the specific worker
     *
     * @param workerUsername
     * @return CreditSpecificWorkerLeaderboardResponse
     */
    @Override
    public CreditSpecificWorkerLeaderboardResponse specificWorker(String workerUsername) throws SystemException {
        try {
            return commonLeaderboardBl.querySpecificLeaderboard(workerUsername, Role.WORKER, CreditSpecificWorkerLeaderboardResponse.class, User.class.getMethod("getCredits"), this.getClass().getMethod("generateCreditLeaderboardWorkerVo", User.class, int.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    private CreditLeaderboardWorkerVo generateCreditLeaderboardWorkerVo(User user, int order) {
        return new CreditLeaderboardWorkerVo(user.getUsername(), user.getCredits(), order);
    }
}
