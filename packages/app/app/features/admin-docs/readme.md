## Webhooks

- Use clerk webhooks to listen to certain authentication events to populate records in the DB

### testing localy

followed this tutorial: https://clerk.com/docs/webhooks/sync-data#set-up-a-webhook-endpoint
We use ngrok with the **webmaster@ncclschool.org** domain
log in using the domain at ngrok
Setup using https://dashboard.ngrok.com/get-started/setup/macos
run the local app using `yarn webhook:dev` which will publicly expose the API at a static domain
We can simulate events using the clerk dashboard
log into the clerk dashboard, send requests and see the results
