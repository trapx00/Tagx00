package trapx00.tagx00.data.leaderboard;

import trapx00.tagx00.dataservice.leaderboard.CreditWorkerLeaderboardDataService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;

public class CreditWorkerLeaderboardDataServiceImpl implements CreditWorkerLeaderboardDataService {
    /**
     * get user By role
     * @param role
     * @return the list of users matching the required role
     */
    @Override
    public User[] getUsersByRole(Role role) {
        return new User[0];
    }
}
