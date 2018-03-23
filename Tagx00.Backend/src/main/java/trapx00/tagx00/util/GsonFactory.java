package trapx00.tagx00.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import trapx00.tagx00.config.jsonAdapter.ImageJobAdapter;
import trapx00.tagx00.publicdatas.mission.image.ImageJob;

public class GsonFactory {
    public static Gson get() {
        return new GsonBuilder()
            .registerTypeAdapter(ImageJob.class, new ImageJobAdapter())
            .create();
    }
}
