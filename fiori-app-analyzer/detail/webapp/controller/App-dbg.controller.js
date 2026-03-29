sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.mindset.appanalyzerdetail.controller.App", {
            onInit: function () {

            },
            /**
         *@memberOf com.mindset.appanalyzerdetail.controller.App
         */
            onBeforeRebindTable: function (oEvent) {
                var oComponentData = this.getMyComponent().getComponentData();
                if (oComponentData) {
                    var oStartupParameters = oComponentData.startupParameters.App;
                }
                if (oStartupParameters) {
                    oStartupParameters = oStartupParameters.toString();
                    var mBindingParams = oEvent.getParameter("bindingParams");
                    var aFilter = [];
                    mBindingParams.filters.push(new Filter("AppDescription", FilterOperator.Contains, oStartupParameters));
                }
            },
            getMyComponent: function () {
                "use strict";
                var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
                return sap.ui.component(sComponentId);
            }
        });
    });
