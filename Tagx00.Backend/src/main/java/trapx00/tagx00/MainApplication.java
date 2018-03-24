package trapx00.tagx00;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import trapx00.tagx00.util.PathUtil;

@SpringBootApplication
@EnableSwagger2
public class MainApplication {
    static {
        PathUtil.initDatabase();
    }

    public static void main(String[] args) {
//        FileInputStream fileIn = null;
//        try {
////            ArrayList<ImageResult> imageResults = new ArrayList<>();
////            imageResults.add(new ImageResult(new ImageWholeJob(ImageMissionType.WHOLE, new TagDescriptionTuple(null, null)), "123"));
////            imageResults.add(new ImageResult(new ImageWholeJob(ImageMissionType.WHOLE, new TagDescriptionTuple(null, null)), "456"));
////            InstanceDetailVo instanceDetailVo = new ImageInstanceDetailVo(new InstanceVo(1, "123", MissionInstanceState.IN_PROGRESS, 1, null, null, false, 0), imageResults);
////            FileOutputStream fileOut =
////                    new FileOutputStream(PathUtil.getSerPath() + "imageResults_1");
////            ObjectOutputStream out = new ObjectOutputStream(fileOut);
////            out.writeObject(instanceDetailVo);
////            out.close();
////            fileOut.close();
//
//            fileIn = new FileInputStream(PathUtil.getSerPath() + "imageResults_1");
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        ObjectInputStream in = null;
//        try {
//            in = new ObjectInputStream(fileIn);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        try {
//            Object serObject = in.readObject();
//            System.out.println(serObject);
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (ClassNotFoundException e) {
//            e.printStackTrace();
//        }
        SpringApplication.run(MainApplication.class, args);
        System.out.println(PathUtil.getDatabasePath());
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage(getClass().getPackage().getName()))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Tag x00 API")
                .termsOfServiceUrl("")
                .contact(new Contact("Trap x00", "https://github.com/trapx00", "445073309@qq.com"))
                .version("1.0")
                .build();
    }
}
