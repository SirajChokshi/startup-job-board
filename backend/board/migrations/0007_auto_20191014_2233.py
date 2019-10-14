# Generated by Django 2.2.6 on 2019-10-14 22:33

from django.db import migrations
import django_mysql.models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0006_auto_20191014_0117'),
    ]

    operations = [
        migrations.AddField(
            model_name='startup',
            name='orgListings',
            field=django_mysql.models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name='user',
            name='extraCurriculars',
            field=django_mysql.models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name='user',
            name='userBookmarks',
            field=django_mysql.models.JSONField(default=dict),
        ),
    ]