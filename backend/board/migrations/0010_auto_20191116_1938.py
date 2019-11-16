# Generated by Django 2.2.6 on 2019-11-16 19:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('board', '0009_auto_20191114_1753'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='listing',
            options={'ordering': ['-id']},
        ),
        migrations.AddField(
            model_name='startup',
            name='orgEmail',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='userGradYear',
            field=models.IntegerField(default=2023),
        ),
        migrations.AlterField(
            model_name='listing',
            name='listDeadline',
            field=models.CharField(default='2019-12-16', max_length=10),
        ),
        migrations.CreateModel(
            name='AuthUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isStartup', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]