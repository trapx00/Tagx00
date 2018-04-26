package trapx00.tagx00.bl.leaderboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.leaderboard.ExpLeaderboardBlService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.leaderboard.exp.ExpLeaderboardResponse;
import trapx00.tagx00.response.leaderboard.exp.ExpSpecificWorkerLeaderboardResponse;
import trapx00.tagx00.vo.leaderboard.ExpLeaderboardUserVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

@Service
public class ExpLeaderboardBlServiceImpl implements ExpLeaderboardBlService {

    private final UserDataService userDataService;
    private final CommonLeaderboardBl<ExpLeaderboardResponse, ExpSpecificWorkerLeaderboardResponse, ExpLeaderboardUserVo> commonLeaderboardBl;

    @Autowired
    public ExpLeaderboardBlServiceImpl(UserDataService userDataService, CommonLeaderboardBl<ExpLeaderboardResponse, ExpSpecificWorkerLeaderboardResponse, ExpLeaderboardUserVo> commonLeaderboardBl) {
        this.userDataService = userDataService;
        this.commonLeaderboardBl = commonLeaderboardBl;
    }


    /**
     * get the paginginfo and the list of worker's exp
     *
     * @param pagingQueryVo
     * @return ExpLeaderboardResponse
     */
    @Override
    public ExpLeaderboardResponse expLeaderboard(PagingQueryVo pagingQueryVo) throws SystemException {
        try {
            return commonLeaderboardBl.queryLeaderboard(pagingQueryVo, Role.WORKER, ExpLeaderboardResponse.class, User.class.getMethod("getExp"), this.getClass().getMethod("generateExpLeaderboardUserVo", User.class, int.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    /**
     * get the order and exp of the specific worker
     *
     * @param workerUsername
     * @return ExpSpecificWorkerLeaderboardResponse
     */
    @Override
    public ExpSpecificWorkerLeaderboardResponse specificWorker(String workerUsername) throws SystemException {
        try {
            return commonLeaderboardBl.querySpecificLeaderboard(workerUsername, Role.WORKER, ExpSpecificWorkerLeaderboardResponse.class, User.class.getMethod("getExp"), this.getClass().getMethod("generateExpLeaderboardUserVo", User.class, int.class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    public static ExpLeaderboardUserVo generateExpLeaderboardUserVo(User user, int order) {
        return new ExpLeaderboardUserVo(user.getUsername(), user.getExp(), user.getCredits(), order);
    }
}
