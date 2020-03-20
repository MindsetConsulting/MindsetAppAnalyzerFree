CLASS /mindset/cl_fiori_moni_dpc_ext DEFINITION
  PUBLIC
  INHERITING FROM /mindset/cl_fiori_moni_dpc
  CREATE PUBLIC .

  PUBLIC SECTION.

    DATA o_util TYPE REF TO /mindset/cl_fiori_monitor_util .

    METHODS /iwbep/if_mgw_core_srv_runtime~init
        REDEFINITION .
  PROTECTED SECTION.

    METHODS apploginset_get_entity
        REDEFINITION .
    METHODS apploginset_get_entityset
        REDEFINITION .
    METHODS browserloginset_get_entityset
        REDEFINITION .
    METHODS deviceloginset_get_entityset
        REDEFINITION .
    METHODS flpinfoset_create_entity
        REDEFINITION .
    METHODS flploginset_get_entity
        REDEFINITION .
    METHODS flploginset_get_entityset
        REDEFINITION .
    METHODS appinfoset_create_entity
        REDEFINITION .
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
          ls_appinfo_db TYPE /mindset/appinfo.

    io_data_provider->read_entry_data( IMPORTING es_data = ls_appinfo ).

    ls_appinfo_db         = CORRESPONDING #( ls_appinfo ).
    ls_appinfo_db-user_id = sy-uname.
    GET TIME STAMP FIELD ls_appinfo_db-log_time.
    INSERT /mindset/appinfo FROM ls_appinfo_db.
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


  METHOD flpinfoset_create_entity.
    DATA: ls_flpinfo    TYPE /mindset/cl_fiori_moni_mpc_ext=>ts_flpinfo,
          ls_flpinfo_db TYPE /mindset/flpinfo.

    io_data_provider->read_entry_data( IMPORTING es_data = ls_flpinfo ).

    ls_flpinfo_db         = CORRESPONDING #( ls_flpinfo ).
    ls_flpinfo_db-user_id = sy-uname.
    GET TIME STAMP FIELD ls_flpinfo_db-log_time.
    INSERT /mindset/flpinfo FROM ls_flpinfo_db.
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
        INTO table @DATA(lt_appname).

      LOOP AT et_entityset ASSIGNING FIELD-SYMBOL(<fs_login>).
        READ TABLE lt_appname INTO DATA(ls_appname) WITH KEY user_id = <fs_login>-user_id
                                                             log_time = <fs_login>-log_time.

        IF sy-subrc = 0.
            <fs_login>-appdescription = ls_appname-app_description.
        ENDIF.

      ENDLOOP.

    es_response_context-count = es_response_context-inlinecount = lines( et_entityset ).
  ENDMETHOD.
ENDCLASS.
