package trapx00.tagx00.data.dao.user;

import trapx00.tagx00.entity.account.TempUser;

public interface TempUserDao {
    TempUser save(TempUser tempUser);

    TempUser findTempUserByUsername(String username);

    void delete(String username);
}
