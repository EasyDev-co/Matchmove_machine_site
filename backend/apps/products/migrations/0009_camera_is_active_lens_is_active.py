# Generated by Django 5.1.5 on 2025-02-02 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0008_file_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='camera',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='Активность'),
        ),
        migrations.AddField(
            model_name='lens',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='Активность'),
        ),
    ]
