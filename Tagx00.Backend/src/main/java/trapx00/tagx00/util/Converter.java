package trapx00.tagx00.util;

import trapx00.tagx00.entity.account.TempUser;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.vo.user.UserSaveVo;

public class Converter {
    /**
     * convert userSaveVo to tempUser
     *
     * @param userSaveVo the userSaveVo
     * @param code       the validation code
     * @return the user
     */
    public static TempUser userSaveVoToTempUser(UserSaveVo userSaveVo, String code) {
        return new TempUser(userSaveVo.getUsername(), userSaveVo.getPassword(), userSaveVo.getEmail(), userSaveVo.getRoles(), code);
    }

    public static User tempUserToUser(TempUser tempUser) {
        return new User(tempUser.getUsername(), tempUser.getPassword(), tempUser.getEmail(), tempUser.getRoles(), 0, 0);
    }
}
