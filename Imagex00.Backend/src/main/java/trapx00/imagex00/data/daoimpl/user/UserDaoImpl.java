package trapx00.imagex00.data.daoimpl.user;

import org.springframework.stereotype.Service;
import trapx00.imagex00.data.dao.user.UserDao;
import trapx00.imagex00.entity.user.User;
import trapx00.imagex00.util.FileUtil;

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

