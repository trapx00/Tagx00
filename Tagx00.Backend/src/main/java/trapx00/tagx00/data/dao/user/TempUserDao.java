package trapx00.tagx00.data.dao.user;

import org.springframework.stereotype.Service;
import trapx00.tagx00.entity.account.TempUser;

@Service
public interface TempUserDao {
    TempUser save(TempUser tempUser);

    TempUser findTempUserByUsername(String username);
}
