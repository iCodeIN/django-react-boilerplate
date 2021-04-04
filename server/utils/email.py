from django.conf import settings

if settings.DEBUG == True:
    from django.core.mail import send_mail

    def send_email(subject, message, from_email, recipient_list):
        try:
            send_mail(
                subject="test",
                message="test it",
                from_email=None,
                recipient_list=recipient_list,
            )
        except Exception as e:
            print(e)


else:
    from sendgrid import SendGridAPIClient
    from sendgrid.helpers.mail import Mail

    def send_email(subject, message, from_email, recipient_list):
        print("PROD")
        print(subject, message, from_email, recipient_list)
        email_message = Mail(
            subject=subject,
            html_content=message,
            from_emails=from_email,
            to_email=recipient_list,
        )
        try:
            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            response = sg.send(email_message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e)
