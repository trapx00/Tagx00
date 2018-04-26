package trapx00.tagx00.data.pay;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.user.UserDao;
import trapx00.tagx00.dataservice.pay.PayDataService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.vo.mission.pay.PayVo;

@Service
public class PayDataServiceImpl implements PayDataService {
    private final UserDao userDao;

    @Autowired

    public PayDataServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    /**
     * pay for account
     *
     * @param payVo
     * @param username
     */
    @Override
    public void updateUser(PayVo payVo, String username) throws SystemException {
        User user = userDao.findUserByUsername(username);
        if (user == null)
            throw new SystemException();
        user.setCredits(user.getCredits() + payVo.getCredits());
        userDao.save(user);
    }
}
