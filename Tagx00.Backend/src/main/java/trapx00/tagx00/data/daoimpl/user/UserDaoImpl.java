package trapx00.tagx00.data.daoimpl.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.user.UserDao;
import trapx00.tagx00.data.fileservice.FileService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;

import java.util.ArrayList;

@Service
public class UserDaoImpl implements UserDao {

    private final FileService<User> fileService;

    @Autowired
    public UserDaoImpl(FileService<User> fileService) {
        this.fileService = fileService;
    }

    @Override
    public User save(User user) {
        return fileService.saveTuple(user);
    }

    @Override
    public User findUserByUsername(String username) {
        return fileService.findOne(username, User.class);
    }

    @Override
    public ArrayList<User> findUsersByRole(Role role) {
        ArrayList<User> users = fileService.findAll(User.class);
        ArrayList<User> result = new ArrayList<>();
        for (User user : users) {
            for (Role role1 : user.getRoles()) {
                if (role1.getName().equals(role.getName())) {
                    result.add(user);
                }
            }
        }
        return result;
    }

    @Override
    public ArrayList<User> findAll() {
        return fileService.findAll(User.class);
    }

    @Override
    public void delete(String username) {
        fileService.delete(username, User.class);
    }
}

