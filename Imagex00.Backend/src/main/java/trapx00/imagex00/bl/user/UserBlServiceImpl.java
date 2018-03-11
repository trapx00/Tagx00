package trapx00.imagex00.bl.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.imagex00.blservice.user.UserBlService;
import trapx00.imagex00.dataservice.user.UserDataService;
import trapx00.imagex00.exception.viewexception.SystemException;
import trapx00.imagex00.exception.viewexception.UserAlreadyExistsException;
import trapx00.imagex00.util.Convertor;
import trapx00.imagex00.vo.user.UserSaveVo;

@Service
public class UserBlServiceImpl implements UserBlService {

    private final UserDataService userDataService;

    @Autowired
    public UserBlServiceImpl(UserDataService userDataService) {
        this.userDataService = userDataService;
    }

    /**
     * sign up
     *
     * @param userSaveVo the user to be registered
     */
    @Override
    public void signUp(UserSaveVo userSaveVo) throws UserAlreadyExistsException, SystemException {
        if (userDataService.isTheUserExists(userSaveVo.getUsername())) {
            throw new UserAlreadyExistsException();
        } else {
            userDataService.saveUser(Convertor.userSaveVoToUser(userSaveVo));
        }
    }
}
