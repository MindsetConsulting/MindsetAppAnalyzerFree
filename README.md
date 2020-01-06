# Fiori Monitor
Fiori Monitor App description

This repository contains the Fiori Monitor UI5 app code and, the SAP transports for gateway service and the deployed UI5 apps. The UI5 code for the launchpad extension can be found at https://github.com/MindsetConsulting/FLPExtMonitor.

There are 2 files in the ABAPTransports folder
K900744.S4H & R900744.S4H <- Transport of copies containing all code and configurations


### Installation Steps
1.  Go to the Transports folder in this repository and download the transports to your local machine.
2.  Log on to the SAP Gateway system
3.  Go to transaction CG3Z. You will be given a prompt with two input fields. Put these values in sequence and execute:
    
    File 1
    Source file on front end: <File path in your local machine>/K900744.S4H
    Target file on application server: /usr/sap/trans/cofiles
    
    File 2
    Source file on front end: <File path in your local machine>/R900744.S4H
    Target file on application server: /usr/sap/trans/data
  
 
 *Note: It is possible that the transaction CG3Z is not available. In which case, download and install the UploadProgram in SE38 that's attached in this repository. You will have to follow the same steps as above once you have installed the report.*
 
 4. After all the files are succesfully installed, go to transaction STMS_IMPORT. Navigate to Extras -> Other Requests -> Add from the menu. A popup will appear. Select S4HK900744 from the Transport Request Value List. Click on continue. The request will appear on the import queue. 
 5. Select the request and click on the 'Import Request' (Ctrl + F11) button. Wait for the installation to be complete. 
 6. After the installations are complete, two catalogs and one group will be created in the launchpad. 
    Catalog /MINDSET/MONITORING - contains the Fiori Monitor App
    Catalog /MINDSET/MONITORING_FLP_EXT - contains the Fiori Launchpad Extension target mapping
    Group /MINDSET/MONITORING - Will contain the tile. This can be overridden by assigning the tile to any preferred group.
 7. We will then need to create roles for the users so that they can see the tile and run the extension
    7.1 One role for the fiori monitoring app catalog and group. This will be for the users who will want to access the apps
    7.2 One role for the launchpad extension catalog. This will be for the users whose usage we want to track. It will have a larger audience.
 
 ### Validation 
 1. It may be possible that that Odata service is not active. In which case, go to /IWFND/MAINT_SERVICE and activate the ICF node for /MINDSET/FIORI_MONITOR_SRV.
 
 ### License
 The Mindset App Analyzer product follows the GNUAGPL3 Licensing terms.  Please see attached GNUAGPL3_License.txt file in this repository.
