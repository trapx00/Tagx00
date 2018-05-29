package trapx00.tagx00.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import trapx00.tagx00.config.jsonAdapter.*;
import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.publicdatas.mission.text.TextJob;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;
import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionSetting;
import trapx00.tagx00.vo.mission.text.TextMissionType;

public class GsonFactory {
    public static Gson get() {
        return new GsonBuilder()
            .registerTypeAdapter(MissionProperties.class, new MissionPropertiesAdapter())
            .registerTypeAdapter(InstanceDetailVo.class, new InstanceDetailAdapter())
            .registerTypeAdapter(MissionDetailVo.class, new MissionDetailAdapter())
            .registerTypeAdapter(MissionPublicItemVo.class, new MissionPublicItemAdapter())
            .registerTypeAdapter(TextJob.class, new TextJobAdapter())
            .registerTypeAdapter(TextMissionSetting.class, new TextMissionSettingAdapter())
            .registerTypeAdapter(ImageJob.class, new ImageJobAdapter())
            .create();
    }
}
