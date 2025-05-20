from celery import CELERY
app = CELERY('server')
app.config_from_project('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

