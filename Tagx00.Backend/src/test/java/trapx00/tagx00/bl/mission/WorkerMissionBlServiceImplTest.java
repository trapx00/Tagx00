package trapx00.tagx00.bl.mission;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import trapx00.tagx00.blservice.mission.WorkerMissionBlService;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.util.FileUtils;

import java.io.IOException;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WorkerMissionBlServiceImplTest {
    @Autowired
    private WorkerMissionBlService workerMissionBlService;

    @Test
    public void queryOnesAllMissions() {
    }

    @Test
    public void abort() {
    }

    @Test
    public void getInstanceInformation() {
    }

    @Test
    public void saveProgress() {
    }

    @Test
    public void submit() {
    }

    @Test
    public void identifyImage() {
        try {
            System.out.println(workerMissionBlService.identifyImage(new MockMultipartFile("test", FileUtils.toByteArray("/Users/apple/Downloads/IMG_3853.JPG"))));
        } catch (SystemException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}