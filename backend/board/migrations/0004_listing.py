# Generated by Django 2.2.6 on 2019-10-14 00:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0003_auto_20191014_0037'),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('listName', models.CharField(max_length=50)),
                ('listTag', models.CharField(max_length=50)),
                ('listDesc', models.CharField(max_length=250)),
                ('isPaid', models.BooleanField(default=True)),
                ('listLocation', models.CharField(max_length=100)),
                ('isOpen', models.BooleanField(default=True)),
                ('listLongDesc', models.TextField()),
            ],
        ),
    ]