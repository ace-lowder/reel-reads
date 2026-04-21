# reel-reads

A Next.js landing site for a local book club

## Newsletter signup

The hero form posts to the server route at `/api/subscribe`, which then sends the subscriber to MailerLite and adds them to the configured group. MailerLite automation handles the welcome email after the subscriber is added.

### Required env vars

- `MAILERLITE_API_TOKEN`
- `MAILERLITE_GROUP_ID`

Set both values in `.env.local`. They are read only on the server and are never exposed to the client.

### How it works

- The client validates the email before submitting.
- A hidden honeypot field is included to catch basic bots.
- The server validates the email again, ignores filled honeypots, and calls the MailerLite subscriber API.
- Successful or already-subscribed responses are treated as success in the UI.
