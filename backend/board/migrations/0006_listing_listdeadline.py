# Generated by Django 2.2.6 on 2019-11-14 04:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0005_auto_20191110_2010'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='listDeadline',
            field=models.CharField(default='2019-12-14', max_length=10),
        ),
    ]
