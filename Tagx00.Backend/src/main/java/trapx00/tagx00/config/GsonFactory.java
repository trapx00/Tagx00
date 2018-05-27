package trapx00.tagx00.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import trapx00.tagx00.config.jsonAdapter.*;
import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;
import trapx00.tagx00.vo.mission.text.TextMissionSetting;

public class GsonFactory {
    public static Gson get() {
        return new GsonBuilder()
                .registerTypeAdapter(ImageJob.class, new ImageJobAdapter())
                .registerTypeAdapter(MissionProperties.class, new MissionPropertiesAdapter())
                .registerTypeAdapter(InstanceDetailVo.class, new InstanceDetailAdapter())
                .registerTypeAdapter(TextMissionSetting.class, new TextMissionSettingAdapter())
                .registerTypeAdapter(ImageJob.class, new ImageJobResponseAdapter())
                .registerTypeAdapter(MissionProperties.class, new MissionPropertiesResponseAdapter())
                .registerTypeAdapter(InstanceDetailVo.class, new InstanceDetailResponseAdapter())
                .registerTypeAdapter(TextMissionSetting.class, new TextMissionSettingResponseAdapter())
                .create();
    }
}
