#!/usr/bin/env bash
username=root
password=zhanglingzhe0820
db=tagx00

enter_db="use tagx00;"
alter_text="alter table text_instance_text_results modify text_job blob;"
alter_image="alter table image_instance_image_results modify image_job blob;"
alter_charset="alter table favorite convert to character set utf8;
alter table image_instance_image_results convert to character set utf8;
alter table image_mission_allowed_tags convert to character set utf8;
alter table image_mission_image_mission_types convert to character set utf8;
alter table image_mission_image_urls convert to character set utf8;
alter table instance convert to character set utf8;
alter table mission convert to character set utf8;
alter table mission_browser_users convert to character set utf8;
alter table mission_topics convert to character set utf8;
alter table temp_user convert to character set utf8;
alter table text_instance_text_results convert to character set utf8;
alter table text_mission_text_mission_settings convert to character set utf8;
alter table text_mission_text_urls convert to character set utf8;
alter table text_token convert to character set utf8;
alter table topic convert to character set utf8;
alter table user convert to character set utf8;
"

mysql -u$username -p$password --execute="${enter_db}${alter_text}${alter_image}${alter_charset}";