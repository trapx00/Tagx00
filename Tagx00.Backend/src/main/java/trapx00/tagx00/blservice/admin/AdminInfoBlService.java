package trapx00.tagx00.blservice.admin;

import org.springframework.stereotype.Service;
import trapx00.tagx00.response.user.AdminInfoResponse;
import trapx00.tagx00.response.user.AdminUserResponse;

@Service
public interface AdminInfoBlService {

    /**
     * get the info of userCount,totalMissionCount,totalInstanceCount...
     *
     * @return AdminInfoResponse the combination of the information
     */
    AdminInfoResponse getAdminInfo();

    AdminUserResponse getUsers();
}
