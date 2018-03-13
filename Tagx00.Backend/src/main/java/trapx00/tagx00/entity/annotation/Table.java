package trapx00.tagx00.entity.annotation;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
public @interface Table {
    /**
     * table name
     *
     * @return
     */
    String name() default "";
}
