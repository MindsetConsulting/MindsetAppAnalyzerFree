# Notes

To serve locally:

```shell
ui5 serve --h2
```

To set up the UI5 CLI, add a `.env` file in this directory with the following format:

```shell
UI5_TASK_NWABAP_DEPLOYER__USER=username
UI5_TASK_NWABAP_DEPLOYER__PASSWORD=password
UI5_TASK_NWABAP_DEPLOYER__SERVER=http://host.domain.tld:12345
UI5_MIDDLEWARE_SIMPLE_PROXY_BASEURI=http://host.domain.tld:12345/sap
UI5_MIDDLEWARE_SIMPLE_PROXY_STRICT_SSL=false
```