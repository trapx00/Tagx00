package trapx00.tagx00.util;

import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.vo.user.UserSaveVo;

public class Convertor {
    /**
     * convert userSaveVo to user
     *
     * @param userSaveVo the userSaveVo
     * @return the user
     */
    public static User userSaveVoToUser(UserSaveVo userSaveVo) {
        return new User(userSaveVo.getUsername(), userSaveVo.getPassword(), userSaveVo.getEmail(), userSaveVo.getRoles());
    }
}
