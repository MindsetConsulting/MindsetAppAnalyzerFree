# Fiori Monitor

To get updates on product releases or for questions e-mail: jonathanbragg@mindsetconsulting.com  

Welcome to the Mindset Fiori App Analyzer.  This is a free application that let's you see how your end users are using deployed Fiori Apps in your SAP environment!

This repository contains the Fiori App Analyzer UI5 code in case you want to check it out in Web IDE and the SAP transport for backend gateway service code and the deployed UI5 apps. 

There are 2 files in the ABAPTransports folder
K901131.S4H & R901131.S4H <- Transport of copies containing all code and configurations


## Installation Steps
1.  Go to the Transports folder in this repository and download the transports to your local machine.
2.  Log on to the SAP System that houses all Gateway components.  In an embedded deployment, this is your ECC or S/4HANA system.  In a Central Hub deployment, this is your Gateway server. 
3.  Contact your basis team to manually import these transports into your development or sandbox systems.  This includes importing the  data and cofiles files into the /usr/sap/trans directories, added them into the STMS import queue, and importing into the system.  There may be a need to check the box for invalid component versioning in the transport process depending on what version of ECC or S/4 you are running.  We have not seen any inconsistencies with the install when checking this button.  If you have questions on the import of these transports and/or your basis team has questions please reach out to jonathanbragg@mindsetconsulting.com
 
 4. After the imports have completed successfully (import can take 5-10 minutes in some cases) two catalogs and one group will be created in your fiori launchpad configuration. 
    <BR>Catalog **/MINDSET/APP_ANALYZER** Mindset App Analyzer - contains the Fiori Monitor App and a url link tile to the Mindset website
    <BR>Catalog **/MINDSET/APP_ANALYZER_FLPEXT** Mindset App Analyzer FLP Extension - contains the Fiori Launchpad Extension target mapping
    <BR>Group **/MINDSET/APP_ANALYZER** - Will contain the tile. This can be overridden by assigning the tile to any preferred group.
 5. Security Roles.  We have created 2 security roles as an example of what you can assign the 2 different types of user groups in your SAP System.  The administration role grants access to the tile catalogs and group for adminsitrators of Fiori to see Fiori usage within the system.  It also contains the FLP EXT application and catalog so that administration users are also tracked as usage.  The End User tracking role only contains the FLP EXT application so all users with this role will be tracked and shown in the App Analyzer application.  There are a few different options that you can choose here.  The first and most straight forward is to make sure every SAP users has the end user role so you can track all application usage.  The second option is to assign only the users you want to track (for example a business process area like sales or service)  In this second case, the application would only report out those sales or service users of Fiori applications.  (In the future, we're working on a feature to be able to select user groups in the app to be able to break this out without using security roles)
    <BR>**YS_APPANALYZER_ADMIN** Adminstrator Security Role
    <BR>**YS_APPANALYZER_ENDUSER** End User Tracking Security Role
 
 ### Validation steps
 1. It may be possible that that Odata service and/or applications are not active in the ICF. In which case, go to SICF and search for service names by **MINDSET**.  Activate any services you see that are not active under the Mindset folders in the ICF and retry the applications.
 
 ### License
 The Mindset App Analyzer product follows the MIT Licensing terms.  Please see attached LICENSE.txt file in this repository.
 
 ##  Release Notes - Version 2.1
 In this sprint we’ve added detailed informational popovers for 3 cards.  Total Active Users, Browser Types, and Device Type cards can now have a button users can click to show specific details behind the numbers you see on the card.  You access this popover by clicking on the glasses button in the upper right corner of the card.  This showcases a table of information for the users that are logged in including:  SAP UserName, Last logged on time stamp, Internet Browser the user logged in with, and the Device Type the user logged in with.  

##  Question:  What other data fields would you like to see here?







 We have added a bit of context to the Appviews Today by App card.  Now, once you click on an application in the card you will see a contextual popup with the Application name (semantic object) and the number of times the application has been opened today.  Our current sprint is very focused on creating a more detailed application view of each application that shows in this card.  More to come once this sprint ends on April 3rd!  
## Question:  What data is important to you to see about each application?  


 Average Loading Time now shows real response times.  The Average Loading Time card is not a mockup card any longer.  This shows real response time in your SAP system.  We’re using weblogs here, so the time you see is the average time it takes for a user to click on an application tile in the Fiori Launchpad to the time your internet browser calls that page completely loaded.  This includes the tile navigation, page loading, GW service call, backend wait time, response to the browser, and all frontend object load time.  In the screenshot below, it is roughly 2.67 seconds to launch an application in our development system.  We’re looking forward to getting application by application load time in a future sprint!




 Contact Us card.  We’ve added a Contact Us card so if you have any questions about Mindset, questions about the application, our services, anything else, you can click on the card and our Mindset website will load in a new tab.  



