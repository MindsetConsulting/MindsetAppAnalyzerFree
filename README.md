# Mindset's Fiori App Analyzer

Regarding questions and updates on product releases for Mindset’s Fiori App Analyzer please email jonathanbragg@mindsetconsulting.com. 

Welcome to the Mindset Fiori App Analyzer! This free application allows you to gain insights into how your end users are utilizing deployed Fiori Apps in your SAP environment. 

This repository includes the UI5 code for the Fiori App Analyzer, which you can explore using Web IDE. Additionally, it contains the SAP transport for the backend gateway service code and the deployed UI5 apps. Feel free to explore and utilize these resources as needed. 

There are 2 files in the ABAP Transports folder in the .zip file.
K901173.S4H & R901173.S4H <- Transport of copies containing all code and configurations.  We maintain the last 2 releases in the transports folder.  The latest is Release 2.4.1


## Installation Steps
Follow these steps to install the Fiori App Analyzer:

1.  Navigate to the Transports folder in this repository and download the transports to your local machine.
2.  Log on to the SAP System that houses all Gateway components. In an embedded deployment, this refers to your ECC or S/4HANA system. In a Central Hub deployment, this refers to your Gateway server. 
3.  Contact your basis team to manually import these transports into your development or sandbox systems.  This process involves: 
<BR>Importing the data and cofiles files into the /usr/sap/trans directories.
<BR>Adding them into the STMS import queue and initiating the import into the system.
<BR>If you encounter any issues related to the component versioning, you may need to check the box for invalid component versioning during the transport process depending on what version of ECC or S/4 you are running. We have not seen any inconsistencies during installation when this option is selected. 
If you or your basis team have any questions or require assistance with the import of these transports, please reach out to jonathanbragg@mindsetconsulting. 

For further assistance or support during the installation process, feel free to contact us. 

4. Once the imports have successfully completed (the import process may take up to 5-10 minutes in some cases), the following catalogs and group will be created in your Fiori Launchpad configuration. Please refer to the screenshots and technical names below:
 
<BR>Catalog: **/MINDSET/APP_ANALYZER** (Mindset App Analyzer) - contains the Fiori Monitor App and a URL link tile to the Mindset website.

<BR>Catalog: **/MINDSET/APP_ANALYZER_FLPEXT** (Mindset App Analyzer FLP Extension) - Contains the Fiori Launchpad Extension target mapping.

<BR>Group: **/MINDSET/APP_ANALYZER** - This group will contain the tile. You can override this by assigning the tile to your preferred group.
     <img src="http://www.mindsetconsulting.com/wp-content/uploads/2020/04/FLPconfig.jpg">
     <img src="http://www.mindsetconsulting.com/wp-content/uploads/2020/04/AppAnalyzerFLPextconfig.jpg">
 
5. Security Roles: Two security roles have been created as examples of what you can assign to different user groups in your SAP System:

<BR> **YS_APPANALYZER_ADMIN** - Administrator Security Role: Grants access to the tile catalogs and group for Fiori administrators to view Fiori usage within the system. It also includes the FLP EXT application and catalog to track administration users’ usage.

<BR> **YS_APPANALYZER_ENDUSER** - End User Tracking Security Role: Only includes the FLP EXT application, tracking all users assigned to this role in the App Analyzer application.
You have different options for assigning these roles: 
<BR>Assign the end user role to every SAP user to track all application usage. 
<BR>Assign the role only to specific users you want to track, such as users from a particular business process area like sales or service. In this case, the application will report usage specifically for those users. 
Please note that we are working on a feature to allow selecting user groups within the app without relying on security roles. 
 
 ### Validation steps
 1. It may be possible that that Odata service and/or applications are not active in the ICF. In which case, go to SICF and search for service names by **MINDSET**.  Activate any services you see that are not active under the Mindset folders in the ICF and retry the applications.  Everything you see in the nodes below should be active.
 <img src="http://www.mindsetconsulting.com/wp-content/uploads/2020/04/SICFnodes.jpg">
 
 ### License
 The Mindset App Analyzer product follows the MIT Licensing terms.  Please see attached LICENSE.txt file in this repository.
 
 ###  Release Notes - Version 2.1
In this release, we introduced several enhancements to the Fiori App Analyzer. Here are the key updates:
1. Detailed Informational Popovers: Total Active Users, Browser Types, and Device Type cards now feature a button that users can click on to view specific details behind the numbers displayed on the car. By clicking on the glasses icon in the upper right corner of the card, a popover will appear showcasing a table of information for logged-in users, including SAP UserName, last logged-on timestamp, internet browser used, and device type.
2. Added context to “Appviews Today by App” card: Now, when you click on an application within the card, a contextual popup will appear, displaying the application name (semantic object) and the number of times the application has been has been opened today. We are currently working on creating a more detailed application view for each application listed in this card. 

3. Average Loading Time with real response times: The Average Loading Time is no longer a mockup card. It now shows real response times from your SAP system. We are utilizing weblogs to calculate the average time it takes for a user to load a specific application, including tile navigation, page loading, GW service call, backend wait time, response to the browser, and frontend object load time. We plan to provide application-specific load times in a future release. 

Contact Us card.  We’ve added a Contact Us card so if you have any questions about Mindset, questions about the application, our services, anything else, you can click on the card and our Mindset website will load in a new tab.  

### Question:  
What data is important to you to see about each application? Please send questions and suggestions to annabelleschwab@mindsetconsulting.com regarding important data or enhancements you'd like to see in future Fiori App Analyzer releases.

###  Release Notes - Version 2.4
We are excited to present the new features and enhancements in Release 2.4 of the Fiori App Analyzer Here are the highlights:

Voice of the Employee (VoE): We have introduced the Voice of the Employee functionality, which relies on end-user feedback mechanisms integrated into the Fiori Launchpad. This feature allows you to gather and analyze feedback from your employees effectively.
 
New OVP card - Most Recent Errors: We have added a new OVP card that displays the most recent Gateway (GW) error logs from the backend. This card enables you to quickly identify potential issues in your Fiori environment by showcasing recent errors in chronological order. You can scroll through the errors or load more if desired, helping you investigate and troubleshoot problems efficiently. 

<img width="1400" alt="Screenshot 2023-06-29 at 4 16 35 PM" src="https://github.com/MindsetConsulting/MindsetAppAnalyzerFree/assets/137839838/3781afbe-54f8-4aa4-a710-53c72b025622">

###  Release Notes - Version 2.4.1
### June 2023

We are excited to introduce a new feature in the Fiori App Analyzer analytics dashboard that provides valuable insights into the geographical distribution of application usage. This addition allows you to visualize where in the world users are utilizing your Fiori applications, enabling you to make data-driven decisions and target specific regions for optimization.

#### New Feature: Usage by Region card
The card provides an intuitive visualization of the distribution of application usage across different geographic locations.
Users are represented by data points on the map, with each point indicating the approximate location of active users.
Hovering over a specific region or data point provides additional details, including the number of active users and percentage of overall usage.
The card is interactive, enabling you to zoom in/out and pan across the map for a more granular view of user distribution.

<img width="1412" alt="Screenshot 2023-06-29 at 4 11 12 PM" src="https://github.com/MindsetConsulting/MindsetAppAnalyzerFree/assets/137839838/1dae729f-2fd0-4708-a3ac-7cafcd2ecac4">

<img width="1407" alt="Screenshot 2023-06-29 at 4 14 54 PM" src="https://github.com/MindsetConsulting/MindsetAppAnalyzerFree/assets/137839838/3f70db78-07b4-4116-ab66-19de87845027">

 
##  Question:  What other data fields would you like to see in our Fiori App Analyzer?
Please send questions and suggestions to annabelleschwab@mindsetconsulting.com regarding additional data fields or enhancements you'd like to see in future Fiori App Analyzer releases.
