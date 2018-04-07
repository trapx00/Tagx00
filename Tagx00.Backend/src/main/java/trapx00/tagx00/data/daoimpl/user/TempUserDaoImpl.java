package trapx00.tagx00.data.daoimpl.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.user.TempUserDao;
import trapx00.tagx00.data.fileservice.FileService;
import trapx00.tagx00.entity.account.TempUser;

@Service
public class TempUserDaoImpl implements TempUserDao {

    private final FileService<TempUser> fileService;

    @Autowired
    public TempUserDaoImpl(FileService<TempUser> fileService) {
        this.fileService = fileService;
    }

    @Override
    public TempUser save(TempUser tempUser) {
        return fileService.saveTuple(tempUser);
    }

    @Override
    public TempUser findTempUserByUsername(String username) {
        return fileService.findOne(username, TempUser.class);
    }
}
