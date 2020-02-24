class /MINDSET/CL_FIORI_MONITOR_UTIL definition
  public
  final
  create public .

public section.

  types:
    ty_flpinfo_t TYPE STANDARD TABLE OF /mindset/flpinfo WITH DEFAULT KEY .
  types:
    ty_flplogin_t TYPE STANDARD TABLE OF /mindset/cl_fiori_moni_mpc_ext=>ts_flplogin WITH DEFAULT KEY .
  types:
    ty_applogin_t TYPE STANDARD TABLE OF /mindset/cl_fiori_moni_mpc_ext=>ts_applogin WITH DEFAULT KEY .
  types:
    ty_device_login_t TYPE STANDARD TABLE OF /mindset/cl_fiori_moni_mpc_ext=>ts_devicelogin WITH DEFAULT KEY .
  types:
    ty_browser_login_t TYPE STANDARD TABLE OF /mindset/cl_fiori_moni_mpc_ext=>ts_browserlogin WITH DEFAULT KEY .
  types:
    ty_geo_login_t TYPE STANDARD TABLE OF /mindset/cl_fiori_moni_mpc_ext=>ts_geologin WITH DEFAULT KEY .

  constants:
    BEGIN OF cs_browsers,
        ie      TYPE char20 VALUE 'IE',
        edge    TYPE char20 VALUE 'EDGE',
        chrome  TYPE char20 VALUE 'CHROME',
        opera   TYPE char20 VALUE 'OPERA',
        firefox TYPE char20 VALUE 'FIREFOX',
        safari  TYPE char20 VALUE 'SAFARI',
      END OF cs_browsers .
  constants:
    BEGIN OF cs_devices,
        phone   TYPE char20 VALUE 'PHONE',
        tablet  TYPE char20 VALUE 'TABLET',
        desktop TYPE char20 VALUE 'DESKTOP',
      END OF cs_devices .
  constants C_TIMEOUT_PERIOD type INT4 value 3600 ##NO_TEXT.
  data V_NOW type TIMESTAMP .

  methods GET_FLP_LOGINS
    returning
      value(RT_LOGINS) type TY_FLPLOGIN_T .
  methods GET_BROWSER_LOGINS
    returning
      value(RT_LOGINS) type TY_BROWSER_LOGIN_T .
  methods GET_DEVICE_LOGINS
    returning
      value(RT_LOGINS) type TY_DEVICE_LOGIN_T .
  methods CONSTRUCTOR .
  methods GET_GEO_LOGINS
    returning
      value(RT_LOGINS) type TY_GEO_LOGIN_T .
  methods GET_APP_LOGINS
    returning
      value(RT_LOGINS) type TY_APPLOGIN_T .
  methods GET_TOP_USERS .
  methods GET_TOP_ERRORS .
  PROTECTED SECTION.
  PRIVATE SECTION.

    DATA v_cutoff_time TYPE timestamp .
ENDCLASS.



CLASS /MINDSET/CL_FIORI_MONITOR_UTIL IMPLEMENTATION.


  METHOD CONSTRUCTOR.
    GET TIME STAMP FIELD v_now.
    v_cutoff_time = cl_abap_tstmp=>subtractsecs( secs = c_timeout_period tstmp = v_now ).
  ENDMETHOD.


  METHOD GET_APP_LOGINS.
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


  METHOD GET_BROWSER_LOGINS.
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


  METHOD GET_DEVICE_LOGINS.
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


  METHOD GET_FLP_LOGINS.
    DATA:
      lt_session_list TYPE ssi_session_list,
      lo_server_info  TYPE REF TO cl_server_info.

*    TRY.
*        CREATE OBJECT lo_server_info.
*        lt_session_list = lo_server_info->get_session_list( with_application_info = 1 ).
*        DELETE lt_session_list WHERE NOT application_info CP '*P=/sap/opu/odata/*'.
*        SORT lt_session_list BY user_name.
*        DELETE ADJACENT DUPLICATES FROM lt_session_list COMPARING user_name.
*        rt_sessions = lt_session_list.
**        DESCRIBE TABLE lt_session_list LINES rv_count.
*      CATCH cx_ssi_no_auth.
**        MESSAGE e150 WITH text-100.
*    ENDTRY.
*    get cut off time.

    SELECT DISTINCT user_id AS user_id,
           MAX( log_time ) AS last_login_at FROM /mindset/flpinfo
      INTO TABLE @rt_logins WHERE log_time GE @v_cutoff_time
      GROUP BY user_id.
  ENDMETHOD.


  METHOD GET_GEO_LOGINS.
    DATA: ls_logins TYPE LINE OF ty_geo_login_t.
*
**   Geo Region Cutoff
*
*    SELECT COUNT( DISTINCT user_id ) AS user_count,
*           browser AS browser,
*           MAX( log_time ) AS log_time
*      FROM /mindset/flpinfo INTO TABLE @DATA(lt_flpinfo)
*      WHERE log_time GE @v_cutoff_time
*      GROUP BY browser
*      .
*    LOOP AT lt_flpinfo INTO DATA(ls_flpinfo).
*      ASSIGN COMPONENT ls_flpinfo-browser OF STRUCTURE ls_logins TO FIELD-SYMBOL(<fs_login>).
*      IF sy-subrc EQ 0.
*        <fs_login> = ls_flpinfo-user_count.
*      ENDIF.
*    ENDLOOP.
*    APPEND ls_logins TO rt_logins.
  ENDMETHOD.


  METHOD GET_TOP_ERRORS.
  ENDMETHOD.


  METHOD GET_TOP_USERS.
  ENDMETHOD.
ENDCLASS.
