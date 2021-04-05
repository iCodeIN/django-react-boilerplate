from django.conf import settings

if settings.ENVIRONMENT == "dev":
    from django.core.mail import send_mail

    def send_email(subject, message, from_email, recipient_list):
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=None,
                recipient_list=recipient_list,
            )
        except Exception as e:
            print(e)


else:
    from sendgrid import SendGridAPIClient
    from sendgrid.helpers.mail import Mail

    def send_email(subject, message, from_email, recipient_list):
        from_email=from_email or settings.DEFAULT_FROM_EMAIL
        email_message = Mail(
            from_email=from_email,
            to_emails=recipient_list,
            subject=str(subject),
            plain_text_content=str(message),
        )
        try:
            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            response = sg.send(email_message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e)
