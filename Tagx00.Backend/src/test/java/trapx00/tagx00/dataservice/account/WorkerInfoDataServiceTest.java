package trapx00.tagx00.dataservice.account;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.Assert.assertEquals;

public class WorkerInfoDataServiceTest {
    @Autowired
    private WorkerInfoDataService workerInfoDataService;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void getInstanceByWorkerUsername(){

        assertEquals(1,workerInfoDataService.getInstanceByWorkerUsername("秦牧").length);

    }
}
