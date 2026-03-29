class /MINDSET/CL_FIORI_MONI_DPC_EXT definition
  public
  inheriting from /MINDSET/CL_FIORI_MONI_DPC
  create public .

public section.

  data O_UTIL type ref to /MINDSET/CL_FIORI_MONITOR_UTIL .

  methods /IWBEP/IF_MGW_CORE_SRV_RUNTIME~INIT
    redefinition .
protected section.

  methods APPINFOSET_CREATE_ENTITY
    redefinition .
  methods APPINFOSET_GET_ENTITY
    redefinition .
  methods APPINFOSET_GET_ENTITYSET
    redefinition .
  methods APPLOGINSET_GET_ENTITY
    redefinition .
  methods APPLOGINSET_GET_ENTITYSET
    redefinition .
  methods BROWSERLOGINSET_GET_ENTITYSET
    redefinition .
  methods DEVICELOGINSET_GET_ENTITYSET
    redefinition .
  methods ERRORLOGSET_GET_ENTITYSET
    redefinition .
  methods FEEDBACKGRAPH1SE_GET_ENTITYSET
    redefinition .
  methods FEEDBACKGRAPHSET_GET_ENTITYSET
    redefinition .
  methods FEEDBACKSET_CREATE_ENTITY
    redefinition .
  methods FEEDBACKSET_GET_ENTITYSET
    redefinition .
  methods FLPBROWSERSET_GET_ENTITYSET
    redefinition .
  methods FLPINFOSET_CREATE_ENTITY
    redefinition .
  methods FLPINFOSET_GET_ENTITYSET
    redefinition .
  methods FLPLOGINSET_GET_ENTITY
    redefinition .
  methods FLPLOGINSET_GET_ENTITYSET
    redefinition .
  methods GEOLOGINSET_GET_ENTITYSET
    redefinition .
  methods FLPDEVICESET_GET_ENTITYSET
    redefinition .
  PRIVATE SECTION.
ENDCLASS.



CLASS /MINDSET/CL_FIORI_MONI_DPC_EXT IMPLEMENTATION.


  METHOD /iwbep/if_mgw_core_srv_runtime~init.
    super->/iwbep/if_mgw_core_srv_runtime~init(
      iv_service_document_name  = iv_service_document_name
      iv_namespace              = iv_namespace
      iv_version                = iv_version
      io_context                = io_context
    ).
    CREATE OBJECT o_util.
  ENDMETHOD.


  METHOD appinfoset_create_entity.
    DATA: ls_appinfo    TYPE /mindset/cl_fiori_moni_mpc_ext=>ts_appinfo,
          ls_appinfo_db TYPE /mindset/appinfo,
          ls_flpinfo_db TYPE /mindset/flpinfo.
*** FILL appinfo and flpinfo every time a user clicks a semantic object
    io_data_provider->read_entry_data( IMPORTING es_data = ls_appinfo ).


    ls_appinfo_db         = CORRESPONDING #( ls_appinfo ).
    ls_flpinfo_db         = CORRESPONDING #( ls_appinfo ).

    ls_appinfo_db-user_id = sy-uname.

    GET TIME STAMP FIELD ls_appinfo_db-log_time.
    GET TIME STAMP FIELD ls_flpinfo_db-log_time.

    INSERT /mindset/appinfo FROM ls_appinfo_db.

    INSERT /mindset/flpinfo FROM ls_flpinfo_db.

  ENDMETHOD.


  METHOD appinfoset_get_entity.
    er_entity-load_time = o_util->get_load_time( ).
  ENDMETHOD.


  METHOD appinfoset_get_entityset.
*==========================================================*
*  App Name        : Mindset App Analyzer
*  Created By      : DRAKESH (Rakesh Devani)
*  Created On      : 12/01/2023
*  Transport       : S4HK901736
*  LastChanged By  : DRAKESH (Rakesh Devani)
*  LastChanged On  : 12/01/2023
*==========================================================*
    DATA lwa_out_appinfo TYPE /mindset/cl_fiori_moni_mpc=>ts_appinfo.

    SELECT a~user_id,
    a~semantic_action,
    a~semantic_object,
    a~app_description,
    a~load_time,
    f~browser,
    f~browser_version,
    f~latitude,
    f~longitude,
    f~device_type,
    f~os,
    f~os_details
    FROM /mindset/appinfo AS a
    INNER JOIN /mindset/flpinfo AS f
    ON a~user_id EQ f~user_id
    AND a~log_time EQ f~log_time
    INTO TABLE @DATA(lt_appinfo).

    IF sy-subrc EQ 0.
      et_entityset = CORRESPONDING #( lt_appinfo ).
    ENDIF.


  ENDMETHOD.


  METHOD apploginset_get_entity.

  ENDMETHOD.


  METHOD apploginset_get_entityset.
    et_entityset = o_util->get_app_logins( ).
  ENDMETHOD.


  METHOD browserloginset_get_entityset.
    et_entityset = o_util->get_browser_logins( ).
  ENDMETHOD.


  METHOD deviceloginset_get_entityset.
    et_entityset = o_util->get_device_logins( ).
  ENDMETHOD.


  METHOD errorlogset_get_entityset.

    SELECT * FROM /iwfnd/su_errlog INTO CORRESPONDING FIELDS OF TABLE et_entityset ORDER BY timestamp DESCENDING.

**TRY.
*CALL METHOD SUPER->ERRORLOGSET_GET_ENTITYSET
*  EXPORTING
*    IV_ENTITY_NAME           =
*    IV_ENTITY_SET_NAME       =
*    IV_SOURCE_NAME           =
*    IT_FILTER_SELECT_OPTIONS =
*    IS_PAGING                =
*    IT_KEY_TAB               =
*    IT_NAVIGATION_PATH       =
*    IT_ORDER                 =
*    IV_FILTER_STRING         =
*    IV_SEARCH_STRING         =
**    io_tech_request_context  =
**  IMPORTING
**    et_entityset             =
**    es_response_context      =
*    .
**  CATCH /iwbep/cx_mgw_busi_exception.
**  CATCH /iwbep/cx_mgw_tech_exception.
**ENDTRY.
  ENDMETHOD.


  METHOD feedbackgraph1se_get_entityset.

    SELECT userid, AVG( rating )
   FROM /mindset/feedbck
   GROUP BY userid
   ORDER BY userid
   INTO TABLE @et_entityset.

**TRY.
*CALL METHOD SUPER->FEEDBACKGRAPH1SE_GET_ENTITYSET
*  EXPORTING
*    IV_ENTITY_NAME           =
*    IV_ENTITY_SET_NAME       =
*    IV_SOURCE_NAME           =
*    IT_FILTER_SELECT_OPTIONS =
*    IS_PAGING                =
*    IT_KEY_TAB               =
*    IT_NAVIGATION_PATH       =
*    IT_ORDER                 =
*    IV_FILTER_STRING         =
*    IV_SEARCH_STRING         =
**    io_tech_request_context  =
**  IMPORTING
**    et_entityset             =
**    es_response_context      =
*    .
**  CATCH /iwbep/cx_mgw_busi_exception.
**  CATCH /iwbep/cx_mgw_tech_exception.
**ENDTRY.
  ENDMETHOD.


  METHOD feedbackgraphset_get_entityset.


    SELECT appname, AVG( rating )
     FROM /mindset/feedbck
     GROUP BY appname
     ORDER BY appname
     INTO TABLE @et_entityset.

**TRY.
*CALL METHOD SUPER->FEEDBACKGRAPHSET_GET_ENTITYSET
*  EXPORTING
*    IV_ENTITY_NAME           =
*    IV_ENTITY_SET_NAME       =
*    IV_SOURCE_NAME           =
*    IT_FILTER_SELECT_OPTIONS =
*    IS_PAGING                =
*    IT_KEY_TAB               =
*    IT_NAVIGATION_PATH       =
*    IT_ORDER                 =
*    IV_FILTER_STRING         =
*    IV_SEARCH_STRING         =
**    io_tech_request_context  =
**  IMPORTING
**    et_entityset             =
**    es_response_context      =
*    .
**  CATCH /iwbep/cx_mgw_busi_exception.
**  CATCH /iwbep/cx_mgw_tech_exception.
**ENDTRY.
  ENDMETHOD.


  METHOD feedbackset_create_entity.
    DATA: ls_feedback    TYPE /mindset/cl_fiori_moni_mpc_ext=>ts_feedback,
          ls_feedback_db TYPE /mindset/feedbck.

    io_data_provider->read_entry_data( IMPORTING es_data = ls_feedback ).

    ls_feedback_db = CORRESPONDING #( ls_feedback ).

    GET TIME STAMP FIELD ls_feedback_db-log_time.

    INSERT /mindset/feedbck FROM ls_feedback_db.
    IF sy-subrc = 0.
      er_entity = ls_feedback_db.
    ENDIF.
    COMMIT WORK AND WAIT.

  ENDMETHOD.


  METHOD feedbackset_get_entityset.
    DATA lv_cnt TYPE i.

    SELECT AVG( rating ) FROM /mindset/feedbck INTO @DATA(lv_mean).
    lv_cnt = trunc( lv_mean ).

    es_response_context-count = es_response_context-inlinecount = lv_cnt.

    DATA(lv_wstrg) = io_tech_request_context->get_osql_where_clause_convert( ).

    SELECT * FROM /mindset/feedbck WHERE (lv_wstrg) ORDER BY log_time INTO CORRESPONDING FIELDS OF TABLE @et_entityset.

  ENDMETHOD.


  method FLPBROWSERSET_GET_ENTITYSET.

  et_entityset = o_util->get_browser_users( ).

  endmethod.


  method FLPDEVICESET_GET_ENTITYSET.

  et_entityset = o_util->get_device_users( ).

  endmethod.


  METHOD flpinfoset_create_entity.
    DATA: ls_flpinfo    TYPE /mindset/cl_fiori_moni_mpc_ext=>ts_flpinfo,
          ls_flpinfo_db TYPE /mindset/flpinfo.

    io_data_provider->read_entry_data( IMPORTING es_data = ls_flpinfo ).

    ls_flpinfo_db         = CORRESPONDING #( ls_flpinfo ).
    ls_flpinfo_db-user_id = sy-uname.
    GET TIME STAMP FIELD ls_flpinfo_db-log_time.
    INSERT /mindset/flpinfo FROM ls_flpinfo_db.
  ENDMETHOD.


  METHOD flpinfoset_get_entityset.
*==========================================================*
*  App Name        : Mindset App Analyzer
*  Created By      : DRAKESH (Rakesh Devani)
*  Created On      : 12/01/2023
*  Transport       : S4HK901736
*  LastChanged By  : DRAKESH (Rakesh Devani)
*  LastChanged On  : 12/01/2023
*==========================================================*

    SELECT *
    FROM /mindset/flpinfo
    INTO CORRESPONDING FIELDS OF TABLE @et_entityset.

  ENDMETHOD.


  METHOD flploginset_get_entity.
*    er_entity-total_logged_in = lines( o_util->get_flp_logins( ) ).
  ENDMETHOD.


  METHOD flploginset_get_entityset.
*   es_response_context-count = es_response_context-inlinecount = lines( o_util->get_flp_logins( ) ).

    et_entityset = o_util->get_flp_logins( ).

    SELECT user_id, log_time, app_description FROM /mindset/appinfo FOR ALL ENTRIES IN @et_entityset
        WHERE user_id = @et_entityset-user_id AND
              log_time = @et_entityset-log_time
        INTO TABLE @DATA(lt_appname).

    LOOP AT et_entityset ASSIGNING FIELD-SYMBOL(<fs_login>).
      READ TABLE lt_appname INTO DATA(ls_appname) WITH KEY user_id = <fs_login>-user_id
                                                           log_time = <fs_login>-log_time.

      IF sy-subrc = 0.
        <fs_login>-appdescription = ls_appname-app_description.
      ENDIF.

    ENDLOOP.

    es_response_context-count = es_response_context-inlinecount = lines( et_entityset ).
  ENDMETHOD.


  METHOD geologinset_get_entityset.

    et_entityset = o_util->get_geo_logins( ).

  ENDMETHOD.
ENDCLASS.
