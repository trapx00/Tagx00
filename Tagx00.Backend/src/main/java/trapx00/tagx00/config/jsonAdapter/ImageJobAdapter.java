package trapx00.tagx00.config.jsonAdapter;

import com.google.gson.*;
import trapx00.tagx00.config.GsonFactory;
import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.vo.mission.image.ImageMissionType;

import java.lang.reflect.Type;

public class ImageJobAdapter implements JsonDeserializer<ImageJob>, JsonSerializer<ImageJob> {

    @Override
    public ImageJob deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        return GsonFactory.get().fromJson(json,
                ImageMissionType.valueOf(
                        json.getAsJsonObject().get("type").getAsString()
                ).clazz);
    }

    @Override
    public JsonElement serialize(ImageJob src, Type typeOfSrc, JsonSerializationContext context) {
//        return new JsonPrimitive(GsonFactory.get().toJson(src, src.getType().getJobClass()));
        return new Gson().toJsonTree(src);
    }
}
