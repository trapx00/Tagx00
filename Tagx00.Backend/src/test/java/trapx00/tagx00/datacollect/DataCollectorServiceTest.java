package trapx00.tagx00.datacollect;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DataCollectorServiceTest {
    @Autowired
    private DataCollectorService dataCollectorService;

    @Test
    @Transactional
    public void collectData() {
        dataCollectorService.collectData();
    }
}