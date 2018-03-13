package trapx00.tagx00.data.daoimpl.user;

import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.user.UserDao;
import trapx00.tagx00.entity.user.User;
import trapx00.tagx00.util.FileUtil;

@Service
public class UserDaoImpl implements UserDao {

    @Override
    public User save(User user) {
        return FileUtil.saveTuple(user);
    }

    @Override
    public User findUserByUsername(String username) {
        return FileUtil.findOne(username, User.class);
    }
}

