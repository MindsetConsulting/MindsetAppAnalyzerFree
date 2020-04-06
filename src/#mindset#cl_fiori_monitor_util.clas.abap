CLASS /mindset/cl_fiori_monitor_util DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    TYPES:
      ty_flpinfo_t TYPE STANDARD TABLE OF /mindset/flpinfo WITH DEFAULT KEY .
    TYPES:
      ty_flplogin_t TYPE STANDARD TABLE OF /mindset/cl_fiori_moni_mpc_ext=>ts_flplogin WITH DEFAULT KEY .
    TYPES:
      ty_applogin_t TYPE STANDARD TABLE OF /mindset/cl_fiori_moni_mpc_ext=>ts_applogin WITH DEFAULT KEY .
    TYPES:
      ty_device_login_t TYPE STANDARD TABLE OF /mindset/cl_fiori_moni_mpc_ext=>ts_devicelogin WITH DEFAULT KEY .
    TYPES:
      ty_browser_login_t TYPE STANDARD TABLE OF /mindset/cl_fiori_moni_mpc_ext=>ts_browserlogin WITH DEFAULT KEY .
    TYPES:
      ty_geo_login_t TYPE STANDARD TABLE OF /mindset/cl_fiori_moni_mpc_ext=>ts_geologin WITH DEFAULT KEY .
    TYPES:
      ty_avg_load_time TYPE /mindset/appinfo-load_time .

    CONSTANTS:
      BEGIN OF cs_browsers,
        ie      TYPE char20 VALUE 'IE',
        edge    TYPE char20 VALUE 'EDGE',
        chrome  TYPE char20 VALUE 'CHROME',
        opera   TYPE char20 VALUE 'OPERA',
        firefox TYPE char20 VALUE 'FIREFOX',
        safari  TYPE char20 VALUE 'SAFARI',
      END OF cs_browsers .
    CONSTANTS:
      BEGIN OF cs_devices,
        phone   TYPE char20 VALUE 'PHONE',
        tablet  TYPE char20 VALUE 'TABLET',
        desktop TYPE char20 VALUE 'DESKTOP',
      END OF cs_devices .
    CONSTANTS c_timeout_period TYPE int4 VALUE 3600 ##NO_TEXT.
    DATA v_now TYPE timestamp .

    METHODS get_load_time
      RETURNING
        VALUE(rv_loadtime) TYPE ty_avg_load_time .
    METHODS get_flp_logins
      RETURNING
        VALUE(rt_logins) TYPE ty_flplogin_t .
    METHODS get_browser_logins
      RETURNING
        VALUE(rt_logins) TYPE ty_browser_login_t .
    METHODS get_device_logins
      RETURNING
        VALUE(rt_logins) TYPE ty_device_login_t .
    METHODS constructor .
    METHODS get_geo_logins
      RETURNING
        VALUE(rt_logins) TYPE ty_geo_login_t .
    METHODS get_app_logins
      RETURNING
        VALUE(rt_logins) TYPE ty_applogin_t .
    METHODS get_top_users .
    METHODS get_top_errors .
  PROTECTED SECTION.
  PRIVATE SECTION.

    DATA v_cutoff_time TYPE timestamp .
ENDCLASS.



CLASS /MINDSET/CL_FIORI_MONITOR_UTIL IMPLEMENTATION.


  METHOD constructor.
    GET TIME STAMP FIELD v_now.
    v_cutoff_time = cl_abap_tstmp=>subtractsecs( secs = 3600 tstmp = v_now ).
  ENDMETHOD.


  METHOD get_app_logins.
    TYPES: BEGIN OF lty_apptime,
             semantic_object TYPE string,
             semantic_action TYPE string,
             total_minutes   TYPE int4,
           END OF lty_apptime.

*    Get the time per app today
*    This is for the last 24 hours
    DATA: ls_applogin TYPE LINE OF ty_applogin_t,
          ls_appinfo  TYPE /mindset/appinfo,
          ls_apptime  TYPE lty_apptime,
          lt_apptime  TYPE STANDARD TABLE OF lty_apptime.

    DATA(lv_past_24h) = cl_abap_tstmp=>subtractsecs( EXPORTING secs = 86400 tstmp = v_now ).

    SELECT * FROM /mindset/appinfo INTO TABLE @DATA(lt_appinfo)
      WHERE log_time GE @lv_past_24h ORDER BY user_id, log_time, semantic_object, semantic_action.
    LOOP AT lt_appinfo ASSIGNING FIELD-SYMBOL(<fs_appinfo>).

      DATA(lv_index) = sy-tabix.
      CLEAR ls_apptime.


      ls_applogin-semantic_object = <fs_appinfo>-semantic_object.
      ls_applogin-semantic_action = <fs_appinfo>-semantic_action.
      ls_applogin-app_description = <fs_appinfo>-app_description.

      ADD 1 TO lv_index. "Get the next index
      READ TABLE lt_appinfo ASSIGNING FIELD-SYMBOL(<fs_next>) INDEX lv_index.
      IF sy-subrc NE 0 OR <fs_appinfo>-user_id NE <fs_next>-user_id."Index doesn't exist or different user
        ls_applogin-total_minutes = ( cl_abap_tstmp=>subtract( tstmp1 = v_now tstmp2 = <fs_appinfo>-log_time ) ) / 60.
      ELSEIF <fs_appinfo>-user_id EQ <fs_next>-user_id.
        ls_applogin-total_minutes = ( cl_abap_tstmp=>subtract( tstmp1 = <fs_next>-log_time tstmp2 = <fs_appinfo>-log_time ) ) / 60.
      ENDIF.
      IF ls_applogin-total_minutes GT ( c_timeout_period / 60 )."Cannot exceed timout period
        ls_applogin-total_minutes = c_timeout_period / 60.
      ENDIF.

*      pageviews
      ls_applogin-pageviews = 1.

      COLLECT ls_applogin INTO rt_logins ASSIGNING FIELD-SYMBOL(<fs_apptime>).

    ENDLOOP.
  ENDMETHOD.


  METHOD get_browser_logins.
    DATA: ls_logins TYPE LINE OF ty_browser_login_t.

    SELECT COUNT( DISTINCT user_id ) AS user_count,
           browser AS browser,
           MAX( log_time ) AS log_time
      FROM /mindset/flpinfo INTO TABLE @DATA(lt_flpinfo)
      WHERE log_time GE @v_cutoff_time
      GROUP BY browser
      .
    LOOP AT lt_flpinfo INTO DATA(ls_flpinfo).
      ASSIGN COMPONENT ls_flpinfo-browser OF STRUCTURE ls_logins TO FIELD-SYMBOL(<fs_login>).
      IF sy-subrc EQ 0.
        <fs_login> = ls_flpinfo-user_count.
      ENDIF.
    ENDLOOP.
    APPEND ls_logins TO rt_logins.
  ENDMETHOD.


  METHOD get_device_logins.
    DATA: ls_logins TYPE LINE OF ty_device_login_t.

    SELECT COUNT( DISTINCT user_id ) AS user_count,
           device_type AS device_type,
           MAX( log_time ) AS log_time
      FROM /mindset/flpinfo INTO TABLE @DATA(lt_flpinfo)
      WHERE log_time GE @v_cutoff_time
      GROUP BY device_type
      .
    LOOP AT lt_flpinfo INTO DATA(ls_flpinfo).
      ASSIGN COMPONENT ls_flpinfo-device_type OF STRUCTURE ls_logins TO FIELD-SYMBOL(<fs_login>).
      IF sy-subrc EQ 0.
        <fs_login> = ls_flpinfo-user_count.
      ENDIF.
    ENDLOOP.
    APPEND ls_logins TO rt_logins.
  ENDMETHOD.


  METHOD get_flp_logins.
    DATA:
      lt_session_list TYPE ssi_session_list,
      lo_server_info  TYPE REF TO cl_server_info.

    SELECT DISTINCT user_id, MAX( log_time ) AS log_time
           FROM /mindset/flpinfo
           WHERE log_time GE @v_cutoff_time
           GROUP BY user_id
           INTO TABLE @DATA(lt_logins).

    IF lt_logins IS NOT INITIAL.
      SELECT * FROM /mindset/flpinfo FOR ALL ENTRIES IN @lt_logins
        WHERE user_id = @lt_logins-user_id AND
              log_time = @lt_logins-log_time
        INTO TABLE @DATA(lt_temp).

      MOVE-CORRESPONDING lt_temp TO rt_logins.
    ENDIF.

  ENDMETHOD.


  METHOD get_geo_logins.
    DATA: ls_geo TYPE LINE OF ty_geo_login_t,
          lt_geo TYPE ty_geo_login_t.

    SELECT DISTINCT user_id, MAX( log_time ) AS log_time
       FROM /mindset/flpinfo
       WHERE log_time GE @v_cutoff_time
       GROUP BY user_id
       INTO TABLE @DATA(lt_logins).

    IF lt_logins IS NOT INITIAL.
      SELECT * FROM /mindset/flpinfo FOR ALL ENTRIES IN @lt_logins
        WHERE user_id = @lt_logins-user_id AND
              log_time = @lt_logins-log_time
        INTO TABLE @DATA(lt_temp).
    ENDIF.

    LOOP AT lt_temp INTO DATA(ls_temp).
      ls_geo-pos = | { ls_temp-longitude };{ ls_temp-latitude };0 |.
      ls_geo-radius = '10'.
      APPEND ls_geo TO lt_geo.
    ENDLOOP.

    RT_LOGINS = LT_GEO.

    ENDMETHOD.


  METHOD get_load_time.

    DATA(lv_past_24h) = cl_abap_tstmp=>subtractsecs( EXPORTING secs = 86400 tstmp = v_now ).

    SELECT AVG( load_time ) FROM /mindset/appinfo
      WHERE log_time GE @lv_past_24h
      INTO @rv_loadtime.


    ENDMETHOD.


  METHOD get_top_errors.
  ENDMETHOD.


  METHOD get_top_users.
  ENDMETHOD.
ENDCLASS.
